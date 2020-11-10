module.exports = {
  name: 'dm',
  description: 'DM a user.',
  guildOnly: true,
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const db = require('../../data/databaseManager/index.js');
    const logging = require('../../utils/functions.js').logging;
    function dmCmd() {
      let args = message.content.slice(prefix.length).trim().split(/ +/g);  
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
      if (!user) return message.channel.send(`Please specify a user.`);
      if (!args.slice(2).join(' ')) return message.channel.send('Please specify a message.');
        const embed = new Discord.MessageEmbed()
          embed.setTitle(`DM Sent`)
          embed.setTimestamp()
          embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        if (args.slice(2) === null) {
          embed.setDescription(
            `**Message:** \`This message contained an embed.\`\n` +
            `**Message ID:** ${message.id}\n` +
            `**Sent To: ${user.tag}**\n\n` +
            `**Moderator:** ${message.author}\n` +
            `**Moderator Tag:** ${message.author.tag}\n` +
            `**Moderator ID:** ${message.author.id}\n`)
        } else {
          let user1;
          if (user.tag === undefined) user1 = user.user; else user1 = user
          embed.setDescription(
            `**Message:** ${args.slice(2).join(' ')}\n` +
            `**Message ID:** ${message.id}\n` +
            `**Sent To:** ${user1.tag}\n\n` +
            `**Moderator:** ${message.author}\n` +
            `**Moderator Tag:** ${message.author.tag}\n` +
            `**Moderator ID:** ${message.author.id}\n`)
        }

        user.user
          .send(args.slice(2).join(' ') + '\n\nSent from: ' + message.guild.name)
          .catch(() => { return message.channel.send('The user does not have their DM\'s turned on.') })
          .then(() => message.channel.send(`Message sent to ${user.user.tag}.`))
        logging(embed, message, client);
      }

      var debounce = false;
      if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
        dmCmd()
        debounce = true;
      } else if (db.get(message.guild.id + '.modRole')) {
        if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
            dmCmd()
            debounce = true;
        } 
        if (debounce === false) {
          message.channel.send('You do not have the premissions to run this command.')
        }
      }
  }
}