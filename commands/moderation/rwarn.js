const Discord = require(`discord.js`);
const db = require('../../data/databaseManager/index.js');
var reasons = []

module.exports = {
  name: 'rwarn',
  description: 'Remove a users warning.',
  guildOnly: true,
  execute (message, prefix, client) {
    async function rwarnCmd() {
      let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
      var user = message.mentions.users.first();
      if (!user) return message.channel.send('Please specify a user.');

      if (user.id === message.author.id) return message.channel.send('You cannot remove your own warnings');
      if (user.bot) return message.channel.send(`Bots cannot be warned.`);

      var member;

      if (db.get(message.guild.id + '_' + user.id + '.warnings') < 1 || !db.get(message.guild.id + '_' + user.id + '.warnings')) {
        return message.channel.send(`${user} does not have any warnings.`)
      }

      try {
        member = await message.guild.members.fetch(user);
      } catch (err) {
        member = null;
      }
      if (user.tag === undefined) {
        user = user.user
      }

      if (!member) return message.reply('That user is not in this server.');

      var reason = args.splice(1).join(' ');
      let tw = db.get(message.guild.id + '_' + user.id + '.warnings')
      if (!reason) return message.reply('Please provide a reason');
      message.channel.send(`Removed \`1\` warnings from ${user}`);

      reasons = db.get(message.guild.id + '_' + user.id + '.warnReasons');
      console.log(reasons)
      reasons.splice((reasons.length - 1).toString(), 1);
      console.log(reasons)
      if (tw < 2) {
        db.delete(message.guild.id + '_' + user.id + '.warnReasons');
      } else {
        db.set(message.guild.id + '_' + user.id + '.warnReasons', reasons);
      }

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
        return message.channel.send(`${user.username} does not have any warnings to remove.`)
      }
      if (db.get(message.guild.id + '_' + user.id + '.warnings') == 1) {
        db.delete(message.guild.id + '_' + user.id + '.warnings')
      } else {
        db.subtract(message.guild.id + '_' + user.id + '.warnings', 1)
      }
    }
    var debounce = false;

    if (message.member.hasPermission("MANAGE_MESSAGES") || message.member.hasPermission("ADMINISTRATOR")) {
      rwarnCmd()
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
}