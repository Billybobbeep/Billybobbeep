const Discord = require(`discord.js`);
const db = require('quick.db')

module.exports = async (client, msg, args, prefix, message) => {
  function rwarnCmd() {
    let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));

    async function warnCmd() {
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
        .setTitle('Warning Removed')
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        .addField('Total Warnings', db.get(message.guild.id + '_' + user.id + '.warnings') - 1, true)
      if (LoggingChannel) {
        try {
          await LoggingChannel.send(log);
        } catch {
          return;
        }
      }
      if (db.get(message.guild.id + '_' + user.id + '.warnings') < 1) {
        return message.channel.send(`${user.username}`)
      }
      if (db.get(message.guild.id + '_' + user.id + '.warnings') == 1) {
        db.delete(message.guild.id + '_' + user.id + '.warnings')
      } else {
        db.subtract(message.guild.id + '_' + user.id + '.warnings', 1)
      }
    }



    if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
      warnCmd()
    } else {
      if (!db.get(message.guild.id + '.adminsRole')) return (`The moderators role has not been set up in your server`)
      if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.adminsRole'))) {
        warnCmd()
      } else {
        message.channel.send('You do not have the premissions to run this command.')
      }
    }
  }
  var debounce = false;

  if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
    rwarn()
    debounce = true;
  } else if (db.get(message.guild.id + '.modRole')) {
    if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
      rwarnCmd()
      debounce = true;
    }
    if (debounce === false) {
      message.channel.send('You do not have the premissions to run this command.')
    }
  }
}