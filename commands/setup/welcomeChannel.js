const { MessageEmbed } = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = (message, prefix, embedColor) => {
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
    
  guildData.findOne({ guildId: message.guild.id }).then(result => {
    if (!args[2] || args[2].toLowerCase() === 'help') {
      const embed = new MessageEmbed()
      .setTitle('Billybobbeep | Setup Command')
      .setDescription(`With this command you can set up welcoming new members.\n\n**Usage:**\nTo set up a specific channel: \`${prefix}setup ${args[1]} [channel]\`\nTo turn off this feature use the command: \`${prefix}setup ${args[1]} reset\``)
      .setColor(embedColor)
      .setTimestamp()
      .setFooter(`Requested by: ${message.author.tag}`)
      message.channel.send(embed);
    } else  if (args[2] && args[2].toLowerCase() === 'reset') {
      if (result.welcomeChannel) {
        result.welcomeChannel = false;
        result.save().then(() => {
          message.channel.send('Removed welcome channel from the database');
        });
      } else {
        message.channel.send('There is no welcome channel set up yet');
      }
    } else {
      let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[2]);

      if (!channel)
        return message.channel.send('Please specify a valid channel')
      if (channel.id === result.welcomeChannel) return message.channel.send(`Your welcome channel is already set as ${channel}`);
      result.welcomeChannel = channel.id;
      result.save().then(() => {
        message.channel.send(`Your welcome channel is now set up as ${channel}`);
      });
    }
  });
}