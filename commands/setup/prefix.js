const Discord = require('discord.js');

module.exports = (message, db, prefix, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need the `Administrator` permissions to run this command.')
  if (!args[2] || args[2].toLowerCase() === 'help') {
    const embed = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can change the servers default prefix.\n**Usage** \`${prefix}setup prefix [newPrefix]\``)
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    return message.channel.send(embed)
  }
  var newPrefix = args[2].toLowerCase()
  if (newPrefix === prefix) return message.channel.send(`Your prefix is already ${newPrefix}`)
  if (newPrefix === '~') {
    db.delete(message.guild.id + '.prefix')
    return message.channel.send(`This servers prefix has been set to ${newPrefix}`)
  }
  if (!isNaN(newPrefix)) { return message.channel.send('The prefix cannot be a number.') }
  db.set(message.guild.id + '.prefix', newPrefix)
  message.channel.send(`This servers prefix has been set to \`${newPrefix}\``)
}