const db = require('../data/databaseManager/index.js');
module.exports = async(client, msg, args, prefix, message) => {
  if (db.get(message.guild.id + '.cleanFilter')) {
    return message.channel.send('This server has been set to clean content only.');
  }
    message.channel.send("suck\nmy");
    message.channel.send("dick\nyou");
    message.channel.send("stupid\nbitch");
}