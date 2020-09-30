const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You do not have the permissions to do this.");
  let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
    const embed = new Discord.MessageEmbed()
      embed.setTitle(`DM Sent`)
      embed.setTimestamp()
      embed.setColor('#dbbf70')
    if (args.slice(1) === null) {
      embed.setDescription(
        `**Message:** \`This message either contained an embed or no content.\`\n` +
        `**Message ID:** ${message.id}\n\n` +
        `**Moderator:** ${message.author}\n` +
        `**Moderator Tag:** ${message.author.tag}\n` +
        `**Moderator ID:** ${message.author.id}\n`)
    } else {
      embed.setDescription(
        `**Message:** ${args.slice(1)}\n` +
        `**Message ID:** ${message.id}\n\n` +
        `**Moderator:** ${message.author}\n` +
        `**Moderator Tag:** ${message.author.tag}\n` +
        `**Moderator ID:** ${message.author.id}\n`)
    }
let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(`You did not mention a user.`);
    if (!args.slice(1).join(" ")) return message.channel.send("Please specify a message.");

    user.user
      .send(args.slice(1).join(" "))
      .catch(() => message.channel.send("An errror accured whilst running the command."))
      .then(() => message.channel.send(`Message sent to ${user.user.tag}.`))
      LoggingChannel.send(embed)
  }