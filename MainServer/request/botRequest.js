const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Billybobbeep | Request")
    .setDescription(
    "**How does this work?**\n" +
    "I will ask you a series of questions, you will then answer them accordingly.\n" +
    "Spoink will then DM you through the bot so just keep your eye out for the messages.\n" +
    "\n" +
    "Through this messaging service you can:\n" +
    "✰Ask Questions\n" +
    "✰Send reports\n" +
    "✰Request a bot for your server (free of charge)\n" +
    "\n" +
    "To continue please reply with one of the following:\n" +
    `**${prefix}report** - To report something about the bot.\n` +
    `**${prefix}question** - To ask a general question. (Example: not sure how something works.)\n` +
    `**${prefix}botRequest** - Request to have Spoink build a bot for your server.`)
    .setColor([232, 118, 118])
    .setTimestamp()
    message.channel.send(embed)
}