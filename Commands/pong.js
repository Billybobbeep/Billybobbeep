const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    if (msg.startsWith(prefix + 'ping')) {
        const pingMessage = await message.channel.send("Ping: Recieveing Data...");
        pingMessage.edit(`**Pong!**\n` + `**Ping:** ${pingMessage.createdAt - message.createdAt}ms`);
    }
}