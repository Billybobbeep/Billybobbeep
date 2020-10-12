const Discord = require(`discord.js`);
const db = require('quick.db')
module.exports = async (client, msg, args, prefix, message) => {
  var user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
  if (!user) return message.channel.send('Please specify a user.');

  let tWarnings = db.get(message.guild.id + user.id + '.warnings') || 0
  
  const embed = new Discord.MessageEmbed()
  .setTitle('Billybobbeep | Warning Commands')
  .setDescription(`${user.username} has ${tWarnings} warnings.`)
  .setTimestamp()
  .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  .setFooter(`Requested by: ${message.author.tag}`)
  message.channel.send(embed)
}