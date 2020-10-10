module.exports = async (client, latestType, ready, message) => {
  var configFile = require('../../config.json')
    client.on('message', async (msg) => {
        if (msg.channel.id === configFile.talk2billy) return;
        if (msg.author.id != latestType.id) return;
        if (!message) return;
        let guild = client.guilds.cache.get(configFile.ServerId);
        if (!latestType.id && !latestType.ready) return;
        if (ready === true && latestType !== 0) {
            message.delete()
            ready = false
        }
        if (!guild) {
        let guild = client.guilds.cache.get(configFile.ServerId);
        }
        //var count = 0
        //guild.channels.cache.forEach(result => {
            //count++;
            //console.log(result)
            //if (!result.messages) return console.log('Result has no messages')
            //console.log(result.messages.cache.Map())
        });
        //console.log('found ' + count + ' channels')
}