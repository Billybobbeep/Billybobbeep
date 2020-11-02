module.exports = {
    name: 'Anti Spam',
    description: 'A backend module to monitor all messages sent.',
    execute (message) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const db = require('../../data/databaseManager/index.js');
        
        
//        Settings
//      ------------
        if (message.guild) {
            var spamEnabled = db.get(message.guild.id + '.antiSpam.enabled') || true;
        }

        var ignoredChannels = []; //Channels to ignore (ID)
        var ignoredMembers = []; //Members to ignore (ID)
        var ignoredRoles = []; //Roles to ignore (ID)
        var maxDuplicatesInterval = 2000; //Duplicate messages interval
        var maxInterval = 2000; //Message interval
        var muteEnabled = true; //If the bot can mute users
        var muteThreshold = 4; //How many messages sent to get a mute
        var maxDuplicatesMute = 9; //Amount of the same messages sent in a row to get a mute
        var warnEnabled = true; //If the bot can warn users
        var warnThreshold = 4; //How many messages sent to get a warning
        var maxDuplicatesWarn = 9; //Amount of the same messages sent in a row to get a warning

        var cache = {
            messages: [],
            muted: [],
            warned: []
        }

//        Script
//      -----------
        async function message() {
            console.log(message)
            console.log('1');
            if (!message.guild) return false;
            console.log('2')
            if (message.author.bot) return false;
            console.log('3')
            if (!spamEnabled) return false;
            console.log('4');

            const member = message.member || await message.guild.members.fetch(message.author);

            if (ignoredChannels.has(message.channel.id)) return false;
            if (ignoredMembers.has(message.author.id)) return false;
            if (ignoredRoles.some(role => member.roles.cache.has(role))) return false;

            var currentMessage = {
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
            
            var spamDuplicates = [];
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
                muteUser()
                debounce = true
            } else if (userCanBeMuted && (duplicateMatches.length >= maxDuplicatesMute)) {
                muteUser()
                debounce = true
            }

            const userCanBeWarned = warnEnabled && !cache.warned.includes(message.author.id) && !debounce
            if (userCanBeWarned && (spamMatches.length >= warnThreshold)) {
                warnUser()
                debounce = true
            } else if (userCanBeWarned && (duplicateMatches.length >= maxDuplicatesWarn)) {
                warnUser()
                debounce = true
            }

            return debounce;
        }

        async function log(message, type) {
            let logging = message.guild.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
            if (!logging) {
                db.set(message.guild.id + '.antiSpam.enabled', false);
                embed.setTitle('Spam detection has been turned off');
                embed.setDescription('Spam detection has been turned off due to an invalid logging channel.\nTo set this back up please view the setup manuals.');
                embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
                return message.channel.send(embed);
            }
            if (type.toString() === 'warn') {
                embed.setTitle('Billybobbeep | Spam Prevention');
                embed.setDescription('You have been warned for spamming in ' + message.guild.name);
                embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
                embed.setTimestamp();
                await message.author.send(embed).catch(() => { return log(message, 'err-warn') });
                embed.setTitle('Spam Detected');
                embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Warned.`);
                embed.setTimestamp();
                logging.send(embed);
            } else if (type.toString() === 'mute') {
                embed.setTitle('Billybobbeep | Spam Prevention');
                embed.setDescription('You have been muted for spamming in ' + message.guild.name);
                embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
                embed.setTimestamp();
                await message.author.send(embed).catch(() => { return log(message, 'err-mute') });
                embed.setTitle('Spam Detected');
                embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Muted.`);
                embed.setTimestamp();
                logging.send(embed);
            } else if (type.toString() === 'err-mute') {
                embed.setTitle('Spam Detected');
                embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Muted.`);
                embed.setFooter(`User not notified.`);
                embed.setTimestamp();
                logging.send(embed);
            } else if (type.toString() == 'err-warn') {
                embed.setTitle('Spam Detected');
                embed.setDescription(`**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Action:** Warned.`);
                embed.setFooter(`User not notified.`);
                embed.setTimestamp();
                logging.send(embed);
            } else {
                throw new TypeError(`Invalid type argument.`)
            }
        }

        function warnUser() {
            cache.warnedUsers.push(message.author.id);
            db.push(message.guild.id + '_' + message.author.id + '.warnReasons', 'Automatic Warning - Spamming.');
            db.add(message.guild.id + '_' + message.author.id + '.warnings', 1);
            log(message, 'warn');
        }

        async function muteUser() {
            cache.muted.push(message.author.id);
            const member = message.member || await message.guild.members.fetch(message.author);
            const role = message.guild.roles.cache.find(role => role.id === db.get(message.guild.id + '.mutedRole'));
            const userCanBeMuted = role && message.guild.me.hasPermission('MANAGE_ROLES') && (message.guild.me.roles.highest.position > message.member.roles.highest.position);
            if (!userCanBeMuted) {
                log(message, 'err-mute');
                return false;
            }
            if (message.member.roles.cache.has(role.id)) return true;
            await message.member.roles.add(role, 'Spamming');
            log(message, 'mute');
        }

        function reset() {
            cache = {
                messages: [],
                muted: [],
                warned: []
            }
        }
        message()
    }
}