module.exports = async (client, message, Discord) => {

  if (!message.channel.type === 'dm') return;
  if (message.author.bot) return;
  if (message.guild) return;
  const db = require('../../data/databaseManager/index.js');
  const configFile = require('../config.json')
  let LoggingChannel = client.channels.cache.get(db.get(configFile.ServerId + '.loggingChannel'));

  const embed = new Discord.MessageEmbed()
    .setTitle(`DM Recieved`)
    .setDescription(
      `**Content:** ${message}\n` +
      `**Message ID:** ${message.id}\n\n` +
      `**Author:** ${message.author}\n` +
      `**Author Tag:** ${message.author.tag}\n` +
      `**Author ID:** ${message.author.id}\n`)
    .setTimestamp()
    .setColor(`#447ba1`)

  if (message.content.toLowerCase().startsWith('~')) return;
  try {
    LoggingChannel.send(embed)
  } catch {
    return;
  }
}