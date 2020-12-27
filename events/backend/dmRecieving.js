module.exports = async (message, client) => {
  const Discord = require('discord.js');
  const configFile = require('../../structure/config.json');
  if (message.channel.type !== 'dm') return;
  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  const db = require('../../structure/global.js').db;
  const logging = require('../../utils/functions.js').logging;

  var embed = new Discord.MessageEmbed();
  embed.setTitle(`DM Recieved`);
  embed.setDescription(
    `**Content:** ${message}\n` +
    `**Message ID:** ${message.id}\n\n` +
    `**Author:** ${message.author}\n` +
    `**Author Tag:** ${message.author.tag}\n` +
    `**Author ID:** ${message.author.id}\n`);
  embed.setTimestamp();
  embed.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

  if (!message.content.toLowerCase().startsWith('~'))
  logging(embed, message, client)

  if (!db.get(message.author.id + '.dmed')) {
    embed = new Discord.MessageEmbed();
    embed.setDescription(`Please remember that all messages sent to billybobbeep are recorded);
    embed.setAuthor(message.author.username, message.author.displayAvatarURL());
    embed.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);
    message.channel.send(embed);
    db.set(message.author.id + '.dmed', true);
  }
}