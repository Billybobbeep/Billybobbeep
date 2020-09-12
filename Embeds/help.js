const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    if (msg.startsWith(prefix + "help")) {
        const helpEmbed = new Discord.MessageEmbed()
        .setTitle("Billybobbeep | Help")
        .setDescription("Thank you for using Billybobbeep!\n" +
        "This bot was created and scripted by **Spoink#2793**\n" +
        "If you encounter any problems with the bot or have any questions please feel free to DM Spoink!\n" +
        "\n" +
        "Below are some commands to get you started:\n" +
        `${prefix}cmds\n` +
        "*Prompts you to view the commands.*\n" +
        `${prefix}info\n` +
        "*Shows info about the bot.*\n" +
        `${prefix}help\n` +
        "*Shows a quick briefing.*")
        .setColor("7aa0f6")
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(helpEmbed)
    }
}