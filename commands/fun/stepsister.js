const Discord = require('discord.js');
const configFile = require('../../structure/config.json');

module.exports = {
  name: 'stepsister',
  description: ';)',
  guildOnly: true,
  catagory: 'general',
  explicit: true,
  execute (message, prefix, client) {
    const attachment = new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/731508540761440336/732301974543794297/8296f82029ae59b698060544deb1531a.png")
    message.channel.send(attachment);
  }
}