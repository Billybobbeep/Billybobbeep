module.exports = async (message, client) => {
  const Discord = require('discord.js');
  const db = require('../../structure/global.js').db;;
  const logging = require('../../utils/functions.js').logging;
  const embed = new Discord.MessageEmbed();
  embed.setTitle(`Message Deleted`)
  embed.setTimestamp();

  let command;
  let pinned;
  var attachments = [];

  if (!message.guild) return;
  try { if (message.author.bot) return; } catch { return }

  if (!message || !message.author.id) return;
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
  let prefix = db.get(message.guild.id + '.prefix') || '~';
  var content = message.content.length ? message.content : '*This message contained no content.*';
  message.attachments ? message.attachments.forEach(attachment => attachments.push(attachment.proxyURL)) : attachments.push('Null');
  if (!attachments.includes('Null'))
    attachments = attachments.join('\n');
  else
    attachments = '*This message did not contain any attachments.*';

  let deleted;
  message.guild.fetchAuditLogs().then(logs => {
    let log = logs.entries
      .filter(e => e.action === 'MESSAGE_DELETE')
      .sort((a, b) => b.createdAt - a.createdAt)
      .first()
    deleted = log.executor.username + '#' + log.executor.discriminator;
  });

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

  embed.setDescription(
    '**Content:** ' + content +
    '\n**Message ID:** ' + message.id +
    '\n**Channel:** <#' + message.channel +
    `>\n\n**Author:** ${message.author}` +
    '\n**Author Tag:** ' + message.author.tag +
    '\n**Author ID:** ' + message.author.id +
 //   '\n**Deleted By:** ' + deleted +
    '\n\n**Command:** ' + command +
    '\n**Pinned:** ' + pinned +
    `${attachments ? `\n**Attachments:\n** ${attachments}` : ''}`
  );

  logging(embed, message, client);
}