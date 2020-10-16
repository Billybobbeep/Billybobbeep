const db = require('quick.db');
var table = []

module.exports = (client, msg, args, prefix, message) => {
  if (args[0] && args[0] === 'guild') {
    table.push('Total Guild List:')
    table.push(client.guilds.cache.map((guild) => guild.name))
    message.channel.send(table.join('\n').replace(',', ''))
    console.log(table)
  } else {
    db.set('733442092667502613_697194959119319130.level', 49)
    db.set('733442092667502613_724629665871822950.level', 43)
    db.set('733442092667502613_617822098672320528.level', 13)
    db.set('733442092667502613_636984716003901443.level', 1)
    db.set('733442092667502613_761628578277228555.level', 6)
    db.set('733442092667502613_763039346601230336.level', 1)
    db.set('733442092667502613_303097521314725890.level', 16)
    db.set('733442092667502613_617822098672320528.warnings', 2)
    db.set('733442092667502613_639107743135039498.level', 5)
    console.log(db.fetchAll())
  }
}