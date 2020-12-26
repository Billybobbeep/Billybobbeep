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
    .setDescription(`With this command you can change whether billybobbeep sends level ups to a specific channel or the channel the userr is currently in.\n\n**Usage:**\nTo set up a specific channel: \`${prefix}setup ${args[1]} [channel]\`\nTo announce it in the channel the user is in: \`${prefix}setup ${args[1]} reset\``)
    .setColor(`${embedColor}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(embed)
  }

  guildData.findOne({ guildId: message.guild.id }).then(result => {
    if (args[2] && args[2].toLowerCase() === 'reset') {
      if (result.levelUpChannel) {
        guildData.findByIdAndUpdate({ guildId: message.guild.id }, { levelUpChannel: false }).then(() => {
          message.channel.send('Removed levelling channel from the database');
        });
      } else {
        message.channel.send('There is no levelling channel set up yet')
      }
    }

    if (args[2] && args[2].toLowerCase() !== 'reset' && args[2].toLowerCase() !== 'help') {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2])

      if (!channel) {
        return message.channel.send('Please specify a valid channel');
      }
      if (channel.id === result.levelUpChannel) return message.channel.send(`Your levelling channel is already set as ${channel}`);
      guildData.findOneAndUpdate({ guildId: message.guild.id }, { levelUpChannel: channel.id }).then(() => {
        message.channel.send(`Your levelling channel is now set up as ${channel}`);
      });
    }
  });
}