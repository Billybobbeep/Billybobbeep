module.exports = {
  name: 'rwarn',
  description: 'Remove a users last warning',
  guildOnly: true,
  catagory: 'moderation',
  usage: 'rwarn [user] [reason]',
  /**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const guildData = require('../../events/client/database/models/guilds.js');
    const guildMemberData = require('../../events/client/database/models/guildMembers.js');
    let reasons = [];
    const logging = require('../../utils/functions').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    async function rwarnCmd() {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
      if (!user) return message.channel.send('You must provide a user');

      if (user.id === message.author.id) return message.channel.send('You cannot remove your own warnings');
      if (user.bot) return message.channel.send('Bots cannot be warned');

      let member;
      let memberResult = await guildMemberData.findOne({ guildId: message.guild.id, memberId: user.id });
      let guildResult = await guildData.findOne({ guildId: message.guild.id });

      if (memberResult.warnReasons.length < 1 || !memberResult.warnReasons.length)
        return message.channel.send(`${user} does not have any warnings`)

      try {
        member = await message.guild.members.cache.get(user);
      } catch (err) {
        member = null;
      }
      if (user.tag === undefined) {
        user = user.user
      }

      if (!member) return message.channel.send(`<@!${message.author ? message.author.id : message.member.user.id}>, That user is not in this server`);

      let reason = args.splice(2).join(' ');
      let tw = memberResult.warnReasons.length;
      if (!reason) reason = 'No reason was provided';
      message.channel.send(`Removed \`1\` warning from ${user}`);

      reasons = memberResult.warnReasons;
      let warnReason = reasons[reasons.length - 1];
      reasons.splice((reasons.length - 1).toString(), 1);
      if (tw < 2) {
        memberResult.warnReasons = [];
      } else {
        memberResult.warnReasons = reasons;
      }

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
        .setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1')
        .setTitle('Warning Removed')
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason, false)
        .addField('Warning Reason', warnReason, false)
        .addField('Total Warnings', memberResult.warnReasons.length - 1, true)
      logging(log, message, client);
      if (memberResult.warnReasons.length < 1)
        message.channel.send(`${user.username} does not have any warnings to remove`);
      else if (memberResult.warnReasons.length == 1) {
        memberResult.warnReasons.length = 0;
        memberResult.save();
      } else {
        memberResult.warnReasons.length = memberResult.warnReasons.length - 1;
        memberResult.save();
      }
    }
    let debounce = false;
    guildData.findOne({ guildId: message.guild.id }).then(result => {
      if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
        rwarnCmd()
        debounce = true;
      } else if (result.preferences.modRole) {
        if (message.member.roles.cache.find(role => role.id === result.preferences.modRole)) {
          rwarnCmd()
          debounce = true;
        }
        if (debounce === false) {
          message.channel.send('You do not have the permissions to use this command');
        }
      }
    });
  }
}