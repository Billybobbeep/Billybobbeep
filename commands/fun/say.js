const Discord = require('discord.js');
const configFile = require('../../utils/config.json');

module.exports = {
    name: 'say',
    description: 'Repeat what you just said',
    catagory: 'generator',
    usage: 'say [message]',
    guildOnly: true,
    //options: [{ name: 'message', description: 'The message to repeat', type: 3, required: false }],
    /**
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {objects} client The bots client
     */
    execute (message, prefix, _client) { 
        let args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1);
        let wantToSay = args.join(' ');
        if (!args[0]) return message.channel.send('You must specify a message to send');
        message.channel.send(wantToSay, { disableMentions: 'everyone' });
        message.delete();
    }
}