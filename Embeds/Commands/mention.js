const Discord = require(`discord.js`);
const configFile = require('../../structure/config.json');
const db = require('../../data/databaseManager/index.js');

module.exports = async(msg, args, prefix, message, client) => {
    const commandEmbed = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Mention Commands')
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
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
    message.channel.send(commandEmbed)
}