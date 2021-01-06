const { MessageEmbed } = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = (message, prefix, embedColor) => {
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  let color;

  if (!args[2] || args[2].toLowerCase() === 'help') {
    const embed = new MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can change the default embed color.\n\n**Usage:**\n\`${prefix}setup embed [color]\`\n\n**Built in colors:**\nBuilt in colors usage: \`${prefix}setup embed [built-in-color-name]\`\n\n**Color List:**\nDark-Blue, Light-Blue, Green, Yellow, Orange, Red, Peach, Purple\n\nIf you would like to use your own color use the command:\n \`${prefix}setup embed [hex-code]\``)
    .setColor(embedColor)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(embed)
  }
  guildData.findOne({ guildId: message.guild.id }).then(result => {
    if (args[2] && !args[2].startsWith('#') && args[2].toLowerCase() !== 'help') {
      if (args[2].toLowerCase() === 'dark-blue') {
        color = '#30076f'
      } else if (args[2].toLowerCase() === 'light-blue') {
        color = '#c1f3f1'
      } else if (args[2].toLowerCase() === 'green') {
        color = '#5ac18e'
      } else if (args[2].toLowerCase() === 'yellow') {
        color = '#fece2f'
      } else if (args[2].toLowerCase() === 'orange') {
        color = '#fc6104'
      } else if (args[2].toLowerCase() === 'red') {
        color = '#dd2429'
      } else if (args[2].toLowerCase() === 'peach') {
        color = '#ff8d3a'
      } else if (args[2].toLowerCase() === 'purple') {
        color = '#ebc7ff'
      } else if (args[2].toLowerCase() === 'blue' || args[2].toLowerCase() === 'default') {
          if (result.embedColor) {
            result.embedColor = '#447ba1';
            result.save().then(() => {
              message.channel.send('The embed color has been reset to default');
            });
          }
      } else {
        message.channel.send('You have entered an invalid color');
      }
    }

    if (args[2] && args[2].startsWith('#')) {
      let match = /(#(?:[a-f\d]{3}){1,2})([^#]+)/gi
      let result2 = [], m

      while ((m = match.exec(args[2])) !== null) {
        result2.push([m[1], m[2]]);
      }
      let result1 = result2.toLocaleString().replace(',', '')
      if (!result1.length >= 3) return message.channel.send('You have entered a invalid hex code')
      if (result1.length > 8) return message.channel.send('You have entered a invalid hex code')

      color = result1
    }
    if (color) {
      if (result.embedColor) {
        if (result.embedColor === color) {
          message.channel.send(`This servers embed color is already set as ${color}`);
        } else {
          result.embedColor = color;
          result.save().then(() => {
            message.channel.send(`This servers default embed color is now ${color}`);
          });
        }
      }
    }
  });
}