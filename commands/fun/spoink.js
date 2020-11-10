const Discord = require('discord.js');
const configFile = require('../../structure/config.json');

module.exports = {
    name: 'spoink',
    description: '\u200b',
    catagory: 'general',
    guildOnly: true,
    execute (message, prefix, client) {
        message.channel.send(':eyes:\n:nose:\n:lips:\n:open_hands:\n:leg:');
    }
}