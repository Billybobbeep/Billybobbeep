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
    .setDescription(`With this command you can turn off levelling in your server.\n\n**Usage:**\nTo turn off levelling: \`${prefix}setup ${args[1]} off\`\nTo turn on levelling: \`${prefix}setup ${args[1]} on\``)
    .setColor(`${embedColor}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(embed);
  } else {
    guildData.findOne({ guildId: message.guild.id }).then(result => {
      if (args[2].toLowerCase() === 'reset' || args[2].toLowerCase() === 'on') {
        if (!result.levelsEnabled) {
          guildData.findOneAndUpdate({ guildId: message.guild.id }, { levelsEnabled: true }).then(() => {
            message.channel.send('Levelling has been turned on');
          });
        } else {
          message.channel.send('Levelling is already on');
        }
      }

        if (args[2] === 'off' && result.levelsEnabled) return message.channel.send(`Levelling is already turned off.`)
        guildData.findOneAndUpdate({ guildId: message.guild.id }, { levelsEnabled: false }).then(() => {
          message.channel.send('Levelling has now been turned off');
        });
    });
  }
}