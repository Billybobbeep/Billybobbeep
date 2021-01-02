const Discord = require('discord.js');
const guildData = require('../../events/client/database/models/guilds');

module.exports = async(msg, args, prefix, message) => {
        if (msg.startsWith(prefix + "cmds help") || msg.startsWith(prefix + "commands help") || msg.startsWith(prefix + "c h") || msg.startsWith(prefix + "cmds mod") || msg.startsWith(prefix + "commands mod") || msg.startsWith(prefix + "c m") || msg.startsWith(prefix + "commands moderation") || msg.startsWith(prefix + "cmds moderation") || msg.startsWith(prefix + "cmds fun") || msg.startsWith(prefix + "commands fun") || msg.startsWith(prefix + "c f") || msg.startsWith(prefix + "c p") || msg.startsWith(prefix + "cmds ping") || msg.startsWith(prefix + "commands ping")) return;

        const commandEmbed = new Discord.MessageEmbed()
        .setTitle("Billybobbeep | Commands")
        .setDescription(
        `${prefix}cmds help\n` +
        `${prefix}cmds fun\n` +
        `${prefix}cmds moderation`)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.guild ? guildData.findOne({ guildId: message.guild.id }).then(result => commandEmbed.setColor(result.embedColor)) : commandEmbed.setColor('#447ba1');
        message.channel.send(commandEmbed);
}