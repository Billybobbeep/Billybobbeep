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
    .setDescription(`With this command you can change whether billybobbeep sends explicit content or not.\n\n**Usage:**\n\`${prefix}setup clean [off/on]\``)
    .setColor(embedColor)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(embed);
  }

  guildData.findOne({ guildId: message.guild.id }).then(result => {
    if (args[2] && args[2].toLowerCase() === 'off' && args[2].toLowerCase() !== 'help') {
        if (result.cleanFilter) {
          result.cleanFilter = false;
          result.save().then(() => {
            message.channel.send('The clean filter has been turned off');
          });
        } else {
          message.channel.send('The clean filter is already off')
        }
    } else if (args[2] && args[2].toLowerCase() === 'on' && args[2].toLowerCase() !== 'help') {
      if (!result.cleanFilter) {
        result.cleanFilter = true;
        result.save().then(() => {
          message.channel.send('The clean filter has been turned on');
        });
      } else {
        message.channel.send('The clean filter is already on');
      }
    } else {
      message.channel.send(`${args[2]} is not a valid option, please select either \`on\` or \`off\``)
    }
  });
}