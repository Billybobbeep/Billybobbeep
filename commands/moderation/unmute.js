module.exports = {
  name: 'unmute',
  description: 'Unmute a member.',
  guildOnly: true,
  execute (message, prefix, client) {
    const configFile = require('../../structure/config.json');
    const db = require('../../structure/global.js').db;;
    const Discord = require('discord.js');
    var embed1 = new Discord.MessageEmbed();
    var embed2 = new Discord.MessageEmbed();
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    async function unmuteCmd() {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[1])
      let reason = args.slice(2).join(' ');

      if (!db.get(message.guild.id + '.mutedRole')) return message.channel.send('Please setup a muted role in your server to use this command.')
      if (!user) return message.channel.send('Please mention a user to mute.')
      let member = message.guild.members.cache.get(user.id);
      if (!member) return message.channel.send(`I could not find the member you provided.`);
      if (!member.roles.cache.find(r => r.id === db.get(message.guild.id + '.mutedRole'))) return message.channel.send(`<@!${user.id}> is not muted.`);
      if (user.bot) return message.channel.send(`You cannot mute bots.`);
      if (!reason) return message.channel.send('Please specify a reason.');
      
      member.roles.remove(message.guild.roles.cache.find(role => role.id === db.get(message.guild.id + '.mutedRole')));
      message.channel.send('Successfully unmuted <@!' + user + '>.');

      embed1.setTimestamp()
      embed1.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed1.setTitle('You have been unmuted');
      embed1.addField(`Responsible Moderator:`, message.author.tag);
      embed1.addField(`Reason:`, reason);
      embed1.addField(`Guild:`, message.guild.name);
      try {
        await user.send(embed1)
      } catch {
        message.channel.send('The user has not been notfied as they do not have their DM\'s turned on.')
      }

        embed2.setTitle('User Unmuted');
        embed2.setTimestamp();
        embed2.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
        embed2.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`);
        logging(embed2, message, client)
    }

    var debounce = false;

    if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
      unmuteCmd()
      debounce = true;
    } else if (db.get(message.guild.id + '.modRole')) {
      if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
          unmuteCmd()
          debounce = true;
      } 
      if (debounce === false) {
        message.channel.send('You do not have the premissions to run this command.')
      }
    }
  }
}