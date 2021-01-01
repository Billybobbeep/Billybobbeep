module.exports = async (message, client) => {
  const Discord = require('discord.js');
  const guildData = require('../client/database/models/guilds');
  const logging = require('../../utils/functions.js').logging;
  const embed = new Discord.MessageEmbed();
  embed.setTitle(`Message Deleted`)
  embed.setTimestamp();

  let command;
  let pinned;
  let attachments = [];

  if (!message.guild) return;
  try { if (message.author.bot) return; } catch { return }

  if (!message || !message.author.id) return;
  guildData.findOne({ guildId: message.guild.id }).then(result => embed.setColor(result.embedColor));
  let prefix = guildData.findOne({ guildId: message.guild.id }).then(result => result.prefix) || '~';
  let content = message.content.length ? message.content : '*This message contained no content.*';
  message.attachments ? message.attachments.forEach(attachment => attachments.push(attachment.proxyURL)) : attachments.push('Null');
  if (!attachments.includes('Null'))
    attachments = attachments.join('\n');
  else
    attachments = '*This message did not contain any attachments.*';

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
    '\n\n**Command:** ' + command +
    '\n**Pinned:** ' + pinned +
    `${attachments ? `\n**Attachments:\n** ${attachments}` : ''}`
  );

  logging(embed, message, client);
}