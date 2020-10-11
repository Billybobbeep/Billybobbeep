const Discord = require(`discord.js`);
const db = require('quick.db')

module.exports = async (prefix, message) => {
  const embed = new Discord.MessageEmbed();
  embed.setTimestamp();
  embed.setTitle('Billybobbeep | Economy')
  embed.setFooter(`Requested by: ${message.author.tag}`);
  embed.setColor('#eea990');


}