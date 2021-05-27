module.exports = {
  name: 'warn',
  description: 'Warn a user',
  guildOnly: true,
  catagory: 'moderation',
  usage: 'warn [user] [reason]',
  async execute (message, prefix, client) {
    const Discord = require('discord.js');
    const guildData = require('../../events/client/database/models/guilds.js');
    const guildMemberData = require('../../events/client/database/models/guildMembers.js');
    const logging = require('../../utils/functions').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let guildResult = await guildData.findOne({ guildId: message.guild.id });
  
    async function warnCmd() {
      let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
      if (!user) return message.channel.send('Please specify a user to warn');
      if (!user.id || !user.tag) user = user.user;

      if (user.id === message.author.id) return message.channel.send('You cannot warn yourself');
      if (user.bot) return message.channel.send('Bots cannot be warned');
      if (user.id === message.guild.owner.id) return message.channel.send('The server owner cannot be warned');

      let member;
      let memberResult = await guildMemberData.findOne({ guildId: message.guild.id, memberId: user.id });

      try {
        member = await message.guild.members.fetch(user.id);
      } catch (err) {
        member = null;
      }
      if (member && member.user.bot) return message.channel.send('You cannot warn bots');

      if (!member) return message.reply('That user is not in this server');
      if (user.tag === undefined) user = user.user
      if (user.id === message.guild.owner.id) return message.channel.send('You cannot warn the guild owner');

      let reason = args.splice(2).join(' ');
      if (!reason) return reason = "No reason provided";

        let reasons = []
        if (memberResult.warnReasons && typeof memberResult.warnReasons === 'object') {
          for (var i=0; i < (memberResult.warnReasons).length; i++)
            reasons.push(memberResult.warnReasons[i]);
        }

      reasons.push(`${reason} - ${message.author.tag}`)
      memberResult.warnReasons = reasons
      
      let log = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor(guildResult.embedColor)
        .setTitle('User Warned')
        .addField('User:', user.tag, true)
        .addField('By:', message.author.tag, true)
        .addField('Reason:', reason)
        .addField('Total Warnings', `${memberResult.warnings || 1}`, true)
      logging(log, message, client);

      await message.channel.send(`${user} has been warned by ${message.author}`);
      let log2 = new Discord.MessageEmbed()
      log2.setTimestamp()
      log2.setColor(guildResult.embedColor)
      log2.setTitle(`You have been warned`);
      log2.addField(`Responsible Moderator:`, message.author.tag, true);
      log2.addField(`Reason:`, reason);
      log2.addField(`Guild:`, message.guild)
      try {
        user.send(log2);
      } catch {
        message.channel.send('The user has not been notfied as they do not have their DM\'s turned on')
      }
      memberResult.warnings = memberResult.warnings ? memberResult.warnings + 1 : 1;
      memberResult.save();
    }
    
    let debounce = false;

    if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
      warnCmd()
      debounce = true;
    } else if (guildResult.modRole) {
      if (message.member.roles.cache.find(role => role.id === guildResult.modRole)) {
          warnCmd()
          debounce = true;
      } 
      if (debounce === false) {
        message.channel.send('You do not have the permissions to use this command');
      }
    }
  }
}