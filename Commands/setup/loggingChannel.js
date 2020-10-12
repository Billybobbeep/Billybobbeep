module.exports = (message, db) => {
  let prefix = db.get(message.guild.id + '.prefix') || '~'
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  if (!args[2]) {
    db.delete(message.guild.id + '.loggingChannel')
    return message.channel.send('Removed logging channel from the database.')
  }
  let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])
  if (channel.id === db.get(message.guild.id + '.loggingChannel')) return message.channel.send(`Your logging channel is ready set as ${channel}`)
  db.set(message.guild.id + '.loggingChannel', channel.id)
  message.channel.send(`Your logging channel is now set up as ${channel}`)
}