const db = require('../databaseManager/index.js');
const Discord = require('discord.js');
var embed = new Discord.MessageEmbed();
const ms = require('ms');
module.exports = async(client, msg, args, prefix, message) => {
  async function muteCmd() {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    let reason = args.slice(2).join(" ");
    let time = args[1] || undefined
    if (time === undefined) return message.channel.send('Please specify a time.');
    if (time.endsWith('h') || time.endsWith('m')) time = ms(time); else return message.channel.send('The time can only be in hours or minutes.');
    if (!db.get(message.guild.id + '.mutedRole')) {
      return message.channel.send('Please setup a muted role in your server to use this command.')
    }
    if (!user) {
      return message.channel.send('Please specify a user to mute.')
    }
    if (!user.tag) {
      user = user.user
    }
    if (user.id === message.author.id)return message.channel.send('You cannot mute yourself.')
    if (!reason) return message.channel.send('Please specify a reason.');
    let member = message.guild.members.cache.get(user.id);
    if (!member) return message.channel.send(`Could not find the member you provided.`);
    embed.setTimestamp()
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    embed.setDescription(`You have been muted in ${message.guild.name}\nReason: ${reason}`)
    await user.send(embed)
    if (!message.guild.roles.fetch(r => r.id === db.get(message.guild.id + '.mutedRole'))) return message.channel.send('Please setup a muted role in your server to use this command.');
    member.roles.add(message.guild.roles.cache.find(role => role.id === db.get(message.guild.id + '.mutedRole')));
    message.channel.send('Successfully muted <@!' + user + '>.')
    
    if (db.get(message.guild.id + '.loggingChannel')) {
      let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'))
      embed.setTitle('User Muted')
      embed.setTimestamp()
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n\n**Time:** ${ms(time)}\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`)
      try {
        LoggingChannel.send(embed)
      } catch {
        return;
      }
    }
    setTimeout(() => { member.roles.remove(message.guild.roles.cache.find(role => role.id === db.get(message.guild.id + '.mutedRole'))); }, time)
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