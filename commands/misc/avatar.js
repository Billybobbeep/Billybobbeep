const Discord = require('discord.js');
const configFile = require('../../structure/config.json');

module.exports = {
    name: 'avatar',
    description: 'Announce a message in a different channel.',
    alias: ['pfp', 'myavatar'],
    guildOnly: true,
    execute (message, prefix, client) {
        let user = message.mentions.users.first() || message.author
        message.reply(user.displayAvatarURL());
    }
}