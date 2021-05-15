const guildData = require('../events/client/database/models/guilds');
const guildID = require('../utils/config.json').ServerId;
const Discord = require('discord.js');

module.exports.logging = function (msg, message, client, option) {
    if (typeof message == 'string') {
        guildData.findOne({ guildId: message.toString() }).then(result => {
            let loggingChannel = client.channels.cache.get(result.loggingChannel);
            if (loggingChannel)
                loggingChannel.send(msg).catch((error) => { console.log(error) });
        })

    } else if (typeof message === 'object') {
        let loggingChannel;
        if (message.guild) {
            guildData.findOne({ guildId: message.guild.id }).then(result => {
                loggingChannel = client.channels.cache.get(result.loggingChannel);
                if (loggingChannel) loggingChannel.send(msg).catch((error) => { console.log(error) });
            });
        } else {
            guildData.findOne({ guildId: guildID }).then(result => {
                loggingChannel = client.channels.cache.get(result.loggingChannel);
                if (loggingChannel) loggingChannel.send(msg).catch((error) => { console.log(error) });
            });
        }
    } else {
        guildData.findOne({ guildId: guildID }).then(result => {
            let loggingChannel = client.channels.cache.get(result.embedColor);
            if (loggingChannel) loggingChannel.send(msg).catch((error) => { console.log(error) });
        });
    }
}

module.exports.slashCommands = {
    reply: async function (interaction, client, response, callback) {
        if (!interaction || !response) if (callback) return callback(false); else return false;
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
        }).then(() => { if (callback) (callback(true, { message: { id: interaction.id, token: interaction.token } })); else return true });
    }
}

module.exports.cleanDatabase = function (client) {
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
            if (!client.users.fetch(res.userId))
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
}

module.exports.rank = function (message, avatar, username, discriminator, currentXP, requiredXP, level) {
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