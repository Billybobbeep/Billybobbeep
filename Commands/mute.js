const db = require('quick.db');
const Discord = require('discord.js');
var embed = new Discord.MessageEmbed();

module.exports = async(client, msg, args, prefix, message) => {
  async function muteCmd() {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[1])
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
    embed.setTitle('You have been muted')
    embed.setTimestamp()
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    embed.setDescription(`You have been muted `)
    user.send('You have been muted in ' + message.guild.name + '\n**Reason:** ' + reason)
    if (!message.guild.roles.fetch(r => r.id === db.get(message.guild.id + '.mutedRole')))
    member.roles.add(db.get(message.guild.id + '.mutedRole'))
    message.channel.send('Successfully muted <@!' + user + '>.')
    
    if (db.get(message.guild.id + '.loggingChannel')) {
      let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'))
      embed.setTitle('User Muted')
      embed.setTimestamp()
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed.setDescription()
      try {
        LoggingChannel.send(embed)
      } catch {
        console.log(`${message.guild.name} has an invalid logging channel ID`)
      }
    }
  }
  var debounce = false;

  if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
    muteCmd()
    debounce = true;
  } else if (db.get(message.guild.id + '.modRole')) {
    if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
        muteCmd()
        debounce = true;
    } 
    if (debounce === false) {
      message.channel.send('You do not have the premissions to run this command.')
    }
  }
}