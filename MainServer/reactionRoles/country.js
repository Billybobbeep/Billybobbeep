const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async (message) => {
  const commandEmbed = new Discord.MessageEmbed()
    .setTitle("Region Roles")
    .setDescription(
      `⚪ British\n` +
      `🔴 English\n` +
      `🟡 American\n` +
      `🟢 Other`)
    .setColor([177, 210, 240])
    .setFooter(`React below to claim a role!`)
  message.channel.send(commandEmbed)
  message.delete();
}