const Discord = require(`discord.js`);
const configFile = require('../../config.json');
const db = require('quick.db');

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
        "*Provides you with Billybobbeep's development credits*\n" +
        `${prefix}setup\n` +
        "*Helps you customise billy for your server.*")
        .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(commandEmbed)
}