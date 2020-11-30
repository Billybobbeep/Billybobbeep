const db = require('../structure/global.js').db;
const guildID = require('../structure/config.json').ServerId;

module.exports.logging = function(msg, message, client, option) {
    if (option && option.toLowerCase() === 'guild') {
        var loggingChannel = client.channels.cache.get(db.get(message + '.loggingChannel'));
        if (loggingChannel) {
            loggingChannel.send(msg).catch(() => {return});
        }
    }else if (message !== undefined) {
        if (message.guild)
            var loggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
        else
            var loggingChannel = client.channels.cache.get(db.get(guildID + '.loggingChannel'));
        
        if (loggingChannel) {
            loggingChannel.send(msg).catch(() => {return});
        }
    } else {
        var loggingChannel = client.channels.cache.get(db.get(guildID + '.loggingChannel'));
        
        if (loggingChannel) {
            loggingChannel.send(msg).catch(() => {return});
        }
    }
}

module.exports.rank = function(avatar, username, discriminator, currentXP, requiredXP, level) {
    const canvas = require('canvas');

    if (!avatar) throw new Error('Avatar is required');
    if (!username) throw new Error('Username is required');
    if (!discriminator) throw new Error('Discriminator is required');
    if (!currentXP) throw new Error('Current XP is required');
    if (!requiredXP) throw new Error('Required XP is required');
    if (!level) throw new Error('Level is required');

    if (!isNaN(discriminator)) throw new Error('Discriminator must be a number');
    if (!isNaN(currentXP)) throw new Error('Current XP must be a number');
    if (!isNaN(requiredXP)) throw new Error('Required XP must be a number');
    if (!isNaN(level)) throw new Error('Level must be a number');

    
}