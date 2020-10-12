const { MessageEmbed } = require('discord.js');
module.exports = (client, message, db) => {
  let prefix = db.get(message.guild.id + '.prefix') || '~'
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  if (!args[1]) {

  }
}