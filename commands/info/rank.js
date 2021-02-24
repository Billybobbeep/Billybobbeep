module.exports = {
    name: 'rank',
    description: 'View your xp',
    catagory: 'info',
    alias: ['cl', 'currlvl', 'xp'],
    guildOnly: true,
    async execute (message, prefix, client) {
        const guildMemberData = require('../../events/client/database/models/guildMembers.js');
        const { MessageAttachment } = require('discord.js');
        const jimp = require('jimp');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (!user.username) user = user.user;
        let displayName = `${user.username[0].toUpperCase()}${(user.username).substring(1).toLowerCase()}`;
        let msg = await message.channel.send('Please wait..');

        guildMemberData.findOne({ guildId: message.guild.id, memberId: user.id}).then(async result => {
            if (!result) msg.edit('No data found');
            let level = result.level || 0;
            let xp = result.xp || 1;
            let discriminator = user.discriminator;
            let xpForLevel = 150;
            if (result.activeGuild) {
                if (level < 5) {
                    xpForLevel = 150
                } else if (level >= 5 && level < 10) {
                    xpForLevel = 200
                } else if (level >= 10 && level < 30) {
                    xpForLevel = 250
                } else if (level >= 30 && level < 40) {
                    xpForLevel = 300
                } else if (level >= 40 && level < 50) {
                    xpForLevel = 350
                } else if (level >= 50 && level < 60) {
                    xpForLevel = 400
                } else if (level >= 70 && level < 80) {
                    xpForLevel = 450
                } else if (level >= 90 && level < 100) {
                    xpForLevel = 500
                } else if (level >= 100 && level < 110) {
                    xpForLevel = 550
                } else if (level >= 110 && level < 120) {
                    xpForLevel = 600
                } else if (level >= 120 && level < 140) {
                    xpForLevel = 650
                } else if (level >= 140 && level < 160) {
                    xpForLevel = 700
                } else if (level >= 160 && level < 180) {
                    xpForLevel = 750
                } else if (level >= 180) {
                    xpForLevel = 800
                }
            } else {
                if (level >= 20 && level < 30) {
                    xpForLevel = 150
                } else if (level >= 30 && level < 40) {
                    xpForLevel = 200
                } else if (level >= 40 && level < 50) {
                    xpForLevel = 230
                } else if (level >= 50 && level < 60) {
                    xpForLevel = 260
                } else if (level >= 70 && level < 80) {
                    xpForLevel = 290
                } else if (level >= 90 && level < 100) {
                    xpForLevel = 320
                } else if (level >= 100 && level < 110) {
                    xpForLevel = 350
                } else if (level >= 110 && level < 120) {
                    xpForLevel = 380
                } else if (level >= 120 && level < 140) {
                    xpForLevel = 410
                } else if (level >= 140 && level < 160) {
                    xpForLevel = 440
                } else if (level >= 160 && level < 180) {
                    xpForLevel = 470
                } else if (level >= 180) {
                    xpForLevel = 600
                }
            }

            let image = await jimp.read(`https://api.xzusfin.repl.co/rankcard?avatar=${user.displayAvatarURL({ dynamic: false, format: 'png' })}&size=2048&name=${displayName}%23${discriminator}&level=${level}&exp=${xp}&maxexp=${xpForLevel}`.toString());
            message.channel.send(new MessageAttachment(await image.getBufferAsync(jimp.MIME_PNG))).then(() => msg.delete());
            
            //require('../../utils/functions').rank(message, avatar, displayName, parseInt(discriminator), xp, xpForLevel, level);
        });
    }
}