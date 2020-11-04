const db = require('../data/databaseManager/index.js');
const guildID = require('../structure/config.json').ServerId;

module.exports.logging = function(message, client) {
    if (message.guild)
        const loggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
    else
        const loggingChannel = client.channels.cache.get(db.get(guildID + '.loggingChannel'));
    
    if (loggingChannel) {
        loggingChannel.send(message).catch(() => {return});
    }
}