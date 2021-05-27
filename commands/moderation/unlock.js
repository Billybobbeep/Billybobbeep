module.exports = {
    name: 'unlock',
    catagory: 'moderation',
    description: 'Unlock a certain channel',
    guildOnly: true,
    usage: 'unlock [channel] [reason]',
    alias: ['lockdown'],
    execute(message, prefix, client) {
        const { MessageEmbed } = require('discord.js');
        const ms = require('ms');
        const log = require('../../utils/functions').logging;
        const guildData = require('../../events/client/database/models/guilds');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let channel;
        let reason;

        function unlock() {
            if (args[1]) {
                if (args[1] && !isNaN(args[1])) channel = message.guild.channels.fetch(channel);
                else if (message.mentions.channels.first()) channel = message.mentions.channels.first();
                else if (args[1].includes('server') || args[1].includes('all')) channel = 'all';
            }
            
            args[2] ? reason = args.slice(2).join(' ') : reason = false;
            if (!reason && !channel && args[1]) reason = args.slice(1).join(' ');
            if (!reason) reason = 'No reason was provided';
            if (!channel) channel = message.channel;

            guildData.findOne({ guildId: message.guild.id }).then(result => {
                const embed = new MessageEmbed();
                const logEmbed = new MessageEmbed();
                embed.setTitle('Channel Unlocked');
                reason ? embed.setDescription('This channel has been unlocked' + '.\nReason: ' + reason) : embed.setDescription('This channel has been unlocked');
                embed.setFooter('Unlocked by: ' + message.author.tag);
                embed.setTimestamp();
                embed.setColor(result.embedColor);

                logEmbed.setDescription(
                    `**Channel:** ${channel ? channel : 'All'}\n` +
                    `**Reason:** ${reason ? reason : 'No reason was provided'}\n\n` +
                    `**Moderator:** ${message.author}\n` +
                    `**Moderator Tag:** ${message.author.tag}\n` +
                    `**Moderator ID:** ${message.author.id}`
                )
                logEmbed.setColor(result.embedColor);
                logEmbed.setTitle('Channel Unlocked');

                if (channel !== 'all') {
                    if (channel.type === 'text') {
                        if (!channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {
                            channel.send(embed);
                            log(logEmbed, message, client);
                            channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                        } else
                            message.channel.send(`${channel} is already unlocked`);
                    } else if (channel.type === 'voice') {
                        if (!channel.permissionsFor(message.guild.roles.everyone).has('CONNECT'))
                            channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['CONNECT'] }], reason ? reason : 'No reason was provided');
                        else
                            message.channel.send(`${channel} is already unlocked`);
                    } else
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                } else {
                    let logged = false;
                    message.guild.channels.cache.array().forEach(channel => {
                        if (channel.id === result.loggingChannel) return;
                        if (channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) return;
                        if (channel.name.toLowerCase().includes('log') || channel.name.toLowerCase().includes('mod')) return;
                        if (channel.type === 'text') {
                            if (!logged) { log(logEmbed, message, client); logged = true; }
                            channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                            reason ? embed.setDescription('This channel has been unlocked' + '.\nReason: ' + reason) : embed.setDescription('This channel has been unlocked');
                            channel.send(embed);
                        } else if (channel.type === 'voice')
                            channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['CONNECT'] }], reason ? reason : 'No reason was provided');
                    });
                }
            });
        }

        let debounce = false;
        guildData.findOne({ guildId: message.guild.id }).then(result => {
            if (message.member.hasPermission('MANAGE_SERVER') || message.member.hasPermission('ADMINISTRATOR')) {
              unlock();
              debounce = true;
            } else if (result.modRole) {
              if (message.member.roles.cache.find(role => role.id === result.modRole)) {
                unlock();
                debounce = true;
              }
              if (debounce === false)
                message.channel.send('You do not have the permissions to use this command');
            }
        });
    }
}