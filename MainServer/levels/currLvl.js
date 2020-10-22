const db = require('../../databaseManager/index.js');
const Discord = require('discord.js')

module.exports = async (message) => {
  var prefix = db.get(message.guild.id + '.prefix') || '~'
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let user = message.guild.members.cache.get(args[1]) || message.mentions.users.first() || message.author
  let currLvl = db.get(message.guild.id + '_' + user.id + '.level') || 0;

  if (user.username === undefined) {
    user = user.user
  }
  const embed = new Discord.MessageEmbed()
  embed.setTitle('Billybobbeep | Levelling System')
  embed.setTimestamp()
  embed.setFooter(`Requested by: ${message.author.tag}`)
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  embed.setDescription(`${user.username}'s level is currently ${currLvl}`)
  message.channel.send(embed)
}