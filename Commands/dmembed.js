const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You do not have the permissions to do this.");
    
const embed = new Discord.MessageEmbed()
        .setTitle(`Billybobbeep | Announcement`)
        .setDescription(``)
        .setTimestamp()
        .setColor("#a9d9b7")

let user =
    message.mentions.members.first() ||
    message.guild.members.cache.get(args[0]);
    if (!user)
      return message.channel.send(`You did not mention a user.`);

    user.user
      .send(embed)
      .catch(() => message.channel.send("An errror accured whilst running the command."))
      .then(() => message.channel.send(`Message sent to ${user.user.tag}.`));
  }