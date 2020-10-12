const Discord = require(`discord.js`);
const configFile = require('../config.json');
const embed = new Discord.MessageEmbed();

module.exports = async (client, msg, args, prefix, message) => {
  if (msg.startsWith(prefix + "ban")) {
    if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to run this command.")
    let user = message.mentions.users.first();

    let member = message.guild.member(user);
    let reason = args.slice(1).join(" ");

    if (!user) return message.channel.send("Please mention a user to ban.");
    if (user.id === message.author.id) return message.channel.send("You cannot ban yourself from the server.");
    if (user.id === client.user.id) return message.channel.send("You cannot ban me.");
    if (!reason) reason = "No reason provided";

    member.ban(reason).then(() => {
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
      embed.setColor('#447ba1')
      try {
        LoggingChannel.send(embed)
      } catch {
        console.log(`${message.guild.name} has entered an invalid logging channel`)
      }
      }
    }).catch(err => {
      message.reply("I was unable to ban the member you provided.");
    });
  }
}