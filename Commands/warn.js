const Discord = require(`discord.js`);
const db = require('../databaseManager/index.js');
module.exports = async (client, msg, args, prefix, message) => {
  let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));

  async function warnCmd() {
    var user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
    if (!user) return message.channel.send('Please specify a user to warn.');

    if (user.id === message.author.id) return message.channel.send('You cannot warn yourself.')

    var member;

    try {
      member = await message.guild.members.fetch(user);
    } catch (err) {
      member = null;
    }
    if (member.user.bot) return message.channel.send('You cannot warn bots.')

    if (!member) return message.reply('That user is not in this server.');
    if (user.id === undefined) {
      user = user.user
    }

    var reason = args.splice(1).join(' ');
    if (!reason) return message.reply('You need to specify a reason');
    db.push(message.guild.id + '_' + user.id + '.warnReasons', reason);
    var log = new Discord.MessageEmbed()
      .setTimestamp()
      .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      .setTitle('User Warned.')
      .addField('User:', user.tag, true)
      .addField('By:', message.author.tag, true)
      .addField('Reason:', reason)
      .addField('Total Warnings', `${db.get(message.guild.id + '_' + user.id + '.warnings') || 0 + 1}`, true)
    if (LoggingChannel) {
      try {
        await LoggingChannel.send(log);
      } catch {
        return;
      }
    }

    await message.channel.send(`**${user}** has been warned by **${message.author}**!`);
    var log2 = new Discord.MessageEmbed()
    log2.setTimestamp()
    log2.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    log2.setTitle(`You have been warned`);
    log2.addField(`Responsible Moderator:`, message.author.tag, true);
    log2.addField(`Reason:`, reason);
    log2.addField(`Guild:`, message.guild)
    user.send(log2)
    db.add(message.guild.id + '_' + user.id + '.warnings', 1)
  }
  
  var debounce = false;

  if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
    warnCmd()
    debounce = true;
  } else if (db.get(message.guild.id + '.modRole')) {
    if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
        warnCmd()
        debounce = true;
    } 
    if (debounce === false) {
      message.channel.send('You do not have the premissions to run this command.')
    }
  }
}