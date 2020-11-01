const configFile = require('../../structure/config.json');
const db = require('../../data/databaseManager/index.js');
function redirect(message, client) {
    if (message.channel.id === configFile.PollChannel || message.channel.id === configFile.MemesChannel)
        require(`./events/commands/reactions.js`)(message);
    else {
        require('../backend/levels/main.js')(message, client);
        require('../commands/Afk/AfkHandle.js')(message, client);
        //require('../commands/counting.js')(message, client);
        require('../backend/dmRecieving.js')(message, client);
        require(`../backend/deletingMessages.js`)(message, client);
        require('../commands/mentions/mentions.js')(message, client);
        //require('../commands/talk2billy')(message);
    }
}
function handle(message, client) {
    let prefix = db.get(message.guild.id + '.prefix') || '~';
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    if (client.commands.get(command))
        client.commands.get(command).execute(message, prefix, client);
}

module.exports = (message, client) => {
    if (message.content.toLowerCase() === '~middle') {
        let emj = client.emojis.cache.get('772154941489545216')
        message.channel.send(emj)
    }
    if (message.author.bot) return;
    redirect(message, client)
    if (message.guild) {
        handle(message, client)
    }
}