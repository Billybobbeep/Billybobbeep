const Discord = require('discord.js');
const guildData = require('../../events/client/database/models/guilds');

module.exports = async(msg, args, prefix, message) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Commands')
        .setDescription(
        `${prefix}cmds help\n` +
        `${prefix}cmds fun\n` +
        `${prefix}cmds moderation`)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        guildData.findOne({ guildId: message.guild.id }).then(result => {
                message.guild ? embed.setColor(result.embedColor) : embed.setColor('#447ba1');
                message.channel.send(embed);
        });
}