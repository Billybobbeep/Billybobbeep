module.exports = {
    name: 'anti spam',
    description: 'Prevents users from spamming.',
    execute (message, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const db = require('../../../data/databaseManager/index.js');

        class antiSpam {
            constructor(options) {
                this.cache = {
                    messages: [],
                    warnedUsers: [],
                    mutedUsers: []
                }
            }

            log(message, embed) {
                if (db.get(message.guild.id + '.loggingChannel')) {
                    let channel = message.guild.channels.find(channel => channel.id === db.get(message.guild.id + '.loggingChannel') && channel.type === 'text');
                    if (channel) {
                        message.channel.send(embed)
                    }
                }
            }

            embed(string) {
                if (string.toString() === 'author-warn') {
                    embed.setTitle('Billybobbeep | Spam Prevention');
                    embed.setDescription('You have been warned for spamming in ' + message.guild.name);
                    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
                    embed.setTimestamp();
                } else if (string.toString() === 'log-warn') {
                    embed.setTitle('Spam Detected');
                    embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Warned.`);
                } else if (string.toString() === 'author-mute') {
                    embed.setTitle('Billybobbeep | Spam Prevention');
                    embed.setDescription('You have been muted for spamming in ' + message.guild.name);
                    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
                    embed.setTimestamp();
                } else if (string.toString() === 'log-mute') {
                    embed.setTitle('Spam Detected');
                    embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Muted.`);
                } else {
                    throw new TypeError('Invalid arguments whilst creating an embed.');
                }
            }

            async muteUser(message, member, spamMessageNo) {
                this.cache.messages = this.cache.messages.filter((u) => u.authorID !== message.author.id);
                this.cache.mutedUsers.push(message.author.id);
                let role = message.guild.roles.cache.find(role => role.id === db.get(message.guild.id + '.mutedRole'));
                let userCanBeMuted = message.guild.me.hasPermission('MANAGE_ROLES') && (message.guild.me.roles.highest.position > message.member.roles.highest.position);
                if (!userCanBeMuted) {
                    message.channel.send(`Spam detected. Unable to mute due to premission error.`);
                }
                if (message.member.roles.cache.has(role.id)) return true;
                await message.member.roles.add(role, 'Spam Detected.');
                this.embed('author-mute');
                this.embed('log-mute');
            }
        }
    }
}