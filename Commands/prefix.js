const db = require('quick.db');

module.exports = (client, msg, args, prefix, message) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need the `Administrator` premissions to run this command.')
  var newPrefix = args[0]
  if (!newPrefix) {
    return message.channel.send('Please specify a prefix.');
  }
  if (!isNaN(newPrefix)) { return message.channel.send('The prefix cannot be a number.') }
  db.set(message.guild.id + '.prefix', newPrefix)
  message.channel.send(`This servers prefix has been set to \`${newPrefix}\``)
}