const Discord = require('discord.js');
const configFile = require('../../structure/config.json');

module.exports = {
    name: 'avatar',
    description: 'Announce a message in a different channel.',
    alias: ['pfp', 'myavatar'],
    usage: 'avatar [user]',
    guildOnly: true,
    execute (message, prefix, client) {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.get(args[1]) || message.author;
        message.reply(user.displayAvatarURL());
    }
}