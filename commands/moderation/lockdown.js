module.exports = {
    name: 'lockdown',
    catagory: 'moderation',
    description: 'Lockdown a certain channel',
    guildOnly: true,
    usage: 'lockdown [channel] [duration] [reason]',
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
        else if (args[1].toLowerCase().includes('ms') || args[1].toLowerCase().includes('s') || args[1].toLowerCase().includes('m') || args[1].toLowerCase().includes('h') || args[1].toLowerCase().includes('d')) duration = args[1];
        else return message.channel.send('Please mention either a channel or a duration');

        if (!channel) channel = message.channel;
        if (!duration) args[2] && args[2].includes('ms') || args[2].includes('s') || args[2].includes('m') || args[2].includes('h') || args[2].includes('d') ? duration = ms(args[2]) : false;
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
            channel.overwritePermissions({ SEND_MESSAGES: false });
        });
    }
}