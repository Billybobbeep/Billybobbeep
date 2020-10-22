const db = require('quick.db');
var table = []

module.exports = (client, msg, args, prefix, message) => {
  if (args[0] && args[0] === 'guild') {
    table.push('Total Guild List:')
    table.push(client.guilds.cache.map((guild) => guild.name))
    message.channel.send(table.join('\n').replace(',', ''))
    console.log(table)
  } else {
    //db.delete(message.author.id);
    console.log(db.fetchAll())
    message.channel.send('All of the data from the database is currently in the terminal', {
      tts: true,
      disableMentions: true
     }).then(msg => { setTimeout(() => { msg.delete()}, 6000)});
  }
}