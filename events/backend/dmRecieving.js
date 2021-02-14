module.exports = async (message, client) => {
  const Discord = require('discord.js');
  const configFile = require('../../structure/config.json');
  if (message.channel.type !== 'dm') return;
  if (message.author.bot) return;
  if (message.author.id === client.user.id) return;
  const userData = require('../client/database/models/users');
  const logging = require('../../utils/functions.js').logging;

  let embed = new Discord.MessageEmbed();
  embed.setTitle('DM Recieved');
  embed.setDescription(
    `**Content:** ${message}\n` +
    `**Message ID:** ${message.id}\n\n` +
    `**Author:** ${message.author}\n` +
    `**Author Tag:** ${message.author.tag}\n` +
    `**Author ID:** ${message.author.id}\n`);
  embed.setTimestamp();
  embed.setColor('#447ba1');

  if (!message.content.toLowerCase().startsWith('~'))
  logging(embed, message, client)
  
userData.findOne({ userId: message.author.id }).then(result => {
  if (!result.dmed) {
    embed = new Discord.MessageEmbed();
    embed.setDescription('Please remember that all messages sent to billybobbeep are recorded');
    embed.setAuthor(message.author.username, message.author.displayAvatarURL());
    embed.setColor('#447ba1');
    message.channel.send(embed);
    userData.findOne({ userId: message.author.id }).then(result => {
      result.dmed = true;
      result.save();
    });
  }
});
}