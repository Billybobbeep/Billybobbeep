const Discord = require(`discord.js`);
const configFile = require('../../structure/config.json');

module.exports = {
    name: 'spoink',
    description: ';).',
    guildOnly: true,
    execute (message, prefix, client) {
        message.channel.send(":eyes:")
        message.channel.send(":nose:")
        message.channel.send(":lips:")
        message.channel.send(":open_hands:")
        message.channel.send(":leg:")
    }
}