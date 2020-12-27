const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const db = require('../../structure/global.js').db;

module.exports = async(msg, args, prefix, message) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Help Commands')
        .addField(`${prefix}cmds`, 'Shows the full list of commands', false)
        .addField(`${prefix}help `, 'Shows a quick briefing', false)
        .addField(`${prefix}info`, 'Gives more details about the bot', false)
        .addField(`${prefix}serverinfo`, 'Provides you with information on the server', false)
        .addField(`${prefix}credits`, 'Provides you with Billybobbeep\'s development credits', false)
        .addField(`${prefix}setup`, 'Helps you customise billy for your server', false)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.guild ? embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`) : embed.setColor('#447ba1');
        message.channel.send(embed);
}