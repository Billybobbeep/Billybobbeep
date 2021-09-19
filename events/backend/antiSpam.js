module.exports = {
    name: 'Anti Spam',
    description: 'A backend module to monitor all messages sent',
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const guildData = require('../client/database/models/guilds');
        const guildMemberData = require('../client/database/models/guildMembers');

//        Settings
//      ------------
        let ignoredChannels = []; //Channels to ignore (ID)
        let ignoredMembers = []; //Members to ignore (ID)
        let ignoredRoles = []; //Roles to ignore (ID)
        let maxDuplicatesInterval = 2000; //Duplicate messages interval
        let maxInterval = 2000; //Message interval
        let muteEnabled = true; //If the bot can mute users
        let muteThreshold = 4; //How many messages sent to get a mute
        let maxDuplicatesMute = 9; //Amount of the same messages sent in a row to get a mute
        let warnEnabled = true; //If the bot can warn users
        let warnThreshold = 4; //How many messages sent to get a warning
        let maxDuplicatesWarn = 9; //Amount of the same messages sent in a row to get a warning

        let cache = {
            messages: [],
            muted: [],
            warned: []
        }

        //        Script
        //      -----------
        function checkForSpam() {
            if (!message.guild) return false;
            if (message.author.bot) return false;

            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                if (!result) return;
                const member = message.member || await message.guild.members.cache.get(message.author);
                const canSpam = result.antiSpam_enabled ? false : true;

                if (canSpam) return;
                if (ignoredChannels.length > 0 && ignoredChannels.has(message.channel.id)) return false;
                if (ignoredMembers.length > 0 && ignoredMembers.has(message.author.id)) return false;
                if (ignoredRoles.length > 0 && ignoredRoles.some(role => member.roles.cache.has(role))) return false;

                let currentMessage = {
                    author: message.author.id,
                    ID: message.id,
                    guild: message.guild.id,
                    channel: message.channel.id,
                    content: message.content,
                    sentTimestamp: message.createdTimestamp
                }
                cache.messages.push(currentMessage);

                const cachedMessages = cache.messages.filter(m => m.author === message.author.id && m.guild === message.guild.id);
                const duplicateMatches = cachedMessages.filter(m => m.content === message.content && (m.sentTimestamp > (currentMessage.sentTimestamp - maxDuplicatesInterval)));
                
                let spamDuplicates = [];
                if (duplicateMatches.length > 0) {
                    let debounce = false;
                    cachedMessages.sort((a, b) => b.sentTimestamp - a.sentTimestamp).forEach(element => {
                        if (debounce) return;
                        if (element.content !== duplicateMatches[0].content) debounce = true;
                        else spamDuplicates.push(element);
                    });
                }

                const spamMatches = cachedMessages.filter(m => m.sentTimestamp > (Date.now() - maxInterval));
                let debounce = false;

                const userCanBeMuted = muteEnabled && !cache.muted.includes(message.author.id) && !debounce
                if (userCanBeMuted && (spamMatches.length >= muteThreshold)) {
                    muteUser(message)
                    debounce = true
                } else if (userCanBeMuted && (duplicateMatches.length >= maxDuplicatesMute)) {
                    muteUser(message)
                    debounce = true
                }

                const userCanBeWarned = warnEnabled && !cache.warned.includes(message.author.id) && !debounce
                if (userCanBeWarned && (spamMatches.length >= warnThreshold)) {
                    warnUser(message)
                    debounce = true
                } else if (userCanBeWarned && (duplicateMatches.length >= maxDuplicatesWarn)) {
                    warnUser(message)
                    debounce = true
                }

                return debounce;
            });
        }

        function log(message, type) {
            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                if (!result) return;
                let logging = message.guild.channels.cache.get(result.preferences.loggingChannel);
                if (!logging) {
                    result.antiSpam_enabled = false;
                    result.save();
                    embed.setTitle('Spam detection has been turned off');
                    embed.setDescription('Spam detection has been turned off due to an invalid logging channel.\nSee the logs on the dashboard for more information');
                    embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
                    return message.channel.send({ embeds: [embed] });
                }
                if (type.toString() === 'warn') {
                    embed.setTitle('Billybobbeep | Spam Prevention');
                    embed.setDescription('You have been warned for spamming in ' + message.guild.name);
                    embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
                    embed.setTimestamp();
                    await message.author.send({ embeds: [embed] }).catch(() => { return log(message, 'err-warn') });
                    embed.setTitle('Spam Detected');
                    embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Warned`);
                    embed.setTimestamp();
                    logging.send({ embeds: [embed] });
                } else if (type.toString() === 'mute') {
                    embed.setTitle('Billybobbeep | Spam Prevention');
                    embed.setDescription('You have been muted for spamming in ' + message.guild.name);
                    embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
                    embed.setTimestamp();
                    await message.author.send({ embeds: [embed] }).catch(() => { return log(message, 'err-mute') });
                    embed.setTitle('Spam Detected');
                    embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Muted`);
                    embed.setTimestamp();
                    logging.send({ embeds: [embed] });
                } else if (type.toString() === 'err-mute') {
                    embed.setTitle('Spam Detected');
                    embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Muted`);
                    embed.setFooter('User not notified');
                    embed.setTimestamp();
                    logging.send({ embeds: [embed] });
                } else if (type.toString() == 'err-warn') {
                    embed.setTitle('Spam Detected');
                    embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Warned`);
                    embed.setFooter('User not notified');
                    embed.setTimestamp();
                    logging.send({ embeds: [embed] });
                } else
                    throw new TypeError('Invalid type argument')
            });
        }

        function warnUser(message) {
            guildMemberData.findOne({ guildId: message.guild.id, memberId: message.author.id }).then(result => {
                if (!result) return;
                cache.warnedUsers.push(message.author.id);
                result.warnReasons.length = result.warnReasons.length + 1;
                result.warnReasons[result.warnReasons.length] = 'Automatic Warning - Spamming';
                result.save();
                log(message, 'warn');
            });
        }

        function muteUser(message) {
            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                if (!result) return;
                cache.muted.push(message.author.id);
                const member = message.member || await message.guild.members.cache.get(message.author);
                const me = message.guild.members.cache.get(client.user.id);
                const role = message.guild.roles.cache.find(role => role.id === result.preferences.mutedRole);
                const userCanBeMuted = role && me.permissions.has(Discord.Permissions.FLAGS.MANAGE_ROLES) && (me.roles.highest.position > message.member.roles.highest.position);
                if (!userCanBeMuted) {
                    log(message, 'err-mute');
                    return false;
                }
                if (message.member.roles.cache.has(role.id)) return true;
                await message.member.roles.add(role, 'Spamming');
                log(message, 'mute');
            });
        }

        function reset() {
            cache = {
                messages: [],
                muted: [],
                warned: []
            }
        }
        checkForSpam()
    }
}