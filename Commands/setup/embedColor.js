const { MessageEmbed } = require('discord.js');
module.exports = (message, db) => {
  let prefix = db.get(message.guild.id + '.prefix') || '~'
  let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  var color;

  if (!args[2]) {
    const embed = new MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can change the default embed color.\n\n**Usage:**\n\`${prefix}setup embed [color]\`\n\n**Built in colors:**\nBuilt in colors usage: \`${prefix}setup embed [built-in-color-name]\`\n\n**Color List:**\nDark-Blue, Light-Blue, Green, Yellow, Orange, Red, Peach, Purple\n\nIf you would like to use your own color use the command:\n \`${prefix}setup embed [hex-code]\``)
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(embed)
  }
  if (args[2] && !args[2].startsWith('#')) {
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
    } else if (args[2].toLowerCase() === 'blue'
      || args[2].toLowerCase() === 'default') {
        if (db.get(message.guild.id + '.embedColor')) {
          db.delete(message.guild.id + '.embedColor')
        }
        return message.channel.send(`The embed colour has been reset to default.`)
    } else {
      return message.channel.send('You have entered an invalid color.')
    }
  }

  if (args[2] && args[2].startsWith('#')) {
    var match = /(#(?:[a-f\d]{3}){1,2})([^#]+)/gi
    var result = [], m

    while ((m=match.exec(args[2])) !== null) {
      result.push([m[1], m[2]]);
    }
    var result = result.toLocaleString().replace(',', '')
    if (!result.length >= 3) return message.channel.send('You have entered a invalid hex code')
    if (result.length > 8) return message.channel.send('You have entered a invalid hex code')

    color = result
  }
  if (color) {
    if (db.get(message.guild.id + '.embedColor')) {
      if (db.get(message.guild.id + '.embedColor') === color) {
        return message.channel.send(`This servers embed color is already set as ${color}`)
      }
    }
    db.set(message.guild.id + '.embedColor', color)
    message.channel.send(`This servers default embed color is now ${color}`)
  }
}