module.exports = async (message, client) => {
  const Discord = require('discord.js');
  const db = require('../../data/databaseManager/index.js');
  const embed = new Discord.MessageEmbed()
  embed.setTitle(`Message Deleted`)
  embed.setTimestamp();

  let command;
  let pinned;

  if (!message.guild) return;
  try { if (message.author.bot) return; } catch { return }

  if (!message || !message.author.id) return;
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
  let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));
  let prefix = db.get(message.guild.id + '.prefix') || '~';
  var attachments = message.attachment ? message.attachments.map(attachment => attachment.url) : null;
  var content = message.content.length ? message.content : '*This message contained no content.*';

  if (message.content.startsWith(prefix)) {
    command = true;
  } else {
    command = false;
  }
  if (message.pinned) {
    pinned = true;
  } else {
    pinned = false;
  }

  if (message.content.toLowerCase().startsWith(prefix + `purge`)) return;

  /*if (message.attachments.size > 0) {
    embed.setDescription(
      `**Content:** *This message contained an image.*\n` +
      `**Message ID:** ${message.id}\n` +
      `**Channel:** <#${message.channel.id}>\n\n` +
      `**Author:** ${message.author}\n` +
      `**Author Tag:** ${message.author.tag}\n` +
      `**Author ID:** ${message.author.id}\n\n` +
      `**Command:** ${command}\n` +
      `**Pinned:** ${pinned}\n`)
      try {
        return LoggingChannel.send(embed);
      } catch {
        return;
      }
  }*/
  
  /*if (message.content.toLowerCase().includes('https://') || message.content.toLowerCase().includes('http://') || message.content.toLowerCase().includes('www.') || message.content.toLowerCase().includes('.com') || message.content.toLowerCase().includes('.co.uk')) {
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
        return;
      }
  }*/

  embed.setDescription(
    '**Content:** ' + content +
    '\n**Message ID:** ' + message.id +
    '\n**Channel:** ' + message.channel +
    `\n\n**Author:** ${message.author}` +
    '\n**Author Tag:** ' + message.author.tag +
    '\n**Author ID:** ' + message.author.id +
    '\n\n**Command:** ' + command +
    '\n**Pinned:** ' + pinned +
    `${attachments ? `\n**Attachments:** ${attachments.join('\n')}` : ''}`
  );

  if (LoggingChannel) {
    try {
      LoggingChannel.send(embed);
    } catch {
      return;
    }
  }
}