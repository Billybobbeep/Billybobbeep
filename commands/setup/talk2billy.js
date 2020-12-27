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
    .setDescription(`With this command you can set a channel for billy to reply to every message.\n\n**Usage:**\nTo set up the channel: \`${prefix}setup ${args[1]} [channel]\`\nTo turn off the talk to billy channel: \`${prefix}setup ${args[1]} reset\``)
    .setColor(`${embedColor}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    return message.channel.send(embed)
  }

  if (args[2] && args[2].toLowerCase() === 'reset') {
    guildData.findOneAndUpdate({ guildId: message.guild.id }, { talk2billy: false }).then(() => {
      message.channel.send('Removed talk to billy channel from the database');
    });
  } else {
    guildData.findOne({ guildId: message.guild.id }).then(() => {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);
      if (!channel)
        return message.channel.send('Please specify a valid channel');
      if (channel.id === result.talk2billy) return message.channel.send(`Your talk to billy channel is already set as ${channel}`)
      guildData.findOneAndUpdate({ guildId: message.guild.id }, { talk2billy: channel.id }).then(() => {
        message.channel.send(`Your talk to billy channel is now set up as ${channel}`);
      });
    });
  }
}