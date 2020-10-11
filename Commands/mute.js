const configFile = require('../config.json');
const db = require('quick.db');

module.exports = async(client, msg, args, prefix, message) => {
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
  let reason = args.slice(1).join(" ");

  if (!db.get(message.guild.id + '.mutedRole')) {
    return message.channel.send('Please setup a muted role in your server to use this command.')
  }
  if (!user) {
    return message.channel.send('Please mention a user to mute.')
  }
  if (!reason) {
    reason = 'No reason was provided'
  }
  let member = message.guild.member(user);
  user.send('You have been muted in ' + message.guild.name + '\n**Reason:** ' + reason)
  
  member.roles.add(db.get(message.guild.id + '.mutedRole'))
}