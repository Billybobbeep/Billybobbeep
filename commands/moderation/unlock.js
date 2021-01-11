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

        if (!args[1]) message.channel.send('Invalid arguments - Please mention either a channel or a reason');
        else if (!isNaN(args[1])) channel = message.guild.channels.cache.get(channel);
        else if (message.mentions.channels.first()) channel = message.mentions.channels.first();
        else if (args[1].includes('server') || args[1].includes('all')) channel = 'all';
        else return message.channel.send('Please mention either a channel or a reason');
        
        if (!channel) channel = message.channel;
        args[2] ? reason = args[2] : reason = false;
        if (!reason && !channel && args[1]) reason = args.slice(1).join(' ');
        if (!reason) reason = 'No reason was provided';

        guildData.findOne({ guildId: message.guild.id }).then(result => {
            const embed = new MessageEmbed();
            embed.setTitle('Channel Unlocked');
            reason ? embed.setDescription('This channel has been unlocked' + '.\nReason: ' + reason) : embed.setDescription('This channel has been unlocked');
            embed.setFooter('Unlocked by: ' + message.author.tag);
            embed.setTimestamp();
            embed.setColor(result.embedColor);
            message.channel.send(embed).then(() => {
                embed.setDescription(
                    `**Channel:** ${channel ? channel : 'All'}\n` +
                    `**Reason:** ${reason ? reason : 'No reason was provided'}\n\n` +
                    `**Moderator:** ${message.author}\n` +
                    `**Moderator Tag:** ${message.author.tag}\n` +
                    `**Moderator ID:** ${message.author.id}`
                )
                embed.setFooter('');
                log(embed, message, client);
            });
            if (channel !== 'all') {
                if (channel.type === 'text')
                    channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                else if (channel.type === 'voice')
                    channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['CONNECT'] }], reason ? reason : 'No reason was provided');
                else
                    channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
            } else {
                message.guild.channels.cache.array().forEach(channel => {
                    if (channel.type === 'text') {
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                        reason ? embed.setDescription('This channel has been unlocked' + '.\nReason: ' + reason) : embed.setDescription('This channel has been unlocked');
                        if (channel.id !== message.channel.id) channel.send(embed);
                    } else if (channel.type === 'voice')
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['CONNECT'] }], reason ? reason : 'No reason was provided');
                    else
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                });
            }
        });
    }
}