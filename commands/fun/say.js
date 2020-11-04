const Discord = require('discord.js');
const configFile = require('../../structure/config.json');

module.exports = {
    name: 'say',
    description: 'Repeat what you just said.',
    guildOnly: true,
    execute (message, prefix, client) { 
        let args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1);
        let wantToSay = args.join(' ');
        if (!args[0]) return message.channel.send('You must specify a message to send.');
        message.channel.send(wantToSay, { disableMentions: 'everyone' });
        message.delete();
        console.log(args)
    }
}