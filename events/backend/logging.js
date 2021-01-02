const guildId = require('../client/database/models/guilds');
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
const logging = require('../../utils/functions.js').logging;

module.exports.add = (guild, user, client) => {
    if (!guild.me.hasPermission('ADMINISTRATOR')) return;
    guild.fetchAuditLogs()
    .then(logs => {
        let ban = logs.entries
        .filter(e => e.action === 'MEMBER_BAN_ADD')
        .sort((a, b) => b.createdAt - a.createdAt)
        .first();
        
        if (ban.executor.id === client.user.id) return;
        embed.setTitle('User Banned');
        embed.setDescription(
            `**User Tag:** ${user.tag}\n` +
            `**User ID:** ${user.id}\n\n` +
            `**Reason:** ${ban.reason || 'No reason was provided'}\n\n` +
            `**Moderator:** ${ban ? ban.executor : 'Unknown'}\n` +
            `**Moderator Tag:** ${ban ? ban.executor.tag : 'Unknown'}\n` +
            `**Moderator ID:** ${ban ? ban.executor.id : 'Unknown'}`
        )
        embed.setTimestamp(ban.createdTimestamp);
        guildData.findOne({ guildId: guild.id }).then(result => embed.setColor(result.embedColor));

        let loggingChannel = client.channels.cache.get(guildData.findOne({ guildId: guild.id }).then(result => result.embedColor.loggingChannel));
        if (loggingChannel)
            loggingChannel.send(msg).catch(() => {return});
    });
}

module.exports.remove = (guild, user, client) => {
    if (!message.guild.me.hasPermission('ADMINISTRATOR')) return;
    setTimeout(() => {
        guild.fetchAuditLogs()
        .then(logs => {
            let ban = logs.entries
            .filter(e => e.action === 'MEMBER_BAN_REMOVE')
            .sort((a, b) => b.createdAt - a.createdAt)
            .first();
            let pb = logs.entries
            .filter(e => e.action === 'MEMBER_BAN_ADD')
            .filter(e => e.target.id === ban.target.id)
            .sort((a, b) => b.createdAt - a.createdAt)
            .first();

            embed.setTitle('User Unbanned');
            embed.setDescription(
            `**User Tag:** ${ban.target.tag}\n` +
            `**User ID:** ${ban.target.id}\n\n` +
            `**Banned For:** ${pb ? pb.reason.toString() : 'No reason was provided'}\n\n` +
            `**Moderator:** ${ban ? ban.executor : 'Unknown'}\n` +
            `**Moderator Tag:** ${ban ? ban.executor.tag : 'Unknown'}\n` +
            `**Moderator ID:** ${ban ? ban.executor.id : 'Unknown'}`
            )
            embed.setTimestamp(ban.createdTimestamp);
            guildData.findOne({ guildId: message.guild.id }).then(result => embed.setColor(result.embedColor));
            let loggingChannel = client.channels.cache.get(guildData.findOne({ guildId: message.guild.id }).then(result => result.loggingChannel));
            if (loggingChannel)
                loggingChannel.send(msg).catch(() => {return});
        });
    }, 100);
}