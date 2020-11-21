const configFile = require('../../structure/config.json');
const db = require('../../structure/global.js').db;;

function redirect(message, client) {
    if (message.guild)
        var prefix = db.get(message.guild.id + '.prefix') || '~';
    else
        var prefix = '~';
    
    if (message.channel.id === configFile.PollChannel || message.channel.id === configFile.MemesChannel)
        require('../backend/reactions.js')(message);
    else {
        if (message.guild) {
            require('../backend/deletingMessages.js')(message, client);
            require('../backend/levelling.js')(message, client);
            //require('../commands/counting.js').execute(message, client);
            require('../commands/talk2billy').execute(message);
            require('../commands/mentions/mentions.js')(message, client);
            //require('../backend/antiSpam.js').execute(message);
        } else {
            require('../backend/dmRecieving.js')(message, client);
        }
    }
    if (message.mentions.users.first()) {
        require('../commands/afkHandle.js').mentions(message);
    }
}

function handle(message, client) {
    if (message.guild)
        var prefix = db.get(message.guild.id + '.prefix') || '~';
    else
        var prefix = '~';

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args[0].toLowerCase();
    if (!message.content.startsWith(prefix)) return;
    if (client.commands.get(command)) {
        if (client.commands.get(command).guildOnly && client.commands.get(command).guildOnly === true && !message.guild) return;
        if (client.commands.get(command).bannedUsers && client.commands.get(command).bannedUsers.includes(message.author.id)) return message.channel.send(`You have been banned from using this command.`);
        if (client.commands.get(command).bannedRoles) {
            if (message.mentions.users.first()) {
                let user = message.guild.members.cache.get(message.mentions.users.first().id);
                var debounce = false;
                user.roles.cache.forEach(r => {
                    if (client.commands.get(command).bannedRoles.includes(r)) debounce = true;
                });
                if (debounce === true) return message.channel.send(`You cannot use that command on ${user.user}`);
            }
        }
        try {
            client.commands.get(command).execute(message, prefix, client)
        } catch(err) {
            if (err.toString().includes('client.commands.get(...).execute is not a function')) return;
            else console.error(err);
        }
    }
}

module.exports = (message, client) => {
    if (message.content.toLowerCase() === '~middle') {
        let emj = client.emojis.cache.get('772154941489545216');
        message.channel.send(`${emj}`);
    }
    if (message.author.bot) return;
    redirect(message, client)
    handle(message, client)
}