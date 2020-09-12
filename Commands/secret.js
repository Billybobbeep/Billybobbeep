const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    if (msg.startsWith(prefix + "secret")) {
        let secretMessage = message.content.substring(8);
        message.channel.send(`||${secretMessage}||`);
        message.delete();
    }
}