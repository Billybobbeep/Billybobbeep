const db = require('../databaseManager/index.js');
var table = []
const ms = require('ms')

module.exports = (client, msg, args, prefix, message) => {
  if (args[0] && args[0] === 'guild') {
    table.push('Total Guild List:')
    table.push(client.guilds.cache.map((guild) => guild.name))
    message.channel.send(table.join('\n').replace(',', ''))
    console.log(table)
  } else {
    //db.delete(message.author.id);
    console.log(db.fetchAll());
    console.log(db.get(message.author.id + '.economy.streak'));
    message.channel.send('All of the data from the database is currently in the terminal', {
      tts: true
     }).then(msg => { setTimeout(() => { msg.delete()}, 6000)});
  }
}