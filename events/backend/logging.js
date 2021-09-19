const guildData = require('../client/database/models/guilds');
const Discord = require('discord.js');
const embed = new Discord.MessageEmbed();
const logging = require('../../utils/functions').logging;

/**
 * Called when a guild member has been banned
 * @param {Object} guild The guild that the event took place in
 * @param {Object} user The user that was banned
 * @param {Client} client The bots client
 */
module.exports.add = (guildObj, client) => {
    let guild = guildObj.guild;
    let user = guildObj.user;
    guildData.findOne({ guildId: guild.id }).then(async result => {
        const me = guild.members.cache.get(client.user.id);
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

                if (!ban || !ban.target) return;
                if (ban && ban.executor.id == client.user.id) return;
                embed.setTitle('User Banned');
                embed.setDescription(
                    `**User:** ${user.tag}\n` +
                    `**User ID:** ${user.id}\n\n` +
                    `**Reason:** ${ban && ban.reason ? ban.reason : 'No reason was provided'}\n\n` +
                    `**Moderator:** ${ban && ban.executor ? ban.executor : 'Unknown'}\n` +
                    `**Moderator Tag:** ${ban && ban.executor ? ban.executor.tag : 'Unknown'}\n` +
                    `**Moderator ID:** ${ban && ban.executor ? ban.executor.id : 'Unknown'}`
                )
                embed.setTimestamp(ban.createdTimestamp);
                embed.setColor(result?.preferences ? result.preferences.embedColor : '#447ba1');

                logging(embed, guild.id, client);
            });
    });
}

/**
 * Called when a guild member has been unbanned
 * @param {Object} guild The guild that the event took place in
 * @param {Object} user The user that was unbanned
 * @param {Client} client The bots client
 */
module.exports.remove = (guildObj, client) => {
    let guild = guildObj.guild;
    let user = guildObj.user;
    guildData.findOne({ guildId: guild.id }).then(async result => {
        const me = guild.members.cache.get(client.user.id);
        if (
            !me.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR) ||
            !me.permissions.has(Discord.Permissions.FLAGS.VIEW_AUDIT_LOG) &&
            !me.permissions.has(Discord.Permissions.FLAGS.SEND_MESSAGES)
        ) return;
        setTimeout(() => {
            guild.fetchAuditLogs()
                .then(logs => {
                    let ban = logs.entries
                        .filter(e => e.action == 'MEMBER_BAN_REMOVE')
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .first();
                    let pb = logs.entries
                        .filter(e => e.action == 'MEMBER_BAN_ADD')
                        .filter(e => e.target.id === ban.target.id)
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .first();

                    if (!ban || !ban.target) return;
                    embed.setTitle('User Unbanned');
                    embed.setDescription(
                        `**User:** ${ban.target.tag}\n` +
                        `**User ID:** ${ban.target.id}\n\n` +
                        `**Banned By:** ${pb && pb.executor ? pb.executor.tag : 'Unknown'}\n` +
                        `**Banned For:** ${pb && pb.reason ? pb.reason.toString() : 'No reason was provided'}\n\n` +
                        `**Moderator:** ${ban && ban.executor ? ban.executor : 'Unknown'}\n` +
                        `**Moderator Tag:** ${ban && ban.executor ? ban.executor.tag : 'Unknown'}\n` +
                        `**Moderator ID:** ${ban && ban.executor ? ban.executor.id : 'Unknown'}`
                    )
                    embed.setTimestamp(ban.createdTimestamp);
                    embed.setColor(result?.preferences ? result.preferences.embedColor : '#447ba1');

                    logging(embed, guild.id, client);
                });
        }, 100);
    });
}