const Discord = require('discord.js');
const configFile = require('../../utils/config.json');
const guildData = require('../../events/client/database/models/guilds');

module.exports = async(msg, args, prefix, message) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Help Commands')
        .addField(`${prefix}cmds`, 'Shows the full list of commands', false)
        .addField(`${prefix}help `, 'Shows a quick briefing', false)
        .addField(`${prefix}info`, 'Gives more details about the bot', false)
        .addField(`${prefix}serverinfo`, 'Provides you with information on the server', false)
        .addField(`${prefix}setup`, 'Helps you customise billy for your server', false)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        guildData.findOne({ guildId: message.guild.id }).then(result => {
                message.guild ? embed.setColor(result.embedColor) : embed.setColor('#447ba1');
                message.channel.send(embed);
        });
}