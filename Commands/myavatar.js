const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    let user = message.mentions.users.first() || message.author
        message.reply(user.displayAvatarURL());
    }