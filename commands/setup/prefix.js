const Discord = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = (message, prefix, embedColor) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need the `Administrator` permissions to use this command')
  if (!args[2] || args[2].toLowerCase() === 'help') {
    const embed = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can change the servers default prefix.\n**Usage** \`${prefix}setup prefix [newPrefix]\``)
    .setColor(`${embedColor}`)
    message.channel.send(embed)
  } else {
    let newPrefix = args[2].toLowerCase();
    if (newPrefix === prefix) return message.channel.send(`Your prefix is already ${newPrefix}`);
    if (newPrefix === '~' || newPrefix === 'reset') {
      guildData.findOneAndUpdate({ guildId: message.guild.id }, { prefix: '~' }).then(() => {
        message.channel.send(`This servers prefix has been set to ${newPrefix}`);
      });
    } else {
      if (!isNaN(newPrefix)) return message.channel.send('The prefix cannot be a number');
      guildData.findOneAndUpdate({ guildId: message.guild.id }, { prefix: newPrefix }).then(() => {
        message.channel.send(`This servers prefix has been set to \`${newPrefix}\``);
      });
    }
  }
}