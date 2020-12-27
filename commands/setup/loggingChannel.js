const { MessageEmbed } = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = (message, prefix, embedColor) => {
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  if (!args[2] || args[2].toLowerCase() === 'help') {
    const embed = new MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can change which channel billy sends the servers moderation logs to.\n\n**Usage:**\nTo set up a channel: \`${prefix}setup ${args[1]} [channel]\`\nTo turn off logging: \`${prefix}setup ${args[1]} reset\``)
    .setColor(`${embedColor}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    return message.channel.send(embed)
  }

  guildData.findOne({ guildId: message.guild.id }).then(result => {
    if (args[2] && args[2].toLowerCase() === 'reset') {
      guildData.findOneAndUpdate({ guildId: message.guild.id }, { loggingChannel: false }).then(() => {
        message.channel.send('Removed logging channel from the database');
      });
    } else {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])
      if (!channel)
        return message.channel.send('Please specify a valid channel.')
      if (channel.id === result.loggingChannel) return message.channel.send(`Your logging channel is already set as ${channel}`);
      guildData.findOneAndUpdate({ guildId: message.guild.id }, { loggingChannel: channel.id }).then(() => {
        message.channel.send(`Your logging channel is now set up as ${channel}`);
      });
    }
  });
}