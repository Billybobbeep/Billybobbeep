const db = require('../../data/databaseManager/index.js');

module.exports = {
  name: 'announce',
  description: 'Announce a message in a different channel.',
  guildOnly: true,
  execute (message, prefix, client) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need the `Administrator` premissions to run this command.');
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    var newPrefix = args[1].toLowerCase()
    if (!newPrefix && db.get(message.guild.id + '.prefix') === '~') return message.channel.send('Please specify a prefix.');
    if (!newPrefix && !db.get(message.guild.id + '.prefix')) return message.channel.send('Please specify a prefix.');
    if (!newPrefix) {
      db.delete(message.guild.id + '.prefix')
      return message.channel.send('Your prefix has been set to `~`');
    }
    if (newPrefix === prefix) return message.channel.send(`Your prefix is already ${newPrefix}`);
    if (newPrefix === '~') {
      db.delete(message.guild.id + '.prefix');
      return message.channel.send(`This servers prefix has been set to ${newPrefix}`);
    }
    if (!isNaN(newPrefix)) { return message.channel.send('The prefix cannot be a number.') }
    db.set(message.guild.id + '.prefix', newPrefix);
    message.channel.send(`This servers prefix has been set to \`${newPrefix}\``);
  }
}