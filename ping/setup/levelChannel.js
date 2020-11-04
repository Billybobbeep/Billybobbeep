const { MessageEmbed } = require('discord.js')
module.exports = (message, db) => {
  let prefix = db.get(message.guild.id + '.prefix') || '~'
    let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
    
    if (!args[2] || args[2].toLowerCase() === 'help') {
    const embed = new MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can change whether billybobbeep sends level ups to a specific channel or the channel the userr is currently in.\n\n**Usage:**\nTo set up a specific channel: \`${prefix}setup ${args[1]} [channel]\`\nTo announce it in the channel the user is in: \`${prefix}setup ${args[1]} reset\``)
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(embed)
  }

  if (args[2] && args[2].toLowerCase() === 'reset') {
    if (db.get(message.guild.id + '.levelUpChannel')) {
      db.delete(message.guild.id + '.levelUpChannel')
      message.channel.send('Removed levelling channel from the database.')
    } else {
      message.channel.send('There is no levelling channel set up yet.')
    }
  }

  if (args[2] && args[2].toLowerCase() !== 'reset' && args[2].toLowerCase() !== 'help') {
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

    if (!channel) {
      return message.channel.send('Please specify a valid channel.')
    }
    if (channel.id === db.get(message.guild.id + '.levelUpChannel')) return message.channel.send(`Your levelling channel is already set as ${channel}`)
    db.set(message.guild.id + '.levelUpChannel', channel.id)
    message.channel.send(`Your levelling channel is now set up as ${channel}`)
  }
}