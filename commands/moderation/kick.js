module.exports = {
  name: 'kick',
  description: 'Kick a member',
  guildOnly: true,
  catagory: 'moderation',
  usage: 'kick [user] [reason]',
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const configFile = require('../../utils/config.json');
    const guildData = require('../../events/client/database/models/guilds.js');
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    function kickCmd() {
      guildData.findOne({ guildId: message.guild.id }).then(result => {
        let user =
          message.mentions.users.first() ||
          message.guild.members.cache.get(args[1]);

        let member = message.guild.member(user);
        let reason = args.slice(2).join(' ');

        if (!user) return message.channel.send('Please mention a user to kick');
        if (user.id === message.author.id)
          return message.channel.send('You cannot kick yourself from the server');
        if (user.id === client.user.id)
          return message.channel.send('You cannot kick me');
        if (user.tag === undefined || user.id === undefined) {
          user = user.user;
        }
        if (!reason) reason = 'No reason provided';

        member
          .kick({ reason: reason })
          .then(() => {
            message.channel.send(`Successfully kicked **${user.tag}**`
            );
              let embed = new Discord.MessageEmbed();
              embed.setTitle('Kicked Member');
              embed.setDescription(
                `**Member Tag:** ${member.tag}\n` +
                `**Member ID:** ${member.id}\n\n` +
                `**Moderator:** ${message.author}\n` +
                `**Moderator Tag:** ${message.author.tag}\n` +
                `**Moderator ID:** ${message.author.id}`
              );
              embed.setColor(result.embedColor);
              embed.setTimestamp();
              logging(embed, message, client);
          })
          .catch(err => {
            message.reply('I was unable to kick the member you provided');
          });
      });
    }
    let debounce = false;

    guildData.findOne({ guildId: message.guild.id }).then(result => {
      if (message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
        kickCmd()
        debounce = true;
      } else if (result.modRole) {
        if (message.member.roles.cache.find(role => role.id === result.modRole)) {
          if (result.modsCanKick) {
            if (message.guild.id === '733442092667502613') return;
            kickCmd()
            debounce = true;
          }
        }
        if (debounce === false) {
          message.channel.send('You do not have the permissions to use this command')
        }
      }
    });
  }
}