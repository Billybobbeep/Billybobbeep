const db = require('quick.db');

module.exports = async (client, message, Discord) => {

  if (message.author.id === '731498842813366304') return;
  const configFile = require('../config.json')
  let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);

  const embed = new Discord.MessageEmbed()
    .setTitle(`DM Recieved`)
    .setDescription(
      `**Content:** ${message}\n` +
      `**Message ID:** ${message.id}\n\n` +
      `**Author:** ${message.author}\n` +
      `**Author Tag:** ${message.author.tag}\n` +
      `**Author ID:** ${message.author.id}\n`)
    .setTimestamp()
    .setColor('#dbbf70')

  if (message.channel.type === 'dm') {
    if (message.content.toLowerCase().startsWith(db.get(message.guild.id + '.prefix') || '~')) return;
    LoggingChannel.send(embed)
    return;
  }
}