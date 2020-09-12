const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send("You do not have the permissions to do this.");
    
const embed = new Discord.MessageEmbed()
        .setTitle(`Billybobbeep | New Poll`)
        .setDescription(`Hello, this is an automated message from Squiddies.\n We were wondering if you would be intrested in taking part in server events. Please reply to this message with either a yes or no. Thanks, the Squiddies staff team.\n*More will be announced shortly after we get enough intrests.`)
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