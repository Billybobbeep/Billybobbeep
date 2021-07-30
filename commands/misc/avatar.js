const Discord = require('discord.js');
const configFile = require('../../utils/config.json');

module.exports = {
    name: 'avatar',
    description: 'Announce a message in a different channel',
    alias: ['pfp', 'myavatar', 'av'],
    catagory: 'info',
    usage: 'avatar [user]',
    guildOnly: true,
    /**
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {objects} client The bots client
     */
    execute (message, prefix, _client) {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        message.channel.send(user.displayAvatarURL());
    }
}