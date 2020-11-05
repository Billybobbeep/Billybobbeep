module.exports = {
  name: 'ban',
  description: 'Ban a member.',
  guildOnly: true,
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const db = require('../../data/databaseManager/index.js');
    const embed = new Discord.MessageEmbed();
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    function banCmd() {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[1])

      let member = message.guild.member(user);
      let reason = args.slice(2).join(' ');

      if (!user) return message.channel.send('Please specify a user to ban.');
      if (user.id === message.author.id) return message.channel.send('You cannot ban yourself from the server.');
      if (user.id === client.user.id) return message.channel.send('You cannot ban me.');
      if (!reason) return message.channel.send('You must provide a reason.')
      if (user.tag === undefined || user.id === undefined) {
        user = user.user;
      }
      member.ban({ days: 5, reason: reason }).then(() => {
        message.channel.send(`Successfully banned **${user.tag}**`);
          embed.setTitle('User Banned');
          embed.setDescription(
            `**User Tag:** ${member.tag}\n` +
            `**User ID:** ${member.id}\n` +
            `**Reason:** ${reason}\n\n`
            `**Moderator:** ${message.author}\n` +
            `**Moderator Tag:** ${message.author.tag}\n` +
            `**Moderator ID:** ${message.author.id}\n`
          )
          embed.setTimestamp()
          embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
          logging(embed, message, client);
      }).catch(err => {
        message.reply('I was unable to ban the member you provided.');
      });
    }

    var debounce = false;

    if (message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
      banCmd()
      debounce = true;
    } else if (db.get(message.guild.id + '.modRole')) {
      if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modsRole'))) {
        if (db.get(message.guild.id + '.modsCanBan')) {
          if (message.guild.id === '733442092667502613') return;
          banCmd()
          debounce = true;
        }
      } 
      if (debounce === false) {
        message.channel.send('You do not have the premissions to run this command.')
      }
    }
  }
}