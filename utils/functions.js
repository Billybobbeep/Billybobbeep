const guildData = require('../events/client/database/models/guilds');
const guildID = require('../utils/config.json').ServerId;
const Discord = require('discord.js');

module.exports = {
    /**
     * 
     * @param {object} msg The embed to send
     * @param {*} message The message to retreve the guild from
     * @param {object} client The bots client
     * @param {object} options The opptions
     */
    logging: function (msg, message, client, _options) {
        if (typeof message == 'string') {
            guildData.findOne({ guildId: message.toString() }).then(result => {
                if (!result) return;
                let loggingChannel = client.channels.cache.get(result && result.preferences.loggingChannel);
                if (loggingChannel && typeof loggingChannel == 'object')
                    loggingChannel.send(msg).catch((error) => { console.log(error) });
            })

        } else if (typeof message === 'object') {
            let loggingChannel;
            if (message.guild) {
                guildData.findOne({ guildId: message.guild.id }).then(result => {
                    if (!result) return;
                    loggingChannel = client.channels.cache.get(result && result.preferences.loggingChannel);
                    if (loggingChannel && typeof loggingChannel == 'object')
                        loggingChannel.send(msg).catch((error) => { console.log(error) });
                });
            } else {
                guildData.findOne({ guildId: guildID }).then(result => {
                    if (!result) return;
                    loggingChannel = client.channels.cache.get(result && result.preferences.loggingChannel);
                    if (loggingChannel && typeof loggingChannel == 'object')
                        loggingChannel.send(msg).catch((error) => { console.log(error) });
                });
            }
        } else {
            guildData.findOne({ guildId: guildID }).then(result => {
                if (!result) return;
                let loggingChannel = client.channels.cache.get(result && result.preferences.loggingChannel);
                if (loggingChannel && typeof loggingChannel == 'object')
                    loggingChannel.send(msg).catch((error) => { console.log(error) });
            });
        }
    },

    /**
     * Slash command fucntions
     */
    slashCommands: {
        /**
         * @param {object} interaction The slash command interaction
         * @param {object} client The bots client
         * @param {*} response The response to the interaction
         * @returns {object} Returns the interaction token and ID
         */
        reply: async function (interaction, client, response) {
            if (!interaction || !response) return false;
            const createAPIMessage = async (interaction, content) => {
                const { data, files } = await Discord.APIMessage.create(
                    client.channels.resolve(interaction.channel_id),
                    content
                )
                    .resolveData()
                    .resolveFiles()

                return { ...data, files }
            }

            let data = {
                content: response,
            }
            if (typeof response === 'object')
                data = await createAPIMessage(interaction, response)
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data,
                },
            }).then(() => { return { message: { id: interaction.id, token: interaction.token } } }).catch(() => this.permissionCallback(interaction, client, 'SEND_MESSAGES'));
        },
        /**
         * @param {object} interaction
         * @param {*} type The permission type
         */
        clientHasPermissions: async function (interaction, type) {
            if (!type) {
                interaction.guild = await client.guilds.fetch(interaction.guild_id);
                if (interaction.guild.me.permissions.has('ADMINISTRATOR')) return true;
                if (interaction.guild.me.permissions.has('MANAGE_GUILD') &&
                    interaction.guild.me.permissions.has('MANAGE_ROLES') &&
                    interaction.guild.me.permissions.has('MANAGE_CHANNELS') &&
                    interaction.guild.me.permissions.has('KICK_MEMBERS') &&
                    interaction.guild.me.permissions.has('BAN_MEMBERS') &&
                    interaction.guild.me.permissions.has('MANAGE_NICKNAMES') &&
                    interaction.guild.me.permissions.has('MANAGE_NICKNAMES') &&
                    interaction.guild.me.permissions.has('MANAGE_WEBHOOKS') &&
                    interaction.guild.me.permissions.has('VIEW_AUDIT_LOG') &&
                    interaction.guild.me.permissions.has('READ_MESSAGES') &&
                    interaction.guild.me.permissions.has('SEND_MESSAGES') &&
                    interaction.guild.me.permissions.has('MANAGE_MESSAGES') &&
                    interaction.guild.me.permissions.has('ATTACH_FILES') &&
                    interaction.guild.me.permissions.has('READ_MESSAGE_HISTORY') &&
                    interaction.guild.me.permissions.has('ADD_REACTIONS') &&
                    interaction.guild.me.permissions.has('USE_SLASH_COMMANDS')
                ) return true;
            } else if (typeof type == 'string') {
                if (interaction.guild.me.permissions.has(type)) return true; else return false;
            } else if (typeof type == 'object') {
                if (!type.permissions) return true;
                else if (typeof type.permissions == 'object') {
                    let debounce = true;
                    if ((type.permissions).length) return true;
                    (type.permissions).forEach(perm => {
                        if (interaction.guild.me.permissions.has(perm))
                            debounce = false;
                    });
                    return debounce;
                }
            }
        },
        /**
         * @param {object} interaction
         * @param {Client} client
         * @param {string} permission The missing permission
         */
        permissionCallback: function (interaction, client, permission) {
            const { MessageEmbed } = require('discord.js');
            const embed = new MessageEmbed();
            embed.setTitle(`${client.user.username} requires more guild permissions`);
            embed.setDescription(`Unfortunately, this command requires \`${permission}\` permission to work correctly`);
            embed.addField('Don\'t know how?', `Go to **Server Settings**, **Roles** then find the role **${client.user.username}** and make sure **${permission}** is enabled`, false)
            embed.setFooter(`${client.guilds.fetch(interaction.guild_id).name}`);
            embed.setTimestamp();
            embed.setColor('#447ba1');
            this.reply(interaction, client, embed);
        }
    },

    /**
     * @param {object} client the bots client
     */
    cleanDatabase: function (client) {
        const guildData = require('../events/client/database/models/guilds');
        const userData = require('../events/client/database/models/users');
        guildData.find(function (err, result) {
            if (err) return;
            if (!result) return;
            result.forEach(res => {
                if (!client.guilds.cache.get(res.guildId))
                    res.delete();
                if (!res.embedColor)
                    res.delete();
            });
            client.guilds.cache.array().forEach(guild => {
                let table = result.filter(a => a.guildId == guild.id);
                let i = 0;
                table.forEach(() => {
                    i++;
                    if (i == 1 || i == 0) return;
                    guildData.findOne({ guildId: guild.id }).then(guildRes => guildRes.delete());
                });
            });
        });
        userData.find(function (err, result) {
            if (err) return;
            if (!result) return;
            result.forEach(res => {
                if (!client.users.cache.get(res.userId))
                    res.delete();
            });
            client.users.cache.array().forEach(user => {
                let table = result.filter(a => a.userId == user.id);
                let i = 0;
                table.forEach(() => {
                    i++;
                    if (i == 1 || i == 0) return;
                    userData.findOne({ userId: user.id }).then(userRes => userRes.delete());
                });
            });
        });
    },

    guildPerms: {
        /**
         * @param {object} message
         * @param {*} type The permission type
         * @param {object} options Additional options
         * @returns {boolean} If the client has the correct permissions
         */
        clientHasPermissions: function (message, type, options) {
            if (!options || !options.guild) {
                if (!message.guild.me.permissions.has('SEND_MESSAGES')) return false;
                if (!type) {
                    if (message.guild.me.permissions.has('ADMINISTRATOR')) return true;
                    if (message.guild.me.permissions.has('MANAGE_GUILD') &&
                        message.guild.me.permissions.has('MANAGE_ROLES') &&
                        message.guild.me.permissions.has('MANAGE_CHANNELS') &&
                        message.guild.me.permissions.has('KICK_MEMBERS') &&
                        message.guild.me.permissions.has('BAN_MEMBERS') &&
                        message.guild.me.permissions.has('MANAGE_NICKNAMES') &&
                        message.guild.me.permissions.has('MANAGE_NICKNAMES') &&
                        message.guild.me.permissions.has('MANAGE_WEBHOOKS') &&
                        message.guild.me.permissions.has('VIEW_AUDIT_LOG') &&
                        message.guild.me.permissions.has('READ_MESSAGES') &&
                        message.guild.me.permissions.has('SEND_MESSAGES') &&
                        message.guild.me.permissions.has('MANAGE_MESSAGES') &&
                        message.guild.me.permissions.has('ATTACH_FILES') &&
                        message.guild.me.permissions.has('READ_MESSAGE_HISTORY') &&
                        message.guild.me.permissions.has('ADD_REACTIONS') &&
                        message.guild.me.permissions.has('USE_SLASH_COMMANDS')
                    ) return true;
                } else if (typeof type == 'string') {
                    if (message.guild.me.permissions.has(type)) return true; else return false;
                } else if (typeof type == 'object') {
                    if (!type.permissions) return true;
                    else if (typeof type.permissions == 'object') {
                        let debounce = true;
                        if ((type.permissions).length) return true;
                        (type.permissions).forEach(perm => {
                            if (!message.guild.me.permissions.has(perm))
                                debounce = false;
                        });
                        return debounce;
                    }
                }
            } else if (options.guild) {
                let guild = message;
                if (!guild.me.permissions.has('SEND_MESSAGES')) return false;
                if (!type) {
                    if (guild.me.permissions.has('ADMINISTRATOR')) return true;
                    if (guild.me.permissions.has('MANAGE_GUILD') &&
                        guild.me.permissions.has('MANAGE_ROLES') &&
                        guild.me.permissions.has('MANAGE_CHANNELS') &&
                        guild.me.permissions.has('KICK_MEMBERS') &&
                        guild.me.permissions.has('BAN_MEMBERS') &&
                        guild.me.permissions.has('MANAGE_NICKNAMES') &&
                        guild.me.permissions.has('MANAGE_NICKNAMES') &&
                        guild.me.permissions.has('MANAGE_WEBHOOKS') &&
                        guild.me.permissions.has('VIEW_AUDIT_LOG') &&
                        guild.me.permissions.has('READ_MESSAGES') &&
                        guild.me.permissions.has('SEND_MESSAGES') &&
                        guild.me.permissions.has('MANAGE_MESSAGES') &&
                        guild.me.permissions.has('ATTACH_FILES') &&
                        guild.me.permissions.has('READ_MESSAGE_HISTORY') &&
                        guild.me.permissions.has('ADD_REACTIONS') &&
                        guild.me.permissions.has('USE_SLASH_COMMANDS')
                    ) return true;
                } else if (typeof type == 'string') {
                    if (guild.me.permissions.has(type)) return true; else return false;
                } else if (typeof type == 'object') {
                    if (!type.permissions) return true;
                    else if (typeof type.permissions == 'object') {
                        let debounce = true;
                        if ((type.permissions).length) return true;
                        (type.permissions).forEach(perm => {
                            if (!guild.me.permissions.has(perm))
                                debounce = false;
                        });
                        return debounce;
                    }
                }
            }
        },
        /**
         * @param {object} message
         * @param {Client} client
         * @param {string} permission The missing permission
         */
        permissionCallback: function (message, client, permission) {
            const { MessageEmbed } = require('discord.js');
            const embed = new MessageEmbed();
            embed.setTitle(`${client.user.username} requires more guild permissions`);
            embed.setDescription(`Unfortunately, this command requires \`${permission}\` permission to work correctly`);
            embed.addField('Don\'t know how?', `Go to **Server Settings**, **Roles** then find the role **${client.user.username}** and make sure **${permission}** is enabled`, false)
            embed.setFooter(`${message.guild.name}`);
            embed.setTimestamp();
            embed.setColor(result && result.preferences ? result.preferences.embedColor : '#447ba1');
            message.channel.send(embed);
        }
    },

    /**
     * @param {object} message The users message
     * @param {object} avatar The users avatar
     * @param {string} username The users username
     * @param {number} discriminator The users discriminator
     * @param {number} currentXP The users current XP
     * @param {number} requiredXP The required XP to level up
     * @param {number} level The users current level
     */
    rank: function (message, avatar, username, discriminator, currentXP, requiredXP, level) {
        let canvas = require('canvas');
        const { registerFont } = require('canvas');
        const Discord = require('discord.js');
        registerFont('./structure/fonts/OpenSans.ttf', { family: 'Sans' });

        this.data = {
            background: {
                type: "color",
                image: "#23272A"
            },
            overlay: {
                display: true,
                level: 0.5,
                color: "#333640"
            },
            progressBar: {
                rounded: true,
                x: 275.5,
                y: 183.75,
                height: 37.5,
                width: 596.5,
                track: {
                    color: "#484b4E"
                },
                bar: {
                    type: "color",
                    color: "#FFFFFF"
                }
            },
            avatar: {
                source: null,
                x: 70,
                y: 50,
                height: 180,
                width: 180
            },
            level: {
                display: true,
                data: 1,
                textColor: "#FFFFFF",
                color: "#F3F3F3",
                displayText: "LEVEL"
            },
            currentXP: {
                data: 0,
                color: "#FFFFFF"
            },
            requiredXP: {
                data: 0,
                color: "#FFFFFF"
            },
            discriminator: {
                discrim: null,
                color: "rgba(255, 255, 255, 0.4)"
            },
            username: {
                name: null,
                color: "#FFFFFF"
            },
        };

        function abbrev(num) {
            if (!num || isNaN(num)) return "0";
            if (typeof num === "string") num = parseInt(num);
            let decPlaces = Math.pow(10, 1);
            let abbrev = ["K", "M", "B", "T"];
            for (let i = abbrev.length - 1; i >= 0; i--) {
                let size = Math.pow(10, (i + 1) * 3);
                if (size <= num) {
                    num = Math.round((num * decPlaces) / size) / decPlaces;
                    if (num == 1000 && i < abbrev.length - 1) {
                        num = 1;
                        i++;
                    }
                    num += abbrev[i];
                    break;
                }
            }
            return num;
        }

        function calculateProgress() {
            let progressWidth = 596.5;
            const cx = currentXP;
            const rx = requiredXP;

            if (rx <= 0) return 1;
            if (cx > rx) return progressWidth;

            let width = (cx * 615) / rx;
            if (width > progressWidth) width = progressWidth;
            return width;
        }

        function shorten(text, len) {
            if (typeof text !== 'string') return '';
            if (text.length <= len) return text;
            return text.substr(0, len).trim() + '..';
        }

        function toAbbrev(num) {
            return abbrev(num);
        }

        if (!avatar) throw new Error('Avatar is required');
        if (!username) throw new Error('Username is required');
        if (typeof discriminator !== 'number') throw new Error(`Discriminator must be a number, recieved "${typeof discriminator}"`);
        if (typeof currentXP !== 'number') throw new Error(`Current XP must be a number, recieved "${typeof currentXP}"`);
        if (typeof requiredXP !== 'number') throw new Error(`Required XP must be a number, recieved "${typeof requiredXP}"`);
        if (typeof level !== 'number') throw new Error(`Level must be a number, recieved "${typeof level}"`);

        canvas = canvas.createCanvas(932, 282);
        let ctx = canvas.getContext('2d');

        // reset transparency
        ctx.globalAlpha = 1;

        // create background
        ctx.fillStyle = this.data.background.image;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // add overlay
        ctx.globalAlpha = this.data.overlay.level || 1;
        ctx.fillStyle = this.data.overlay.color;
        ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

        // draw username
        ctx.font = 'bold 36px Sans';
        ctx.fillStyle = this.data.username.color;
        ctx.textAlign = 'start';
        let name = shorten(username, 10);

        // apply username
        ctx.fillText(`${name}`, 257 + 18.5, 164);

        // draw discriminator
        let discrim = `${discriminator}`;
        if (discrim) {
            ctx.font = '36px Sans';
            ctx.fillStyle = this.data.discriminator.color;
            ctx.textAlign = 'center';
            ctx.fillText(`#${discrim.substr(0, 4)}`, ctx.measureText(name).width + 20 + 335, 164);
        }

        // fill level
        ctx.font = `bold 36px Sans`;
        ctx.fillStyle = this.data.level.color;
        ctx.fillText(this.data.level.displayText, 800 - ctx.measureText(toAbbrev(parseInt(level))).width, 82);

        ctx.font = `bold 32px Sans`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'end';
        ctx.fillText(toAbbrev(parseInt(level)), 860, 82);

        // show progress
        ctx.font = `bold 30px Sans`;
        ctx.fillStyle = this.data.requiredXP.color;
        ctx.textAlign = "start";
        ctx.fillText("/ " + toAbbrev(requiredXP), 670 + ctx.measureText(toAbbrev(currentXP)).width + 15, 164);

        ctx.fillStyle = this.data.currentXP.color;
        ctx.fillText(toAbbrev(currentXP), 670, 164);

        // draw progressbar
        ctx.beginPath();
        if (this.data.progressBar.rounded) {
            // bg
            ctx.fillStyle = this.data.progressBar.track.color;
            ctx.fill();
            ctx.fillRect(257 + 18.5, 147.5 + 36.25, 615 - 18.5, 37.5);
            ctx.fill();

            ctx.beginPath();
            // apply color
            if (this.data.progressBar.bar.type === "gradient") {
                let gradientContext = ctx.createRadialGradient(calculateProgress(), 0, 500, 0);
                this.data.progressBar.bar.color.forEach((color, index) => {
                    gradientContext.addColorStop(index, color);
                });
                ctx.fillStyle = gradientContext;
            } else {
                ctx.fillStyle = this.data.progressBar.bar.color;
            }

            // progress bar
            ctx.fill();
            ctx.fillRect(257 + 18.5, 147.5 + 36.25, calculateProgress(), 37.5);
            ctx.fill();
        } else {

            // progress bar
            ctx.fillStyle = this.data.progressBar.bar.color;
            ctx.fillRect(this.data.progressBar.x, this.data.progressBar.y, calculateProgress(), this.data.progressBar.height);

            // outline
            ctx.beginPath();
            ctx.strokeStyle = this.data.progressBar.track.color;
            ctx.lineWidth = 7;
            ctx.strokeRect(this.data.progressBar.x, this.data.progressBar.y, this.data.progressBar.width, this.data.progressBar.height);
        }

        ctx.save();

        // circle
        ctx.beginPath();
        ctx.arc(125 + 10, 125 + 20, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // draw avatar
        ctx.drawImage(avatar, 35, 45, this.data.avatar.width + 20, this.data.avatar.height + 20);
        ctx.restore();


        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'rank.png');
        message.channel.send(attachment);
    }
}