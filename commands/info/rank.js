const { Canvas } = require('canvas');

module.exports = {
    name: 'rank',
    description: 'View your xp',
    catagory: 'info',
    alias: ['cl', 'currlvl', 'xp'],
    guildOnly: true,

    async execute (message, prefix, client) {
        const db = require('../../structure/global').db;
        const canvas = require('canvas');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (!user.username) user = user.user;
        let displayName = `${user.username[0].toUpperCase()}${(user.username).substring(1).toLowerCase()}`;
        let avatar = await canvas.loadImage(user.displayAvatarURL({ dynamic: false, format: 'png' }));
        var msg = await message.channel.send('Please wait..');

        var level = db.get(message.guild.id + '_' + user.id + '.level') || 0;
        var xp = db.get(message.guild.id + '_' + user.id + '.xp') || 1;
        var discriminator = user.discriminator;

        let xpForLevel = 30;
        var currlev = db.get(message.guild.id + '_' + message.author.id + '.level');
        if (currlev > 20 && currlev < 30) {
            xpForLevel = 35
        } else if (currlev >= 30 && currlev < 40) {
            xpForLevel = 40
        } else if (currlev >= 40 && currlev < 50) {
            xpForLevel = 45
        } else if (currlev >= 50 && currlev < 60) {
            xpForLevel = 50
        } else if (currlev >= 70 && currlev < 80) {
            xpForLevel = 55
        } else if (currlev >= 90 && currlev < 100) {
            xpForLevel = 60
        } else if (currlev >= 100 && currlev < 110) {
            xpForLevel = 100
        } else if (currlev >= 110 && currlev < 120) {
            xpForLevel = 110
        } else if (currlev >= 120 && currlev < 140) {
            xpForLevel = 120
        } else if (currlev >= 140 && currlev < 160) {
            xpForLevel = 130
        } else if (currlev >= 160 && currlev < 180) {
            xpForLevel = 140
        } else if (currlev >= 180) {
            xpForLevel = 150
        }

        require('../../utils/functions').rank(message, avatar, displayName, Number(discriminator), xp, xpForLevel, level);
        
        msg.delete();
    }
}