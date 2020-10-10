const db = require('quick.db');
const Discord = require('discord.js')
module.exports = async(client, message) => {
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let user = message.guild.members.cache.get(args[1]) || message.mentions.users.first() || message.author

  let currLvl = db.get(user.id + '.level');

  const embed = new Discord.MessageEmbed()
  embed.setTitle('Billybobbeep | Levelling System')
  embed.setTimestamp()
  embed.setFooter(`Requested by: ${message.author.tag}`)
  embed.setColor('#051094')
  embed.setDescription(`${message.author.tag}'s level is currently ${currLvl}`)
  message.channel.send(embed)
}