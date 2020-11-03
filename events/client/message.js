const configFile = require('../../structure/config.json');
const db = require('../../data/databaseManager/index.js');

function redirect(message, client) {
    if (message.channel.id === configFile.PollChannel || message.channel.id === configFile.MemesChannel)
        require('../backend/reactions.js')(message);
    else {
        if (message.guild) {
            require('../backend/deletingMessages.js')(message, client);
            require('../backend/levelling.js')(message, client);
            //require('../commands/counting.js').execute(message, client);
            //require('../commands/talk2billy')(message);
            require('../commands/mentions/mentions.js')(message, client);
            //require('../backend/antiSpam.js').execute(message);
        } else {
            require('../backend/dmRecieving.js')(message, client);
        }
    }
}

function handle(message, client) {
    let prefix = db.get(message.guild.id + '.prefix') || '~';
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    if (client.commands.get(command)) {
        if (client.commands.get(command).guildOnly && client.commands.get(command).guildOnly === true && !message.guild) return;
        client.commands.get(command).execute(message, prefix, client);
    }
}

module.exports = (message, client) => {
    if (message.content.toLowerCase() === '~middle') {
        let emj = client.emojis.cache.get('772154941489545216')
        message.channel.send(emj)
    }
    if (message.author.bot) return;
    redirect(message, client)
    handle(message, client)
}