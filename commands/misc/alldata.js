module.exports = {
  name: 'alldata',
  description: 'View all of the data from the database.',
  guildOnly: true,
  spoinkOnly: true,
  execute (message, prefix, client) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    const db = require('../../data/databaseManager/index.js');
    var table = [];
    const ms = require('ms');
    if (args[0] && args[0] === 'guild') {
      table.push('Total Guild List:')
      table.push(client.guilds.cache.map((guild) => guild.name))
      message.channel.send(table.join('\n').replace(',', ''))
      console.log(table)
    } else {
      //db.delete(message.author.id);
      console.log(db.fetchAll());
      message.channel.send('All of the data from the database is currently in the terminal', {
        tts: true
      }).then(msg => { setTimeout(() => { msg.delete()}, 6000)});
    }
  }
}