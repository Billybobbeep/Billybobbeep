const db = require('quick.db');
const Discord = require('discord.js')
const configFile = require('../../config.json');

module.exports = async(message) => {
  var prefix = db.get(message.guild.id + '.prefix') || configFile.prefix
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let user = message.guild.members.cache.get(args[1]) || message.mentions.users.first() || message.author
  let currLvl = db.get(user.id + '.level') || 0;

  if (user.username === undefined) {
    user = user.user
  }
  const embed = new Discord.MessageEmbed()
  embed.setTitle('Billybobbeep | Levelling System')
  embed.setTimestamp()
  embed.setFooter(`Requested by: ${message.author.tag}`)
  embed.setColor('#051094')
  embed.setDescription(`${user.username}'s level is currently ${currLvl}`)
  message.channel.send(embed)
}