const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
const settings = require('./settings.json');
const db = require('../../../databaseManager/index.js');
var AntiSpam = []
var count = 0;

module.exports = async (client, message) => {
  if (!message.guild) return;
  let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
  if (message.channel.id === db.get(message.guild.id + '.talk2billy')) return;
  if (!message.guild || message.author.id === message.client.user.id || settings.ignoreBots && message.author.bot) return;
  if (message.channel.id === message.author.lastMessageChannelID) {
    AntiSpam.push(message.author.id)
  }
  AntiSpam.forEach((result) => {
    if (AntiSpam.toLocaleString.length < settings.messagesToWarn) return;
    if (message.author.id === result) {
      count++;
    }
  });
  if (count > settings.messageToWarn && count < settings.messageToWarn + 2) {
    embed.setTitle('Billybobbeep | Spam Prevention');
    embed.setDescription('You have been warned for spamming in ' + message.guild.name);
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
    embed.setTimestamp();
    await message.author.send(embed);
    message.member.roles.add(db.get(message.guild.id + '.mutedRole'))
    embed.setDescription(`Spam detected.\n\n**Channel:** ${message.channel}\n**Author:** ${message.author}\n**Author Tag:** ${message.author.username}#${message.author.discriminator}\n**Author ID:** ${message.author.id}\n\n**Spam content:** ${message.content}`)
    await LoggingChannel.send(embed)
    setTimeout(() => {
      message.member.roles.remove(db.get(message.guild.id + '.mutedRole'))
    }, 30000);
  }
}
setInterval(() => {
  if (AntiSpam.length < 1) return;
  AntiSpam.forEach((result) => {
    if (AntiSpam.length < 1) return;
    AntiSpam.splice(AntiSpam.indexOf(result), 1);
  });
}, settings.timeToWarn);