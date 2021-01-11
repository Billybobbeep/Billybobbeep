module.exports = {
    name: 'lock',
    catagory: 'moderation',
    description: 'Lockdown a certain channel',
    guildOnly: true,
    usage: 'lockdown [channel] [duration] [reason]',
    alias: ['lockdown'],
    execute(message, prefix, client) {
        const { MessageEmbed } = require('discord.js');
        const ms = require('ms');
        const log = require('../../utils/functions').logging;
        const guildData = require('../../events/client/database/models/guilds');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let channel;
        let duration;
        let reason;

        if (args[1]) {
            if (!isNaN(args[1])) channel = message.guild.channels.cache.get(channel);
            else if (message.mentions.channels.first()) channel = message.mentions.channels.first();
            else if (args[1].includes('server') || args[1].includes('all')) channel = 'all';
            else if (args[1].toLowerCase().includes('ms') || args[1].toLowerCase().includes('s') || args[1].toLowerCase().includes('m') || args[1].toLowerCase().includes('h') || args[1].toLowerCase().includes('d')) duration = args[1];
        }

        if (!duration && !channel && args[1]) args[1].includes('ms') || args[1].includes('s') || args[1].includes('m') || args[1].includes('h') || args[1].includes('d') ? duration = ms(args[1]) : false;
        if (!duration && args[2]) args[2].includes('ms') || args[2].includes('s') || args[2].includes('m') || args[2].includes('h') || args[2].includes('d') ? duration = ms(args[2]) : false;
        if (!channel) channel = message.channel;
        args[3] ? reason = args.split(3).join(' ') : reason = false;
        if (!reason && args[2]) reason = args.slice(2).join(' ');
        if (!reason) reason = 'No reason was provided';
        if (!isNaN(duration)) duration = ms(duration);

        guildData.findOne({ guildId: message.guild.id }).then(result => {
            const embed = new MessageEmbed();
            const logEmbed = new MessageEmbed();
            embed.setTitle('Channel Locked');
            duration ? embed.setDescription('This channel has been locked for ' + duration + '.\nReason: ' + reason) : embed.setDescription('This channel has been locked till further notice');
            embed.setFooter('Locked by: ' + message.author.tag);
            embed.setTimestamp();
            embed.setColor(result.embedColor);

            logEmbed.setDescription(
                `**Channel:** ${channel ? channel : 'All'}\n` +
                `**Duration:** ${duration ? duration : 'Permanently'}\n` +
                `**Reason:** ${reason ? reason : 'No reason was provided'}\n\n` +
                `**Moderator:** ${message.author}\n` +
                `**Moderator Tag:** ${message.author.tag}\n` +
                `**Moderator ID:** ${message.author.id}`
            )
            logEmbed.setColor(result.embedColor);
            logEmbed.setTitle('Channel Locked');

            if (channel !== 'all') {
                if (channel.type === 'text') {
                    if (channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) {
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, deny: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                        log(logEmbed, message, client);
                        channel.send(embed);
                    } else
                        message.channel.send(`${channel} is already locked`);
                } else if (channel.type === 'voice') {
                    if (channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES'))
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, deny: ['CONNECT'] }], reason ? reason : 'No reason was provided');
                    else
                        message.channel.send(channel + ' is already locked');
                } else
                    channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, deny: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
            } else {
                let logged = false;
                message.guild.channels.cache.array().forEach(channel => {
                    if (channel.id === result.loggingChannel) return;
                    if (!channel.permissionsFor(message.guild.roles.everyone).has('SEND_MESSAGES')) return;
                    if (channel.name.toLowerCase().includes('log') || channel.name.toLowerCase().includes('mod')) return;
                    if (channel.type === 'text') {
                        if (!logged) { log(logEmbed, message, client); logged = true; }
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, deny: ['SEND_MESSAGES'] }], reason ? reason : 'No reason was provided');
                        duration ? embed.setDescription('This channel has been locked for ' + duration + '.\nReason: ' + reason) : embed.setDescription('This channel has been locked till further notice');
                        channel.send(embed);
                    } else if (channel.type === 'voice')
                        channel.overwritePermissions([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, deny: ['CONNECT'] }], reason ? reason : 'No reason was provided');
                });
            }
        });
    }
}