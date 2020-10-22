const Discord = require(`discord.js`);
const configFile = require('../../config.json');
const embed = new Discord.MessageEmbed();
const db = require('../../databaseManager/index.js');

module.exports = async (client, message) => {
  if (!message.guild) return;
  let colorChart = ['#a1c4fd', '#c2e9fb', '#d4fc79', '#96e6a1', '#a6c0fe', '#f68084', '#fccb90', '#d57eeb', '#e0c3fc', '#fa709a', '#fee140', '#30cfd0', '#a8edea', '#fed6e3'];
  let ranColor = colorChart[Math.floor(Math.random() * colorChart.length)]
  let prefix = db.get(message.guild.id + '.prefix') || '~'
  let reason = ''
  let user;
  let use;

  if (message.author.bot) return;
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  embed.setTitle('Billybobbeep | AFK Handling');
  embed.setColor(ranColor);
  embed.setTimestamp();
  embed.setFooter(`Requested by: ${message.author.tag}`);

  if (message.content.toLowerCase().startsWith(prefix + 'afk')) {
    if (message.guild === null) {
      embed.setDescription('This command is not available for direct messaging, please enter the command in a valid server.')
      return message.channel.send(embed)
    }
    if (args[1]) {
      if (args[1] === 'me') {
        user = message.author
      } else {
        user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
      }
    } else {
      embed.setDescription('Please specify a user to mark as AFK.')
      return message.channel.send(embed)
    }
    if (!user) {
      embed.setDescription('Please specify a user to mark as AFK.')
      return message.channel.send(embed)
    }
    if (args[2]) {
      reason = args.slice(2).join(" ")
    } else {
      reason = 'No reason was provided.'
    }
    use = true
    if (db.fetch(user.id + '.isAFK')) {
      if (db.fetch(user.id + '.isAFK') === false) return;
      embed.setDescription('This user is already marked as AFK.')
      use = false
      return message.channel.send(embed)
    }

    if (user.bot) {
      embed.setDescription(`You cannot mark bots as AFK.`);
      return message.channel.send(embed)
    } else {
      if (use === false) return;
      embed.setDescription(`**${user.tag}** has now been marked as AFK.\n**Reason:** ${reason}`);
      db.set(user.id + '.isAFK', true)
      db.set(user.id + '.isAFKreason', reason)
      message.channel.send(embed);
      if (message.author.id === user.id) {
        embed.setDescription(`You have marked your self as AFK in ${message.guild}\nReason: ${reason}`)
        embed.setFooter(`When you are back please run the command '${db.get(message.guild.id + '.prefix') || '~'}back me' in ${message.guild}`)
        return user.send(embed)
      } else {
        embed.setDescription(`${message.author.tag} has marked you as AFK in ${message.guild}\nReason: ${reason}`)
        embed.setFooter(`When you are back please run the command '${db.get(message.guild.id + '.prefix') || '~'}back me' in ${message.guild}`)
        return user.send(embed)
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
      embed.setDescription('Please specify a user.')
      return message.channel.send(embed)
    }
    if (!user) {
      embed.setDescription('Please specify a user.')
      return message.channel.send(embed)
    }

    if (db.fetch(user.id + '.isAFK')) {
      if (db.fetch(user.id + '.isAFK') === true) {
        embed.setDescription('**' + user.tag + '** has now been removed from the AFK list.\nWelcome back, ' + user.tag);
        db.delete(user.id + '.isAFK')
        db.delete(user.id + '.isAFKreason')
        return message.channel.send(embed)
      }
      else {
        embed.setDescription('**' + user.tag + '** ' + 'was not marked as AFK');
        return message.channel.send(embed)
      }
    }
  }

  //Let know that a user is AFK
  if (message.mentions.users.first()) {
    let user = message.mentions.users.first()

    if (db.get(user.id + '.isAFK') && db.get(user.id + '.isAFK') === true) {
      embed.setDescription('The user you have pinged (' + user.tag + ') is currently AFK.\n\nReason: ' + db.get(user.id + '.isAFKreason').toString());
      return message.channel.send(embed);
    }
  }
}