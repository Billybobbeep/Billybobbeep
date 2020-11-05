module.exports = async (message, client) => {
  const Discord = require('discord.js');
  const configFile = require('../../structure/config.json');
  if (message.channel.type !== 'dm') return;
  if (message.author.bot) return;
  const db = require('../../data/databaseManager/index.js');
  const logging = require('../../utils/functions.js').logging;

  const embed = new Discord.MessageEmbed();
  embed.setTitle(`DM Recieved`);
  embed.setDescription(
    `**Content:** ${message}\n` +
    `**Message ID:** ${message.id}\n\n` +
    `**Author:** ${message.author}\n` +
    `**Author Tag:** ${message.author.tag}\n` +
    `**Author ID:** ${message.author.id}\n`);
  embed.setTimestamp();
  embed.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

  if (message.content.toLowerCase().startsWith('~')) return;
  logging(embed, message, client)
}