const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async(msg, args, prefix, message, client) => {
    if (msg.startsWith(prefix + "cmds") || msg.startsWith(prefix + "commands")) {
        const commandFile = require(`./cmds.js`);
        commandFile(msg, args, prefix, message)
    }
    if (message.content.toLowerCase() == prefix + "cmds help" || message.content.toLowerCase() == prefix + "commands help" || message.content.toLowerCase() == prefix + "c h") {
        const commandFile = require(`./help.js`);
        commandFile(msg, args, prefix, message)
    }
    if (message.content.toLowerCase() == prefix + "cmds mod" || message.content.toLowerCase() == prefix + "commands mod" || message.content.toLowerCase() == prefix + "c m" || message.content.toLowerCase() == prefix + "commands moderation" || message.content.toLowerCase() == prefix + "cmds moderation") {
        const commandFile = require(`./mod.js`);
        commandFile(msg, args, prefix, message)
    }
    if (message.content.toLowerCase() == prefix + "cmds fun" || message.content.toLowerCase() == prefix + "commands fun" || message.content.toLowerCase() == prefix + "c f") {
        const commandFile = require(`./fun.js`);
        commandFile(msg, args, prefix, message)
    }
    if (message.content.toLowerCase() == prefix + "cmds ping" || message.content.toLowerCase() == prefix + "commands ping" || message.content.toLowerCase() == prefix + "c p") {
        const commandFile = require(`./mention.js`);
        commandFile(msg, args, prefix, message, client)
    }
}