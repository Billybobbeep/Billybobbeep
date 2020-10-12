module.exports = async client => {
  const Discord = require(`discord.js`);
  const configFile = require('../config.json');
  const db = require('quick.db');
  const embed = new Discord.MessageEmbed()
  embed.setTitle(`Message Deleted`)
  embed.setTimestamp();
  embed.setColor('#d9a9d5');

  let command;
  let pinned;

  client.on('messageDelete', message => {
  if (!message.guild) return;
  let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
  let prefix = db.get(message.guild.id + '.prefix') || '~'
    let msg = message.content.toLowerCase();

    if (msg.startsWith(prefix)) {
      command = true;
    } else {
      command = false;
    }
    if (message.pinned) {
      pinned = true;
    } else {
      pinned = false;
    }

    if (message.author.bot) return;
    if (msg.startsWith(prefix + `purge`)) return;
    if (message.content === null || message.content === " " || message.content === undefined) {
      embed.setDescription(
        `**Content:** *This message provided no text.*\n` +
        `**Message ID:** ${message.id}\n` +
        `**Channel:** ${message.channel}\n\n` +
        `**Author:** ${message.author}\n` +
        `**Author Tag:** ${message.author.tag}\n` +
        `**Author ID:** ${message.author.id}\n\n` +
        `**Command:** ${command}\n` +
        `**Pinned:** ${pinned}\n`)
        try {
          return LoggingChannel.send(embed);
        } catch {
          console.log(`${message.guild.name} has an invalid logging channel ID`)
        }
    }

    if (message.attachments.size > 0) {
      embed.setDescription(
        `**Content:** *This message contained an image.*\n` +
        `**Message ID:** ${message.id}\n` +
        `**Channel:** ${message.channel}\n\n` +
        `**Author:** ${message.author}\n` +
        `**Author Tag:** ${message.author.tag}\n` +
        `**Author ID:** ${message.author.id}\n\n` +
        `**Command:** ${command}\n` +
        `**Pinned:** ${pinned}\n`)
        try {
          return LoggingChannel.send(embed);
        } catch {
          console.log(`${message.guild.name} has an invalid logging channel ID`)
        }
    }
    if (message.content.toLowerCase().includes('https://') || message.content.toLowerCase().includes('http://') || message.content.toLowerCase().includes('www.') || message.content.toLowerCase().includes('.com') || message.content.toLowerCase().includes('.co.uk')) {
      embed.setDescription(
        `**Content:** *This message contained an embeded link.*\n` +
        `**Link**: ${message.content}\n` +
        `**Message ID:** ${message.id}\n` +
        `**Channel:** ${message.channel}\n\n` +
        `**Author:** ${message.author}\n` +
        `**Author Tag:** ${message.author.tag}\n` +
        `**Author ID:** ${message.author.id}\n\n` +
        `**Command:** ${command}\n` +
        `**Pinned:** ${pinned}\n`)
        try {
          return LoggingChannel.send(embed);
      } catch {
          console.log(`${message.guild.name} has an invalid logging channel ID`)
        }
    }

    embed.setDescription(
      '**Content:** ' + message.content +
      '\n**Message ID:** ' + message.id +
      '\n**Channel:** ' + message.channel +
      `\n\n**Author:** ${message.author}` +
      '\n**Author Tag:** ' + message.author.tag +
      '\n**Author ID:** ' + message.author.id +
      '\n\n**Command:** ' + command +
      '\n**Pinned:** ' + pinned
    )
    try {
      LoggingChannel.send(embed);
    } catch {
          console.log(`${message.guild.name} has an invalid logging channel ID`)
        }
  });
};