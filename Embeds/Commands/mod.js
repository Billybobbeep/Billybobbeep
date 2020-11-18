const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const db = require('quick.db');
module.exports = async(msg, args, prefix, message) => {
        const commandEmbed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Moderation Commands')
        .setDescription(
        `${prefix}kick [user]\n` +
        '*Kicks a member from the server.*\n' +
        '*Requires:* Kick Members premission.\n' +
        `${prefix}ban [user]\n` +
        '*Bans a member from the server.*\n' +
        '*Requires:* Ban Members premission.\n' +
        `${prefix}purge [number]\n` +
        '*Deletes alot of messages at once.*\n' +
        '*Requires:* Manage Messages premission.\n\n' +
        
        `${prefix}warn [user] [reason]\n` +
        '*Warns a user*\n' +
        '*Requires:* Manage Messages premissions.\n' +
        `${prefix}rwarn [user] [reason]\n` +
        '*Removes a warning.*\n' +
        '*Requires:* Manage Messages premissions\n' +
        `${prefix}warnings [user]\n` +
        'View the total warnings a user has.\n' +
        '*Requires:* this command does not require any premissions.\n' +
        `${prefix}mute [user] [reason]\n` +
        'Mute a user.\n' +
        '*Requires:* Manage Message premissions.\n\n' +
        
        `${prefix}nickname [user]\n` +
        '*Changes the nickname of a member.*\n' +
        '*Requires:* Manage Server premissions.\n' +
        `${prefix}dm [user] [message]\n` +
        '*Sends a DM to a user.*\n' +
        '*Requires:* Manage Message premissions.\n\n' +
        `${prefix}logs\n` +
        '*View recent mod logs.*\n' +
        '*Requires:* View audit log premissions.\n' +
        `${prefix}logs help\n` +
        '*Help embed for the mod logs.*\n' +
        '*Requires:* View audit log premissions.')
        .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(commandEmbed)
}