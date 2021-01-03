module.exports = {
  name: 'mute',
  description: 'Mute a member',
  guildOnly: true,
  catagory: 'moderation',
  usage: 'mute [user] [time] [reason]',
  execute (message, prefix, client) {
    const guildData = require('../../events/client/database/models/guilds.js');
    const mutedMembers = require('../../events/client/database/models/mutedMembers.js');
    const Discord = require('discord.js');
    let embed1 = new Discord.MessageEmbed();
    let embed2 = new Discord.MessageEmbed();
    const ms = require('ms');
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    function muteCmd() {
      guildData.findOne({ guildId: message.guild.id }).then(async result => {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
        let reason = args.slice(3).join(' ');
        let time = args[2] || undefined;
        let member = message.guild.members.cache.get(user.id);
        if (member.roles.cache.find(r => r.id === result.mutedRole)) return message.channel.send(`<@!${user.id}> is already muted`);
        if (user.bot) return message.channel.send('You cannot mute bots');
        if (!result.mutedRole) return message.channel.send('Please setup a muted role in your server to use this command')
        if (!user) return message.channel.send('Please specify a user to mute');
        if (!user.tag) user = user.user;
        if (user.id === message.author.id)return message.channel.send('You cannot mute yourself');
        if (!reason) return message.channel.send('Please specify a reason');
        if (!member) return message.channel.send('I could not find the member you provided');
        if (time === undefined) return message.channel.send('Please specify a time');
        try {
          if (time.endsWith('h') || time.endsWith('m')) time = ms(time); else return message.channel.send('The time can only be in hours or minutes');
        } catch {
          return message.channel.send('Please specify a time');
        }
        embed1.setTimestamp()
        embed1.setColor(`${result.embedColor || '#447ba1'}`)
        embed1.setTitle('You have been muted');
        embed1.addField(`Responsible Moderator:`, message.author.tag);
        embed1.addField(`Reason:`, reason);
        embed1.addField(`Guild:`, message.guild.name);
        try {
          embed1.addField(`Time:`, ms(time).replace('m', ' minute(s)').replace('h', ' hours'));
        } catch {
          return message.channel.send('Please specify a time');
        }
        try {
          await user.send(embed1)
        } catch {
          message.channel.send('The user has not been notfied as they do not have their DM\'s turned on')
        }
        if (!message.guild.roles.fetch(r => r.id === result.mutedRole)) return message.channel.send('Please setup a muted role in your server to use this command');
        member.roles.add(message.guild.roles.cache.find(role => role.id === result.mutedRole));
        message.channel.send('Successfully muted <@!' + user + '>')

          embed2.setTitle('User Muted');
          embed2.setTimestamp();
          embed2.setColor(`${result.embedColor || '#447ba1'}`);
          embed2.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n\n**Time:** ${ms(time).replace('m', ' minute(s)').replace('h', ' hours')}\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`);
          logging(embed2, message, client);
          const newMutedMember = new mutedMembers({ guildId: message.guild.id, userId: user.id, time: (Date.now() + time)});
          newMutedMember.save();
      });
    }

    let debounce = false;

    guildData.findOne({ guildId: message.guild.id }).then(result => {
      if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
        muteCmd();
        debounce = true;
      } else if (result.modRole) {
        if (message.member.roles.cache.find(role => role.id === result.modRole)) {
            muteCmd();
            debounce = true;
        } 
        if (debounce === false) {
          message.channel.send('You do not have the permissions to use this command')
        }
      }
    });
  }
}