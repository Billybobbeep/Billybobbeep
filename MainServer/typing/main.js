const fs = require('fs');
var latestType = 0
var ready = false
var message;

module.exports = async (client) => {
    fs.readFile('./MainServer/typing/data.json', 'utf8', function readFileCallback(err, data) {
        nd = JSON.parse(data);
        latestType = { id : nd.id }
        ready = true
        fs.writeFile('./MainServer/typing/data.json', `{ "id" : ${nd.id}, "isReady" : false }`, `utf8`, function() { });
    });
    client.on('typingStart', async (channel, user) => {
        message = await channel.send(`<@!${user.id}> is typing`);
        latestType = { id :  user.id, isReady : true }
        fs.writeFile('./MainServer/typing/data.json', `{ "id" : ${user.id}, "isReady" : true }`, 'utf8', function() { });
        setTimeout(() => {
            const file = require('./second.js')
            file(client, latestType, ready, message)
        }, 10);
        setTimeout(() => {
            if (ready === true && latestType != 0 && latestType.isReady === true) {
                if (!message) return;
                message.edit(`Woah there <@!${latestType}>, you just ghost typed.`)
            }
        }, 5000);
    });
}