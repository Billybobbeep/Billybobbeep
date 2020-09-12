const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    if (msg.startsWith(prefix + "spoink")) {
        message.channel.send(":eyes:")
        message.channel.send(":nose:")
        message.channel.send(":lips:")
        message.channel.send(":open_hands:")
        message.channel.send(":leg:")
    }
}