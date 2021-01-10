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
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let channel;
        let duration;
        let reason;

        if (!args[1]) message.channel.send('Invalid arguments - Please mention either a channel or a duration');
        else if (!isNaN(args[1])) channel = message.guild.channels.cache.get(channel);
        else if (message.mentions.channels.first()) channel = message.mentions.channels.first();
        else if (args[1].includes('server') || args[1].includes('all')) channel = 'all';
        else if (args[1].toLowerCase().includes('ms') || args[1].toLowerCase().includes('s') || args[1].toLowerCase().includes('m') || args[1].toLowerCase().includes('h') || args[1].toLowerCase().includes('d')) duration = args[1];
        else return message.channel.send('Please mention either a channel or a duration');

        if (!duration && !channel) args[1] && args[1].includes('ms') || args[1].includes('s') || args[1].includes('m') || args[1].includes('h') || args[1].includes('d') ? duration = ms(args[1]) : false;
        if (!duration) args[2] && args[2].includes('ms') || args[2].includes('s') || args[2].includes('m') || args[2].includes('h') || args[2].includes('d') ? duration = ms(args[2]) : false;
        if (!channel) channel = message.channel;
        args[3] ? reason = args[3] : reason = false;
        if (!reason && !duration && args[2]) reason = args.split(2).join(' ');


        guildData.findOne({ guildId: message.guild.id }).then(result => {
            const embed = new MessageEmbed();
            embed.setTitle('Channel Locked');
            duration ? embed.setDescription('This channel has been locked for ' + duration + '.\nReason: ' + reason) : embed.setDescription('This channel has been locked till further notice.');
            embed.setFooter('Locked by: ' + message.author.tag);
            embed.setTimestamp();
            embed.setColor(result.embedColor);
            message.channel.send(embed).then(() => {
                embed.setDescription(
                    `**Channel:** ${channel ? `<#!${channel.id}>` : 'All'}\n` +
                    `**Duration:** ${duration ? duration : 'Permanently'}\n` +
                    `**Reason:** ${reason ? reason : 'No reason was provided'}\n\n` +
                    `**Moderator:** ${message.author}\n` +
                    `**Moderator Tag:** ${message.author.tag}\n` +
                    `**Moderator ID:** ${message.author.id}`
                )
                embed.setFooter('');
                log(embed);
            });
            if (channel !== 'all') {
                if (channel.type === 'text')
                    channel.overwritePermissions({ SEND_MESSAGES: false }, reason ? reason : 'No reason was provided');
                else if (channel.type === 'voice')
                    channel.overwritePermissions({ CONNECT: false }, reason ? reason : 'No reason was provided');
                else
                    channel.overwritePermissions({ SEND_MESSAGES: false }, reason ? reason : 'No reason was provided');
            } else {
                message.guild.channels.cache.array().forEach(channel => {
                    if (channel.type === 'text') {
                        channel.overwritePermissions({ SEND_MESSAGES: false }, reason ? reason : 'No reason was provided');
                    } else if (channel.type === 'voice') {
                        channel.overwritePermissions({ CONNECT: false }, reason ? reason : 'No reason was provided');
                    }
                });
            }
        });
    }
}