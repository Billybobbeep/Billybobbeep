const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
const guildData = require('../../events/client/database/models/guilds.js');


function handling(client, message) {
    let prefix = guildData.findOne({ guildId: message.guild.id }).then(result => result.prefix) || '~';
    let args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g)
    if (args[1] === 'help') help_embed(message, prefix);
    else filter_flags(client, message, prefix);
}
function help_embed(message, prefix) {
    embed.setColor(`${guildData.findOne({ guildId: message.guild.id }).then(result => result.embedColor) || '#447ba1'}`)
    embed.setFooter('NOTE: All flags require no spaces')
    embed.setDescription(
        '**Flags:**\n\n' +
        '--filter-user-[user-id] - ' + 'Filters all logs by the user ID.\n' +
        '--filter-logs-[audit/bot] - ' + 'Filters logs by the bot or from the audit logs.*\n' +
        '--remove-action-[action] - ' + 'Remove certain actions from the table. (See below for available actions)\n' +
        '--filter-action-[action] - ' + 'Filter logs by a certain action. (See below for available actions)\n\n' +
        '* = required\n\n' +

        '**Actions**\n' +
        '`The following actions are only available with the audit log flag\n\n' +
        'emoji_update - ' + 'Add, remove or rename emojis.\n' + //EMOJI_DELETE, EMOJI_UPDATE, EMOJI_CREATE
        'role_update - ' + 'Add, remove or rename roles.\n' + //ROLE_UPDATE
        'member_role_update - ' + 'Member add or remove role.\n' + //MEMBER_ROLE_UPDATE
        'channel_update - ' + 'Channel added or removed.\n' + //CHANNEL_CREATE, CHANNEL_DELETE
        'bulk_delete - ' + 'Purged Messages.\n' + //MESSAGE_BULK_DELETE
        'ban_add - ' + 'Member banned.\n' + //MEMBER_BAN_ADD
        'ban_remove - ' + 'Member unbanned.\n' + //MEMBER_BAN_REMOVE
        'kick_add - ' + 'Member kicked.\n' + //MEMBER_KICK
        'bot_add - ' + 'Bot added to the guild.\n\n' + //BOT_ADD
        '`The following actions are only available for the bot log flag\n\n' +
        'warn_add - ' + 'Member warned.\n' +
        'warn_remove - ' + 'Member warning removed.\n' +
        'mute_add - ' + 'Member muted.\n' +
        'mute_remove - ' + 'Member unmuted.\n\n' +
        'NOTE: You can filter up to 3 actions.\nIf you did want to filter more than one action use:\n `' + prefix + 'logs --filter-logs[audit] --filter-action-[action1]-[action2]-[action3]`'
    );
    message.channel.send(embed)
}
function filter_flags(client, message, prefix) {
    let args = message.content.toLowerCase().split(/ +/g)
    if (!message.content.toLowerCase().includes('--filter-logs')) return message.channel.send(`Logs flag was not found, please make sure you have included all of the required flags`);
    if (message.content.toLowerCase().includes('--filter-logs-bot')) {

    } else if (message.content.toLowerCase().includes('--filter-logs-audit')) {
        let debounce = false;
        let actions = args.find(f => f.startsWith('--filter-action-') || f.startsWith('--filter-actions-')) || 'Not filtered'
        if (actions !== 'Not filtered') {
            actions = actions.substring(16);
            actions = actions.replace('-', ' ').replace('-', ' ').split(/ +/g);
            if (actions[2] && actions[2].includes('-')) return message.channel.send(`You can only select up to \`3\` actions to filter`);
            
            let FA = '';
            let SA = '';
            let TA = '';
            if (actions[0]) {
                if (actions[0].toLowerCase() === 'emoji_update')
                    FA = ['EMOJI_DELETE', 'EMOJI_UPDATE', ' EMOJI_CREATE'];
                else if (actions[0].toLowerCase() === 'role_update')
                    FA = 'ROLE_UPDATE';
                else if (actions[0].toLowerCase() === 'member_role_update')
                    FA = 'MEMBER_ROLE_UPDATE';
                else if (actions[0].toLowerCase() === 'channel_update')
                    FA = ['CHANNEL_CREATE', 'CHANNEL_DELETE'];
                else if (actions[0].toLowerCase() === 'bulk_delete')
                    FA = 'MESSAGE_BULK_DELETE';
                else if (actions[0].toLowerCase() === 'ban_add')
                    FA = 'MEMBER_BAN_ADD';
                else if (actions[0].toLowerCase() === 'ban_remove')
                    FA = 'MEMBER_BAN_REMOVE';
                else if (actions[0].toLowerCase() === 'kick_add')
                    FA = 'MEMBER_KICK';
                else if (actions[0].toLowerCase() === 'bot_add')
                    FA = 'BOT_ADD';
                else return message.channel.send(`**${actions[0][0].toUpperCase() + actions[0].substring(1).toLowerCase()}** is not a valid action`);
            } else 
                return message.channel.send('You have entered an invalid action')
            
            if (actions[1]) {
                if (actions[1].toLowerCase() === 'emoji_update')
                    SA = ['EMOJI_DELETE', 'EMOJI_UPDATE', ' EMOJI_CREATE'];
                else if (actions[1].toLowerCase() === 'role_update')
                    SA = 'ROLE_UPDATE';
                else if (actions[1].toLowerCase() === 'member_role_update')
                    SA = 'MEMBER_ROLE_UPDATE';
                else if (actions[1].toLowerCase() === 'channel_update')
                    SA = ['CHANNEL_CREATE', 'CHANNEL_DELETE'];
                else if (actions[1].toLowerCase() === 'bulk_delete')
                    SA = 'MESSAGE_BULK_DELETE';
                else if (actions[1].toLowerCase() === 'ban_add')
                    SA = 'MEMBER_BAN_ADD';
                else if (actions[1].toLowerCase() === 'ban_remove')
                    SA = 'MEMBER_BAN_REMOVE';
                else if (actions[1].toLowerCase() === 'kick_add')
                    SA = 'MEMBER_KICK';
                else if (actions[1].toLowerCase() === 'bot_add')
                    SA = 'BOT_ADD';
                else return message.channel.send(`**${actions[1][0].toUpperCase() + actions[1].substring(1).toLowerCase()}** is not a valid action`);
            }

            if (actions[2]) {
                if (actions[2].toLowerCase() === 'emoji_update')
                    TA = ['EMOJI_DELETE', 'EMOJI_UPDATE', ' EMOJI_CREATE'];
                else if (actions[2].toLowerCase() === 'role_update')
                    TA = 'ROLE_UPDATE';
                else if (actions[2].toLowerCase() === 'member_role_update')
                    TA = 'MEMBER_ROLE_UPDATE';
                else if (actions[2].toLowerCase() === 'channel_update')
                    TA = ['CHANNEL_CREATE', 'CHANNEL_DELETE'];
                else if (actions[2].toLowerCase() === 'bulk_delete')
                    TA = 'MESSAGE_BULK_DELETE';
                else if (actions[2].toLowerCase() === 'ban_add')
                    TA = 'MEMBER_BAN_ADD';
                else if (actions[2].toLowerCase() === 'ban_remove')
                    TA = 'MEMBER_BAN_REMOVE';
                else if (actions[2].toLowerCase() === 'kick_add')
                    TA = 'MEMBER_KICK';
                else if (actions[2].toLowerCase() === 'bot_add')
                    TA = 'BOT_ADD';
                else return message.channel.send(`**${actions[2][0].toUpperCase() + actions[2].substring(1).toLowerCase()}** is not a valid action`);
            }

            if (FA !== '' && SA !== '') if (FA === SA) return message.channel.send(`You have filtered the action **${actions[0]}** more than once.\nYou can only filter an action once`);
            if (SA !== '' && TA !== '') if (SA === TA) return message.channel.send(`You have filtered the action **${actions[1]}** more than once.\nYou can only filter an action once`);
            if (TA !== '' && FA !== '') if (TA === FA) return message.channel.send(`You have filtered the action **${actions[2]}** more than once.\nYou can only filter an action once`);

            audit_logs(client, message, (FA || undefined), (SA || undefined), (TA || undefined), 'filter-action');
            debounce = true;
        }

        actions = args.find(f => f.startsWith('--remove-action-') || f.startsWith('--remove-actions-')) || 'Not filtered';
        if (actions !== 'Not filtered') {
            actions = actions.substring(16);
            actions = actions.replace('-', ' ').replace('-', ' ').split(/ +/g);
            if (actions[2] && actions[2].includes('-')) return message.channel.send(`You can only select up to \`3\` actions to remove`);
            
            let FA = '';
            let SA = '';
            let TA = '';
            if (actions[0]) {
                if (actions[0].toLowerCase() === 'emoji_update')
                    FA = ['EMOJI_DELETE', 'EMOJI_UPDATE', ' EMOJI_CREATE'];
                else if (actions[0].toLowerCase() === 'role_update')
                    FA = 'ROLE_UPDATE';
                else if (actions[0].toLowerCase() === 'member_role_update')
                    FA = 'MEMBER_ROLE_UPDATE';
                else if (actions[0].toLowerCase() === 'channel_update')
                    FA = ['CHANNEL_CREATE', 'CHANNEL_DELETE'];
                else if (actions[0].toLowerCase() === 'bulk_delete')
                    FA = 'MESSAGE_BULK_DELETE';
                else if (actions[0].toLowerCase() === 'ban_add')
                    FA = 'MEMBER_BAN_ADD';
                else if (actions[0].toLowerCase() === 'ban_remove')
                    FA = 'MEMBER_BAN_REMOVE';
                else if (actions[0].toLowerCase() === 'kick_add')
                    FA = 'MEMBER_KICK';
                else if (actions[0].toLowerCase() === 'bot_add')
                    FA = 'BOT_ADD';
                else return message.channel.send(`**${actions[0][0].toUpperCase() + actions[0].substring(1).toLowerCase()}** is not a valid action`);
            } else 
                return message.channel.send(`You have entered an invalid action`);
            
            if (actions[1]) {
                if (actions[1].toLowerCase() === 'emoji_update')
                    SA = ['EMOJI_DELETE', 'EMOJI_UPDATE', ' EMOJI_CREATE'];
                else if (actions[1].toLowerCase() === 'role_update')
                    SA = 'ROLE_UPDATE';
                else if (actions[1].toLowerCase() === 'member_role_update')
                    SA = 'MEMBER_ROLE_UPDATE';
                else if (actions[1].toLowerCase() === 'channel_update')
                    SA = ['CHANNEL_CREATE', 'CHANNEL_DELETE'];
                else if (actions[1].toLowerCase() === 'bulk_delete')
                    SA = 'MESSAGE_BULK_DELETE';
                else if (actions[1].toLowerCase() === 'ban_add')
                    SA = 'MEMBER_BAN_ADD';
                else if (actions[1].toLowerCase() === 'ban_remove')
                    SA = 'MEMBER_BAN_REMOVE';
                else if (actions[1].toLowerCase() === 'kick_add')
                    SA = 'MEMBER_KICK';
                else if (actions[1].toLowerCase() === 'bot_add')
                    SA = 'BOT_ADD';
                else return message.channel.send(`**${actions[1][0].toUpperCase() + actions[1].substring(1).toLowerCase()}** is not a valid action`);
            }

            if (actions[2]) {
                if (actions[2].toLowerCase() === 'emoji_update')
                    TA = ['EMOJI_DELETE', 'EMOJI_UPDATE', ' EMOJI_CREATE'];
                else if (actions[2].toLowerCase() === 'role_update')
                    TA = 'ROLE_UPDATE';
                else if (actions[2].toLowerCase() === 'member_role_update')
                    TA = 'MEMBER_ROLE_UPDATE';
                else if (actions[2].toLowerCase() === 'channel_update')
                    TA = ['CHANNEL_CREATE', 'CHANNEL_DELETE'];
                else if (actions[2].toLowerCase() === 'bulk_delete')
                    TA = 'MESSAGE_BULK_DELETE';
                else if (actions[2].toLowerCase() === 'ban_add')
                    TA = 'MEMBER_BAN_ADD';
                else if (actions[2].toLowerCase() === 'ban_remove')
                    TA = 'MEMBER_BAN_REMOVE';
                else if (actions[2].toLowerCase() === 'kick_add')
                    TA = 'MEMBER_KICK';
                else if (actions[2].toLowerCase() === 'bot_add')
                    TA = 'BOT_ADD';
                else return message.channel.send(`**${actions[2][0].toUpperCase() + actions[2].substring(1).toLowerCase()}** is not a valid action`);
            }

            if (FA !== '' && SA !== '') if (FA === SA) return message.channel.send(`You have filtered the action **${actions[0]}** more than once.\nYou can only filter an action once`);
            if (SA !== '' && TA !== '') if (SA === TA) return message.channel.send(`You have filtered the action **${actions[1]}** more than once.\nYou can only filter an action once`);
            if (TA !== '' && FA !== '') if (TA === FA) return message.channel.send(`You have filtered the action **${actions[2]}** more than once.\nYou can only filter an action once`);

            audit_logs(client, message, (FA || undefined), (SA || undefined), (TA || undefined), 'remove-action');
            debounce = true;
        }
    } else return message.channel.send('You have entered an invalid log flag');

    if (debounce === false)
        audit_logs(client, message, undefined, undefined, undefined, 'none');
}
function audit_logs(client, message, action1, action2, action3) {
    message.guild.fetchAuditLogs().then(logs => {
        let log = logs.entries;
        if (action1 !== undefined && action2 === undefined && action3 === undefined) log = log.filter(e => e.executor.id !== client.user.id).filter(e => e.action === action1); else
        if (action1 !== undefined && action2 !== undefined && action3 === undefined) log = log.filter(e => e.executor.id !== client.user.id).filter(e => e.action === action1 || e.action === action2); else
        if (action1 !== undefined && action2 !== undefined && action3 !== undefined) log = log.filter(e => e.executor.id !== client.user.id).filter(e => e.action === action1 || e.action === action3);
        else log = log.filter(e => e.executor.id !== client.user.id)
        log = log.sort((a, b) => b.createdAt - a.createdAt);
        log.forEach(r => {
            
        });
    });
}
function bot_logs(client, message, action1, action2, action3) {

}



module.exports = {
    name: 'logs',
    description: 'View recent logs',
    guildOnly: true,
    catagory: 'moderation',
    usage: 'logs help',
    execute (message, prefix, client) {
        if (message.member.roles.cache.has(['VIEW_AUDIT_LOG', 'ADMINISTRATOR']) && !message.member.roles.cache.find(role => role.id === guildData.findOne({ guildId: message.guild.id }).then(result => result.modRole)))
            return message.channel.send('You must have the `View Audit Log` permissions to use this command');
        else handling(client, message);
    }
}