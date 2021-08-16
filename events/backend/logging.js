const guildData = require('../client/database/models/guilds');
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
const logging = require('../../utils/functions').logging;

module.exports.add = (guild, user, client) => {
    guildData.findOne({ guildId: guild.id }).then(result => {
        const me = message.guild.members.cache.get(client.user.id);
        if (
            !me.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) ||
            !me.permissions.has(Discord.Permissions.FLAGS.VIEW_AUDIT_LOG) &&
            !me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)
        ) return;
        guild.fetchAuditLogs()
        .then(logs => {
            let ban = logs.entries
            .filter(e => e.action === 'MEMBER_BAN_ADD')
            .sort((a, b) => b.createdAt - a.createdAt)
            .first();
            
            if (ban && ban.executor.id === client.user.id) return;
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
            embed.setColor(result && result.preferences ? result.preferences.embedColor : '#447ba1');

            let loggingChannel = client.channels.cache.get(result && result.preferences ? result.preferences.loggingChannel : '');
            if (loggingChannel)
                loggingChannel.send({ embeds: [embed] }).catch(() => {return});
        });
    });
}

module.exports.remove = (guild, user, client) => {
    guildData.findOne({ guildId: guild.id }).then(result => {
        const me = message.guild.members.cache.get(client.user.id);
        if (
            !me.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) ||
            !me.permissions.has(Discord.Permissions.FLAGS.VIEW_AUDIT_LOG) &&
            !me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)
        ) return;
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
                embed.setColor(result && result.preferences ? result.preferences.embedColor : '#447ba1');
                let loggingChannel = client.channels.cache.get(result && result.preferences ? result.preferences.loggingChannel : '');
                if (loggingChannel)
                    loggingChannel.send({ embeds: [embed] }).catch(() => {return});
            });
        }, 100);
    });
}