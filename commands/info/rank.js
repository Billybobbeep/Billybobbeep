const { Canvas } = require('canvas');

module.exports = {
    name: 'rank',
    description: 'View your xp',
    catagory: 'info',
    alias: ['cl', 'currlvl', 'xp'],
    guildOnly: true,
    async execute (message, prefix, client) {
        const guildMemberData = require('../../events/client/database/models/guildMembers.js');
        const canvas = require('canvas');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (!user.username) user = user.user;
        let displayName = `${user.username[0].toUpperCase()}${(user.username).substring(1).toLowerCase()}`;
        let avatar = await canvas.loadImage(user.displayAvatarURL({ dynamic: false, format: 'png' }));
        let msg = await message.channel.send('Please wait..');

        guildMemberData.findOne({ guildId: message.guild.id, memberId: user.id}).then(result => {
            if (!result) msg.edit('No data found');
            let level = result.level || 0;
            let xp = result.xp || 1;
            let discriminator = user.discriminator;
            let xpForLevel = 30;
            if (level > 20 && level < 30) {
                xpForLevel = 35
            } else if (level >= 30 && level < 40) {
                xpForLevel = 40
            } else if (level >= 40 && level < 50) {
                xpForLevel = 45
            } else if (level >= 50 && level < 60) {
                xpForLevel = 50
            } else if (level >= 70 && level < 80) {
                xpForLevel = 55
            } else if (level >= 90 && level < 100) {
                xpForLevel = 60
            } else if (level >= 100 && level < 110) {
                xpForLevel = 100
            } else if (level >= 110 && level < 120) {
                xpForLevel = 110
            } else if (level >= 120 && level < 140) {
                xpForLevel = 120
            } else if (level >= 140 && level < 160) {
                xpForLevel = 130
            } else if (level >= 160 && level < 180) {
                xpForLevel = 140
            } else if (level >= 180) {
                xpForLevel = 150
            }

            require('../../utils/functions').rank(message, avatar, displayName, Number(discriminator), xp, xpForLevel, level);
            
            msg.delete();
        });
    }
}