module.exports = {
  name: 'rwarn',
  description: 'Remove a users last warning',
  guildOnly: true,
  catagory: 'moderation',
  usage: 'rwarn [user] [reason]',
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const guildData = require('../../events/client/database/models/guilds.js');
    const guildMemberData = require('../../events/client/database/models/guildMembers.js');
    let reasons = [];
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    async function rwarnCmd() {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
      if (!user) return message.channel.send('Please specify a user');

      if (user.id === message.author.id) return message.channel.send('You cannot remove your own warnings');
      if (user.bot) return message.channel.send('Bots cannot be warned');

      let member;
      let memberResult = await guildMemberData.findOne({ guildId: message.guild.id, memberId: user.id });
      let guildResult = await guildDatafindOne({ guildId: message.guild.id });

      if (memberResult.warnings < 1 || !memberResult.warnings)
        return message.channel.send(`${user} does not have any warnings`)

      try {
        member = await message.guild.members.fetch(user);
      } catch (err) {
        member = null;
      }
      if (user.tag === undefined) {
        user = user.user
      }

      if (!member) return message.reply('That user is not in this server');

      let reason = args.splice(2).join(' ');
      let tw = memberResult.warnings;
      if (!reason) reason = 'No reason was provided';
      message.channel.send(`Removed \`1\` warning from ${user}`);

      reasons = memberResult.warnReasons;
      let warnReason = reasons[reasons.length - 1];
      reasons.splice((reasons.length - 1).toString(), 1);
      if (tw < 2)
        guildMemberData.findOneAndUpdate({ guildId: message.guild.id, memberId: user.id }, { warnReasons: [] });
      else
        guildMemberData.findOneAndUpdate({ guildId: message.guild.id, memberId: user.id }, { warnReasons: reasons });

      warnReason = warnReason.split(/ +/g);
      let index = warnReason.findIndex(result => result === '-');
      let warnReason2 = '';
      let i = 0;
      warnReason.forEach(word => {
          i++;
          if (i >= (index + 1)) return;
          if (i === 1) {
            word = word[0].toUpperCase() + word.substring(1).toLowerCase();
            warnReason2 = `${word}`;
          } else
            warnReason2 += ` ${word}`;
      });

      let log = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        .setTitle('Warning Removed')
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        .addField('Warning Reason', warnReason, true)
        .addField('Total Warnings', memberResult.warnings - 1, true)
      logging(log, message, client);
      if (memberResult.warnings < 1)
        message.channel.send(`${user.username} does not have any warnings to remove`);
      else if (memberResult.warnings == 1)
      guildMemberData.findOneAndUpdate({ guildId: message.guild.id, memberId: user.id }, { warnings: 0 });
      else
        guildMemberData.findOneAndUpdate({ guildId: message.guild.id, memberId: user.id }, { warnings: memberResult.warnings - 1 });
    }
    let debounce = false;

    if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
      rwarnCmd()
      debounce = true;
    } else if (db.get(message.guild.id + '.modRole')) {
      if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
        rwarnCmd()
        debounce = true;
      }
      if (debounce === false) {
        message.channel.send('You do not have the permissions to use this command')
      }
    }
  }
}