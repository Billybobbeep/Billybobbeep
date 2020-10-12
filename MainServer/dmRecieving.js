module.exports = async (client, message, Discord) => {

  const db = require('quick.db')
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
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)

  if (message.channel.type === 'dm') {
    if (message.content.toLowerCase().startsWith('~')) return;
    LoggingChannel.send(embed)
  }
}