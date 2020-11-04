const { MessageEmbed } = require('discord.js');

module.exports = (message, db) => {
    let prefix = db.get(message.guild.id + '.prefix') || '~'
    let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

  if (!args[2] || args[2].toLowerCase() === 'help') {
    const embed = new MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can change whether billybobbeep sends explicit content or not.\n\n**Usage:**\n\`${prefix}setup clean [off/on]\``)
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    message.channel.send(embed)
  }

  if (args[2] && args[2].toLowerCase() === 'off' && args[2].toLowerCase() !== 'help') {
    if (db.get(message.guild.id + '.cleanFilter')) {
      db.delete(message.guild.id + '.cleanFilter')
      message.channel.send('The clean filter has been turned off.')
    } else {
      message.channel.send('The clean filter is already off.')
    }
  } else if (args[2] && args[2].toLowerCase() === 'on' && args[2].toLowerCase() !== 'help') {
    if (!db.get(message.guild.id + '.cleanFilter')) {
      db.set(message.guild.id + '.cleanFilter', true)
      message.channel.send('The clean filter has been turned on.')
    } else {
      message.channel.send('The clean filter is already on.')
    }
  } else {
    message.channel.send(`${args[2]} is not a valid option, please select either \`on\` or \`off\``)
  }
}