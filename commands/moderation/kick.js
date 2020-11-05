module.exports = {
  name: 'kick',
  description: 'Kick a member.',
  guildOnly: true,
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const configFile = require('../../structure/config.json');
    const db = require('../../data/databaseManager/index.js');
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    function kickCmd() {
      let user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[1]);

      let member = message.guild.member(user);
      let reason = args.slice(2).join(' ');

      if (!user) return message.channel.send('Please mention a user to kick.');
      if (user.id === message.author.id)
        return message.channel.send('You cannot kick yourself from the server.');
      if (user.id === client.user.id)
        return message.channel.send('You cannot kick me.');
      if (user.tag === undefined || user.id === undefined) {
        user = user.user;
      }
      if (!reason) reason = 'No reason provided';

      member
        .kick({ reason: reason })
        .then(() => {
          message.channel.send(`Successfully kicked **${user.tag}**`
          );
            var embed = new Discord.MessageEmbed();
            embed.setTitle('Kicked Member');
            embed.setDescription(
              `**Member Tag:** ${member.tag}\n` +
              `**Member ID:** ${member.id}\n\n` +
              `**Moderator:** ${message.author}\n` +
              `**Moderator Tag:** ${message.author.tag}\n` +
              `**Moderator ID:** ${message.author.id}`
            );
            embed.setColor(
              `${db.get(message.guild.id + '.embedColor') || '#447ba1'}`
            );
            embed.setTimestamp();
            logging(embed, message, client);
        })
        .catch(err => {
          message.reply('I was unable to kick the member you provided.');
        });
    }
    var debounce = false;

    if (message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
      kickCmd()
      debounce = true;
    } else if (db.get(message.guild.id + '.modRole')) {
      if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
        if (db.get(message.guild.id + '.modsCanKick')) {
          if (message.guild.id === '733442092667502613') return;
          kickCmd()
          debounce = true;
        }
      }
      if (debounce === false) {
        message.channel.send('You do not have the premissions to run this command.')
      }
    }
  }
}