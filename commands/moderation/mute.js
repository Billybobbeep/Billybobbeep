module.exports = {
  name: 'mute',
  description: 'Mute a member.',
  guildOnly: true,
  execute (message, prefix, client) {
    const db = require('../../structure/global.js').db;;
    const Discord = require('discord.js');
    var embed1 = new Discord.MessageEmbed();
    var embed2 = new Discord.MessageEmbed();
    const ms = require('ms');
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    async function muteCmd() {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[1])
      let reason = args.slice(3).join(" ");
      let time = args[2] || undefined;
      let member = message.guild.members.cache.get(user.id);
      if (member.roles.cache.find(r => r.id === db.get(message.guild.id + '.mutedRole'))) return message.channel.send(`<@!${user.id}> is already muted.`);
      if (user.bot) return message.channel.send(`You cannot mute bots.`);
      if (!db.get(message.guild.id + '.mutedRole')) return message.channel.send('Please setup a muted role in your server to use this command.')
      if (!user) return message.channel.send('Please specify a user to mute.');
      if (!user.tag) user = user.user;
      if (user.id === message.author.id)return message.channel.send('You cannot mute yourself.');
      if (!reason) return message.channel.send('Please specify a reason.');
      if (!member) return message.channel.send(`I could not find the member you provided.`);
      if (time === undefined) return message.channel.send('Please specify a time.');
      if (time.endsWith('h') || time.endsWith('m')) time = ms(time); else return message.channel.send('The time can only be in hours or minutes.');
      embed1.setTimestamp()
      embed1.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed1.setTitle('You have been muted');
      embed1.addField(`Responsible Moderator:`, message.author.tag);
      embed1.addField(`Reason:`, reason);
      embed1.addField(`Guild:`, message.guild.name);
      embed1.addField(`Time:`, ms(time).replace('m', ' minute(s)').replace('h', ' hours'));
      try {
        await user.send(embed1)
      } catch {
        message.channel.send('The user has not been notfied as they do not have their DM\'s turned on.')
      }
      if (!message.guild.roles.fetch(r => r.id === db.get(message.guild.id + '.mutedRole'))) return message.channel.send('Please setup a muted role in your server to use this command.');
      member.roles.add(message.guild.roles.cache.find(role => role.id === db.get(message.guild.id + '.mutedRole')));
      message.channel.send('Successfully muted <@!' + user + '>.')

        embed2.setTitle('User Muted');
        embed2.setTimestamp();
        embed2.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
        embed2.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n\n**Time:** ${ms(time).replace('m', ' minute(s)').replace('h', ' hours')}\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`);
        logging(embed2, message, client);
        db.push('mutedMembers', message.guild.id + '_' + user.id + '_' + (Date.now() + time));
      }

    var debounce = false;

    if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
      muteCmd()
      debounce = true;
    } else if (db.get(message.guild.id + '.modRole')) {
      if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
          muteCmd()
          debounce = true;
      } 
      if (debounce === false) {
        message.channel.send('You do not have the premissions to run this command.')
      }
    }
  }
}