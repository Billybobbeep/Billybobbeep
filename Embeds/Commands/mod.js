const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async(msg, args, prefix, message) => {
        const commandEmbed = new Discord.MessageEmbed()
        .setTitle("Billybobbeep | Moderation Commands")
        .setDescription(
        `${prefix}kick <user>\n` +
        "*Kicks a member from the server.*\n" +
        "*Requires:* kick members premission.\n" +
        `${prefix}ban <user>\n` +
        "*Bans a member from the server.*\n" +
        "*Requires:* ban members premission.\n" +
        `${prefix}purge <number>\n` +
        "*Deletes alot of messages at once.\n" +
        "*Requires:* delete messages premission.\n" +
        `${prefix}nickname <user>\n` +
        "*Changes the nickname of a member.*\n" +
        "*Requires:* manage server premissions.\n" +
        `${prefix}dm <user> <message>\n` +
        "*Sends a DM to a user.*\n" +
        "*Requires:* manage message premissions.\n")
        .setColor([177, 210, 240])
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(commandEmbed)
}