const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const guildData = require('../../events/client/database/models/guilds');

module.exports = async(msg, args, prefix, message, client) => {
    const embed = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Mention Commands')
    .setTimestamp()
    .setFooter('Requested by: ' + message.author.tag)
    .setDescription(
      `These new commands require you to ping billy at the end of your message.\n` +
      `**Commands:**\n` +
      `hello <@${client.user.id}>\n` +
      `hi <@${client.user.id}>\n` +
      `yo <@${client.user.id}>\n` +
      `hey <@${client.user.id}>\n` +
      `hola <@${client.user.id}>\n` +
      `ola <@${client.user.id}>\n` +
      `howdy <@${client.user.id}>\n` +
      `welcome <@${client.user.id}>\n` +
      `greetings <@${client.user.id}>\n\n`
    )
    message.guild ? guildData.findOne({ guildId: message.guild.id }).then(result => embed.setColor(result.embedColor)) : embed.setColor('#447ba1');
    message.channel.send(embed);
}