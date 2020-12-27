const db = require('../../structure/global.js').db;
module.exports = {
  name: 'wibbleywobbley',
  description: ';)',
  alias: ['wibwob'],
  guildOnly: true,
  catagory: 'general',
  explit: true,
  execute (message, prefix, client) {
    if (db.get(message.guild.id + '.cleanFilter')) {
      return message.channel.send('This server has been set to clean content only');
    }
      message.channel.send("suck\nmy");
      message.channel.send("dick\nyou");
      message.channel.send("stupid\nbitch");
  }
}