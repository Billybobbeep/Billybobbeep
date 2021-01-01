const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
let embed = new Discord.MessageEmbed();
const guildData = require('../client/database/models/guilds');
const userData = require('../client/database/models/users');

module.exports = {
  commands: ['afk', 'back'],
  guildOnly: true,
  execute (message, prefix, client) {
    guildData.findOne({ guildId: message.guild.id }).then(result => {
      embed = new Discord.MessageEmbed();
      if (!message.guild) return;
      let reason = ''
      let user;
      let use;

      if (message.author.bot) return;
      let args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      embed.setTitle('Billybobbeep | AFK Handling');
      embed.setColor(result.embedColor)
      embed.setTimestamp();
      embed.setFooter(`${message.author.tag}`);

      if (message.content.toLowerCase().startsWith(prefix + 'afk')) {
        if (message.guild === null) {
          embed.setDescription('This command is not available for direct messaging, please enter the command in a valid server')
          return message.channel.send(embed)
        }
        if (args[1]) {
          if (args[1] === 'me') {
            user = message.author
          } else {
            user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
          }
        } else {
          embed.setDescription('Please specify a user to mark as AFK')
          return message.channel.send(embed)
        }
        if (!user) {
          embed.setDescription('Please specify a user to mark as AFK')
          return message.channel.send(embed)
        }
        if (args[2]) {
          reason = args.slice(2).join(" ")
        } else {
          reason = 'No reason was provided'
        }
        use = true
        if (userData.findOne({ userId: user.id }).then(result => result.isAfk)) {
          embed.setDescription(`<@!${user.id}> is already marked as AFK`);
          use = false
          return message.channel.send(embed)
        }

        if (user.bot) {
          embed.setDescription('You cannot mark bots as AFK');
          return message.channel.send(embed)
        } else {
          if (use === false) return;
          embed.setDescription(`**${user.tag}** has now been marked as AFK.\n**Reason:** ${reason}`);
          userData.findOneAndUpdate({ userId: user.id }, { isAfk: true, afkReason: reason });
          message.channel.send(embed);
          if (message.author.id === user.id) {
            embed.setDescription(`You have marked yourself as AFK in ${message.guild}\nReason: ${reason}`)
            embed.setFooter(`When you are back please run the command '${result.prefix || '~'}back me' in ${message.guild}`)
            try {
              return user.send(embed)
            } catch {
              message.channel.send('You must have your DM\'s turned on to use this command')
            }
          } else {
            embed.setDescription(`${message.author.tag} has marked you as AFK in ${message.guild}\nReason: ${reason}`)
            embed.setFooter(`When you are back please run the command '${result.prefix || '~'}back me' in ${message.guild}`)
            try {
              return user.send(embed)
            } catch {
              message.channel.send('You must have your DM\'s turned on to use this command')
            }
          }
        }
      }

      //////////////////////////
      //[AFK - Return Command]//
      //////////////////////////

      if (message.content.toLowerCase().startsWith(prefix + 'back')) {
        if (args[1]) {
          if (args[1] === 'me') {
            user = message.author
          } else {
            user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
          }
        } else {
          embed.setDescription('Please specify a user')
          return message.channel.send(embed)
        }
        if (!user) {
          embed.setDescription('Please specify a user')
          return message.channel.send(embed)
        }

      if (userData.findOne({ userId: user.id }).then(result => result.isAfk)) {
          embed.setDescription('**' + user.tag + '** has now been removed from the AFK list.\nWelcome back, ' + user.tag);
          userData.findOneAndUpdate({ userId: user.id }, { isAfk: false, afkReason: 'none' });
          message.channel.send(embed)
        } else {
          embed.setDescription('**' + user.tag + '** ' + 'was not marked as AFK');
          message.channel.send(embed)
        }
      }
    });
  },
  mentions(message) {
    embed = new Discord.MessageEmbed();
    embed.setTitle('Billybobbeep | AFK Handling');
    embed.setColor(guildData.findOne({ guildId: message.guild.id }).then(result => result.embedColor));
    embed.setDescription('The following users you have pinged are marked as AFK');
    embed.setTimestamp();
    embed.setFooter(`${message.author.tag}`);
    if (message.content.includes('back') || message.content.includes('afk')) return;
    if (message.mentions.users.first()) {
      let member = [];
      message.mentions.users.forEach(user => {
        if (userData.findOne({ userId: user.id }).then(result=> result.isAfk)) {
          if (user.id === message.author.id) return;
          member.push(`${user.id}_${userData.findOne({ userId: user.id }).then(result=> result.afkReason)}`);
        }
      });
      if (member.length > 0) {
        member.forEach(r => {
          r = r.replace('_', ' ').split(/ +/g);
          let user = message.guild.members.cache.get(r[0]);
          user = user.user;
          let reason = r.slice(1).join(' ');
          embed.addField(`${user.username}#${user.discriminator}`, reason);
        });
        message.channel.send(embed);
      }
    }
  }
}