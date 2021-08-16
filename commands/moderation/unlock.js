module.exports = {
    name: 'unlock',
    catagory: 'moderation',
    description: 'Unlock a certain channel',
    guildOnly: true,
    usage: 'unlock [channel] [reason]',
    alias: [],
    /**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message, prefix, client) {
        const { MessageEmbed, Permissions } = require('discord.js');
        const ms = require('ms');
        const log = require('../../utils/functions').logging;
        const guildData = require('../../events/client/database/models/guilds');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let channel;
        let reason;

        function unlock() {
            if (args[1]) {
                if (args[1] && !isNaN(args[1])) channel = message.guild.channels.cache.get(channel);
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
                embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');

                logEmbed.setDescription(
                    `**Channel:** ${channel ? channel : 'All'}\n` +
                    `**Reason:** ${reason ? reason : 'No reason was provided'}\n\n` +
                    `**Moderator:** ${message.author}\n` +
                    `**Moderator Tag:** ${message.author.tag}\n` +
                    `**Moderator ID:** ${message.author.id}`
                )
                logEmbed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
                logEmbed.setTitle('Channel Unlocked');

                if (channel !== 'all') {
                    if (channel.type === 'text') {
                        if (!channel.permissionsFor(message.guild.roles.everyone).has(Permissions.FLAGS.SEND_MESSAGES)) {
                            channel.send({ embeds: [embed] });
                            log(logEmbed, message, client);
                            channel.permissionOverwrites.set([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: [Permissions.FLAGS.SEND_MESSAGES] }], reason ? reason + ` - ${message.author.tag} via ${prefix}${this.name}` : `No reason was provided - ${message.author.tag} via ${prefix}${this.name}`);
                        } else
                            message.channel.send(`${channel} is already unlocked`);
                    } else if (channel.type === 'voice') {
                        if (!channel.permissionsFor(message.guild.roles.everyone).has(Permissions.FLAGS.CONNECT))
                            channel.permissionOverwrites.set([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: [Permissions.FLAGS.CONNECT] }], reason ? reason + ` - ${message.author.tag} via ${prefix}${this.name}` : `No reason was provided - ${message.author.tag} via ${prefix}${this.name}`);
                        else
                            message.channel.send(`${channel} is already unlocked`);
                    } else
                        channel.permissionOverwrites.set([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: [Permissions.FLAGS.SEND_MESSAGES] }], reason ? reason + ` - ${message.author.tag} via ${prefix}${this.name}` : `No reason was provided - ${message.author.tag} via ${prefix}${this.name}`);
                } else {
                    let logged = false;
                    message.guild.channels.cache.array().forEach(channel => {
                        if (channel.id === result.preferences.loggingChannel) return;
                        if (channel.permissionsFor(message.guild.roles.everyone).has(Permissions.FLAGS.SEND_MESSAGES)) return;
                        if (channel.name.toLowerCase().includes('log') || channel.name.toLowerCase().includes('mod')) return;
                        if (channel.type === 'text') {
                            if (!logged) { log(logEmbed, message, client); logged = true; }
                            channel.permissionOverwrites.set([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: [Permissions.FLAGS.SEND_MESSAGES] }], reason ? reason + ` - ${message.author.tag} via ${prefix}${this.name}` : `No reason was provided - ${message.author.tag} via ${prefix}${this.name}`);
                            reason ? embed.setDescription('This channel has been unlocked' + '.\nReason: ' + reason) : embed.setDescription('This channel has been unlocked');
                            channel.send({ embeds: [embed] });
                        } else if (channel.type === 'voice')
                            channel.permissionOverwrites.set([{ id: message.guild.roles.cache.find(r => r.name === '@everyone').id, allow: [Permissions.FLAGS.CONNECT] }], reason ? reason + ` - ${message.author.tag} via ${prefix}${this.name}` : `No reason was provided - ${message.author.tag} via ${prefix}${this.name}`);
                    });
                }
            });
        }

        let debounce = false;
        guildData.findOne({ guildId: message.guild.id }).then(result => {
            if (message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) || message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
              unlock();
              debounce = true;
            } else if (result.preferences.modRole) {
              if (message.member.roles.cache.find(role => role.id === result.preferences.modRole)) {
                unlock();
                debounce = true;
              }
              if (debounce === false)
                message.channel.send('You do not have the permissions to use this command');
            }
        });
    }
}