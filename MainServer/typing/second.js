module.exports = async (client, latestType, ready, message) => {
  var configFile = require('../../config.json')
    client.on('message', async (msg) => {
        if (msg.author.id != latestType.id) return;
        if (!message) return;
        let guild = client.guilds.cache.get(configFile.ServerId);
        let channel = guild.channels.cache.find(channel => channel.id === message.channel.id);
        if (!latestType.id && !latestType.ready) return;
        if (ready === true && latestType !== 0) {
            message.delete()
            ready = false
        }
    });
}