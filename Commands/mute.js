const configFile = require('../config.json');
const db = require('quick.db');
const Discord = require('discord.js')
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
  if (!message.guild.roles.fetch(r => r.id === db.get(message.guild.id + '.mutedRole')))
  member.roles.add(db.get(message.guild.id + '.mutedRole'))
  message.channel.send('Successfully muted <@!' + user + '>.')
  
  if (db.get(message.guild.id + '.loggingChannel')) {
    let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'))
    var embed = new Discord.MessageEmbed()
    .setTitle('User Muted')
    .setTimestamp()
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    .setDescription()
    try {
    LoggingChannel.send(embed)
    } catch {
      console.log(`${message.guild.name} has an invalid logging channel ID`)
    }
  }
}