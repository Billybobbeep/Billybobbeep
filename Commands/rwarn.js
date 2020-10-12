const Discord = require(`discord.js`);
const db = require('quick.db')

module.exports = async (client, msg, args, prefix, message) => {
  let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
  if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to run this command.")

  var user = message.mentions.users.first();
  if (!user) return message.channel.send('Please specify a user to warn.');

  if (user.id === message.author.id) return message.channel.send('You cannot remove your own warnings')

  var member;

  if (db.get(message.guild.id + '_' + user.id + '.warnings') < 1) {
    return message.channel.send(`${user} does not have any warnings.`)
  }

  try {
    member = await message.guild.members.fetch(user);
  } catch (err) {
    member = null;
  }

  if (!member) return message.reply('That user is not in this server.');

  var reason = args.splice(1).join(' ');
  if (!reason) return message.reply('Please provide a reason');

  var log = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    .setTitle('Warning Removed.')
    .addField('User:', user, true)
    .addField('By:', message.author, true)
    .addField('Reason:', reason)
    .addField('Total Warnings', db.get(message.guild.id + '_' + user.id + '.warnings') - 1, true)
  if (LoggingChannel) {
    try {
      await LoggingChannel.send(log);
    } catch {
      console.log(`${message.guild.name} has an invalid logging channel ID`)
    }
  }
  if (db.get(message.guild.id + '_' + user.id + '.warnings') = 1) {
    db.delete(message.guild.id + '_' + user.id + '.warnings')
  } else {
    db.subtract(message.guild.id + '_' + user.id + '.warnings', 1)
  }
}