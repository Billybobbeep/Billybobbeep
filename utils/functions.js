const db = require('../data/databaseManager/index.js');
const guildID = require('../structure/config.json').ServerId;

module.exports.logging = function(msg, message,client) {
    if (message !== undefined) {
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