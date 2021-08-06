module.exports = {
    name: 'mute',
    description: 'Mute a member',
    guildOnly: true,
    catagory: 'moderation',
    usage: 'mute [user] [time] [reason]',
    /**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message, prefix, client) {
        const guildData = require('../../events/client/database/models/guilds.js');
        const mutedMembers = require('../../events/client/database/models/mutedMembers.js');
        const Discord = require('discord.js');
        let embed1 = new Discord.MessageEmbed();
        let embed2 = new Discord.MessageEmbed();
        const ms = require('ms');
        const logging = require('../../utils/functions').logging;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        function muteCmd() {
            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                if (!result.preferences) {
                    result.preferences = {}
                    result.save();
                }
                let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
                let reason = args.slice(3).join(' ');
                let time = args[2] || undefined;
                let member = message.guild.members.cache.get(user.id);
                if (member.roles.cache.find(r => r.id === result.preferences.mutedRole)) return message.channel.send(`<@!${user.id}> is already muted`);
                if (user.bot) return message.channel.send('You cannot mute bots');
                if (!result.preferences.mutedRole) return message.channel.send('You must setup a muted role in your server to use this command');
                if (!user) return message.channel.send('You must provide a user to mute');
                if (!user.tag) user = user.user;
                if (user.id === message.author.id) return message.channel.send('You cannot mute yourself');
                if (!member) return message.channel.send('I could not find the member you provided');
                if (!time) return message.channel.send('You must provide a time or reason');
                if (user.id === message.guild.owner.id) return message.channel.send('You cannot mute the guild owner');
                try {
                    if (time.endsWith('h') || time.endsWith('m') || time.endsWith('s')) time = ms(time); else time = false;
                } catch {
                    time = false
                }
                if (!time) reason = args.slice(2).join(' ');
                if (!reason) reason = 'No reason was provided';
                if (!message.guild.roles.fetch(r => r.id === result.preferences.mutedRole)) return message.channel.send('You must setup a muted role in your server to use this command');
                member.roles.add(message.guild.roles.cache.find(role => role.id === result.preferences.mutedRole)).then(() => message.channel.send('Successfully muted <@!' + user.id + '>')).catch(error => {
                    if (error.toString().includes('permissions')) return message.channel.send('I cannot mute <@!' + user.id + '>. Make sure my highest role is above <@!' + user.id + '>\'s highest role.');
                    else { return message.channel.send('An unknown error occurred') }
                });
                embed1.setTimestamp();
                embed1.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
                embed1.setTitle('You have been muted');
                embed1.addField('Responsible Moderator:', message.author.tag);
                embed1.addField('Reason:', reason);
                embed1.addField('Guild:', message.guild.name);
                time ? embed1.addField('Time:', ms(time).replace('s', 'second(s)').replace('m', ' minute(s)').replace('h', ' hour(s)')) : null;
                try {
                    user.send(embed1);
                } catch {
                    embed2.setFooter('DM could not be sent');
                }
                embed2.setTitle('User Muted');
                embed2.setTimestamp();
                embed2.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
                time ?
                    embed2.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n\n**Time:** ${ms(time).replace('m', ' minute(s)').replace('h', ' hours')}\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`)
                    : embed2.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n\n**Time:** Until unmuted\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`);
                logging(embed2, message, client);
                const newMutedMember = new mutedMembers({ guildId: message.guild.id, userId: user.id, time: (Date.now() + time) });
                time ? newMutedMember.save() : null;
            });
        }
        let debounce = false;

        guildData.findOne({ guildId: message.guild.id }).then(result => {
            if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
                muteCmd();
                debounce = true;
            } else if (result.preferences.modRole) {
                if (message.member.roles.cache.find(role => role.id === result.preferences.modRole)) {
                    muteCmd();
                    debounce = true;
                }
            }
            if (debounce === false)
                message.channel.send('You do not have the permissions to use this command');
        });
    }
}