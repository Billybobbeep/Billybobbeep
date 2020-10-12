const Discord = require(`discord.js`);
const configFile = require('../config.json');
const db = require('quick.db');
module.exports = async (client, msg, args, prefix, message) => {
  if (!message.member.hasPermission("KICK_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to run this command.")
  let user = message.mentions.users.first();

  let member = message.guild.member(user);
  let reason = args.slice(1).join(" ");

  if (!user) return message.channel.send("Please mention a user to kick.");
  if (user.id === message.author.id) return message.channel.send("You cannot kick yourself from the server.");
  if (user.id === client.user.id) return message.channel.send("You cannot kick me. :'(");
  if (!reason) reason = "No reason provided";

  member.kick(reason).then(() => {
    message.channel.send(`Successfully kicked **${user.tag}**`);
    console.log(`${message.author.username} successfully kicked **${user.tag}**`);
    if (db.get(message.guild.id + '.loggingChannel')) {
      let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
      var embed = new Discord.MessageEmbed()
      embed.setTitle('Kicked Member')
      embed.setDescription(
        `**Member Tag:** ${member.tag}\n` +
        `**Member ID:** ${member.id}\n\n` +
        `**Moderator:** ${message.author}\n` +
        `**Moderator Tag:** ${message.author.tag}\n` +
        `**Moderator ID:** ${message.author.id}`
      )
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed.setTimestamp()
      try {
        LoggingChannel.send(embed)
      } catch {
          console.log(`${message.guild.name} has an invalid logging channel ID`)
      }
    }
  }).catch(err => {
    message.reply("I was unable to kick the member you provided.");
  })
}