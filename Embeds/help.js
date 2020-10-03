const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
  const helpEmbed = new Discord.MessageEmbed()
  .setTitle("Billybobbeep | Help")
  .setDescription(`Thank you for using ${client.user.username}!\n` +
  "This bot was created and scripted by **Spoink#2793**\n" +
  "To view all credits please enter the command `~credits`\n" +
  "\n" +
  "Below are some commands to get you started:\n" +
  `${prefix}cmds\n` +
  "*Prompts you to view the commands.*\n" +
  `${prefix}info\n` +
  "*Shows info about the bot.*\n" +
  `${prefix}credits\n` +
  "*Provides you with Billybobbeep's development credits*\n" +
  `${prefix}help\n` +
  "*Shows a quick briefing.*")
  .setColor("7aa0f6")
  .setFooter(`Requested by: ${message.author.tag}`)
  .setTimestamp()
  message.channel.send(helpEmbed)
}