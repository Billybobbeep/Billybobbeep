module.exports = (client, message, db) => {
  let prefix = db.get(message.guild.id + '.prefix') || '~'
  var redirect;
  if (message.content.toLowerCase().startsWith(prefix + 'setup logging')) {
    redirect = require('./loggingChannel.js')
    redirect(client, message, db)
  }
}