const configFile = require('../config.json');
const db = require('quick.db');

module.exports = async(client, msg, args, prefix, message) => {
  function unmuteCmd() {
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
  
  member.roles.remove(db.get(message.guild.id + '.mutedRole'))
  message.channel.send('Successfully unmuted <@!' + user + '>.')
  }

  var debounce = false;

  if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
    unmuteCmd()
    debounce = true;
  } else if (db.get(message.guild.id + '.modRole')) {
    if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
        unmuteCmd()
        debounce = true;
    } 
    if (debounce === false) {
      message.channel.send('You do not have the premissions to run this command.')
    }
  }
}