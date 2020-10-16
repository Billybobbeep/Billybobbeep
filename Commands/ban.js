const Discord = require(`discord.js`);
const db = require('quick.db');
const embed = new Discord.MessageEmbed();

module.exports = async (client, msg, args, prefix, message) => {
  function banCmd() {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])

    let member = message.guild.member(user);
    let reason = args.slice(1).join(" ");

    if (!user) return message.channel.send("Please mention a user to ban.");
    if (user.id === message.author.id) return message.channel.send("You cannot ban yourself from the server.");
    if (user.id === client.user.id) return message.channel.send("You cannot ban me.");
    if (!reason) reason = "No reason provided";
    if (user.id === undefined) {
      user = user.user
    }
    member.ban({ days: 5, reason: reason }).then(() => {
      message.channel.send(`Successfully banned **${user.tag}**`);
      let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
      if (LoggingChannel) {
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
        try {
          LoggingChannel.send(embed)
        } catch {
          return;
        }
      }
    }).catch(err => {
      message.reply("I was unable to ban the member you provided.");
    });
  }

  var debounce = false;

  if (message.member.hasPermission("BAN_MEMBERS") || message.member.hasPermission("ADMINISTRATOR")) {
    banCmd()
    debounce = true;
  } else if (db.get(message.guild.id + '.modRole')) {
    if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modsRole'))) {
      if (db.get(message.guild.id + '.modsCanBan')) {
        banCmd()
        debounce = true;
      }
    } 
    if (debounce === false) {
      message.channel.send('You do not have the premissions to run this command.')
    }
  }
}