const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async (message) => {
  const commandEmbed = new Discord.MessageEmbed()
    .setTitle("Pronoun Roles")
    .setDescription(
      `⚪ Him/he\n` +
      `🔴 She/her\n` +
      `⚫ Them/they`)
    .setColor([177, 210, 240])
    .setFooter(`React below to claim a role!`)
  message.channel.send(commandEmbed)
  message.delete();
}