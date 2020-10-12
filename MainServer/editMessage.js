module.exports = async (client) => {

  const Discord = require(`discord.js`);
  const db = require('quick.db');

  client.on('messageUpdate', async (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    if (!newMessage) return;
    if (!oldMessage.guild) return;
    
    let LoggingChannel = client.channels.cache.get(db.get(oldMessage.guild.id + '.loggingChannel'));

    if (newMessage.content === null || newMessage.content === " " || newMessage.content === undefined) {
      const embed = new Discord.MessageEmbed()
        .setTitle(`Message Edited`)
        .setDescription(`**Old Content:** ${oldMessage.content}\n` +
          `**New Content:** *This message provided no text.*\n` +
          `**Channel:** ${oldMessage.channel}\n` +
          `**Message ID:** ${newMessage.id}\n\n` +
          `**Author:** ${oldMessage.author}\n` +
          `**Author Tag:** ${oldMessage.author.tag}\n` +
          `**Author ID:** ${oldMessage.author.id}`)
        .setTimestamp()
        .setColor("#84faaa")
        if (LoggingChannel) {
          try {
            return LoggingChannel.send(embed)
          } catch {
            console.log(`${message.guild.name} has an invalid logging channel ID`)
          }
        }
    }
    if (oldMessage === newMessage) return;

    if (
       newMessage.content.toLowerCase().includes('https://')
    && oldMessage.content.toLowerCase().includes('https://')
    || newMessage.content.toLowerCase().includes('http://')
    && oldMessage.content.toLowerCase().includes('http://')
    || newMessage.content.toLowerCase().includes('www.')
    && oldMessage.content.toLowerCase().includes('www.')
    || newMessage.content.toLowerCase().includes('.com')&& oldMessage.content.toLowerCase().includes('.com')
    || newMessage.content.toLowerCase().includes('.co.uk')
    && oldMessage.content.toLowerCase().includes('.co.uk')) return

    const embed = new Discord.MessageEmbed()
      .setTitle(`Message Edited`)
      .setDescription(`**Old Content:** ${oldMessage.content}\n` +
        `**New Content:** ${newMessage.content}\n` +
        `**Channel:** ${oldMessage.channel}\n` +
        `**Message ID:** ${newMessage.id}\n\n` +
        `**Author:** ${oldMessage.author}\n` +
        `**Author Tag:** ${oldMessage.author.tag}\n` +
        `**Author ID:** ${oldMessage.author.id}`)
      .setTimestamp()
      .setColor("#84faaa")
      if (LoggingChannel) {
        try {
          LoggingChannel.send(embed)
        } catch {
          console.log(`${message.guild.name} has an invalid logging channel ID`)
        }
      }
  });
}