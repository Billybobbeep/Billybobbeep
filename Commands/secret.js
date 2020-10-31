const Discord = require(`discord.js`);
const configFile = require('../structure/config.json');

module.exports = {
  name: 'secret',
  description: 'Repeat what you just said in a spoiler format.',
  guildOnly: true,
  execute (message, prefix, client) {
    let secretMessage = args.join(" ");
    if (message.content.includes('||')) return message.channel.send('You cannot include `||` in your message.');
    if (message.content.toLowerCase().includes('/spoiler')) return message.chanel.send('You cannot include `/spoiler` in your message.');
    if (!args[0]) return message.channel.send('You must specify a message to send.');
    message.channel.send(`||${secretMessage}||`);
    message.delete();
  }
}