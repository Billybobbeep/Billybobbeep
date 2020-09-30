const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async(msg, args, prefix, message) => {
        const commandEmbed = new Discord.MessageEmbed()
        .setTitle("Billybobbeep | Help Commands")
        .setDescription(
        `${prefix}cmds\n` +
        "*Shows the full list of commands.*\n" +
        `${prefix}help\n` +
        "*Shows a quick briefing.*\n" +
        `${prefix}info\n` +
        "*Gives more details about the bot.*\n" +
        `${prefix}serverinfo\n` +
        "*Provides you with information on the server.*\n" +
        `${prefix}credits\n` +
        "*Provides you with Billybobbeep's development credits*")
        .setColor([177, 210, 240])
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(commandEmbed)
}