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
    .setDescription(`With this command you can change which channel billy sends the servers moderation logs to.\n\n**Usage:**\nTo set up a channel: \`${prefix}setup ${args[1]} [channel]\`\nTo turn off logging: \`${prefix}setup ${args[1]} reset\``)
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    return message.channel.send(embed)
  }

  if (args[2] && args[2].toLowerCase() === 'reset') {
    db.delete(message.guild.id + '.loggingChannel')
    return message.channel.send('Removed logging channel from the database.')
  }
  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])
  if (!channel) {
    return message.channel.send('Please specify a valid channel.')
  }
  if (channel.id === db.get(message.guild.id + '.loggingChannel')) return message.channel.send(`Your logging channel is already set as ${channel}`)
  db.set(message.guild.id + '.loggingChannel', channel.id)
  message.channel.send(`Your logging channel is now set up as ${channel}`)
}