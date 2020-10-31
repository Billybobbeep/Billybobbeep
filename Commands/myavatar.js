const Discord = require(`discord.js`);
const configFile = require('../structure/config.json');

module.exports = async(client, msg, args, prefix, message) => {
    let user = message.mentions.users.first() || message.author
        message.reply(user.displayAvatarURL());
    }