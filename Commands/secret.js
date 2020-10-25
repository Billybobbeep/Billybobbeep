const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async (client, msg, args, prefix, message) => {
  let secretMessage = args.join(" ");
  if (message.content.includes('||')) return message.channel.send('You cannot include `||` in your message.');
  if (message.content.toLowerCase().includes('/spoiler')) return message.chanel.send('You cannot include `/spoiler` in your message.');
  if (!args[0]) return message.channel.send('You must specify a message to send.');
  message.channel.send(`||${secretMessage}||`);
  message.delete();
}