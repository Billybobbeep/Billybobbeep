const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
module.exports = async (client, message, level) => {
  embed.setTimestamp()
  embed.setTitle('Billybobbeep | Level Leaderboard')
  embed.setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`)
  embed.setColor('#5dbcd2')
}