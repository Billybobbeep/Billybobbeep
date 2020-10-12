const Discord = require('discord.js');
const embed = new Discord.MessageEmbed()
module.exports = async (client, message, level) => {
  embed.setTimestamp()
  embed.setTitle('Billybobbeep | Level Leaderboard')
  embed.setFooter(`Requested by: ${message.author.username}#${message.author.discriminator}`)
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
}