const Discord = require(`discord.js`);
const configFile = require('../structure/config.json');
const db = require('../data/databaseManager/index.js');
module.exports = async (client, msg, args, prefix, message) => {
  function kickCmd() {
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0]);

    let member = message.guild.member(user);
    let reason = args.slice(1).join(' ');

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
        if (db.get(message.guild.id + '.loggingChannel')) {
          let LoggingChannel = client.channels.cache.get(
            db.get(message.guild.id + '.loggingChannel')
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
          try {
            LoggingChannel.send(embed);
          } catch {
            return;
          }
        }
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
