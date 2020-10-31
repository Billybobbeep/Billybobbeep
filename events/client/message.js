const configFile = require('../../structure/config.json')
function redirect(message, client) {
    if (message.channel.id === configFile.PollChannel || message.channel.id === configFile.MemesChannel)
        require(`./events/commands/reactions.js`)(message);
    else {
        require('../backend/levels/main.js')(message, client);
        require('../commands/Afk/AfkHandle.js')(message, client);
        require('../commands/counting.js')(message, client);
        require('../backend/dmRecieving.js')(message, client);
        require(`../backend/deletingMessages.js`)(message, client);
        require('../commands/mentions/mentions.js')(message, client);
        require('../commands/talk2billy')(message);
    }
}
function handle() {

}

module.exports = (message, client) => {
    if (message.content === '~middle') {
        let emj = client.emojis.cache.get('772154941489545216')
        message.channel.send(emj)
    }
    redirect(message, client)
}