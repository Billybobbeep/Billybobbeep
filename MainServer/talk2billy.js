const db = require('quick.db');
const fetch = require('isomorphic-fetch');
const Discord = require('discord.js');

module.exports = async (message) => {
  let args = message.content.split(/ +/g);
  if (!message.guild) return;
  if (message.author.bot) return;
  let talk2billy = db.get(message.guild.id + '.talk2billy');
  if (message.content.startsWith(db.get(message.guild.id + '.prefix'))) return;
  if (talk2billy) {
    if (message.channel.id !== talk2billy) return;
    if (message.attachments.size < 1) {
      const response = await fetch('https://some-random-api.ml/chatbot?message=' + args[0].replace(' ', '%20'));
      const text = await response.text();
      message.channel.send(text.replace('response', '').replace(':', '').replace('{', '').replace('}', '').replace('??', '?').replace('???', '?').replace('""', '').replace('"', '').replace('"', '').replace('error', ''));
    } else {
      var table = ['Whale', 'Racoon', 'Kangaroo', 'Koala', 'Birb', 'Fox', 'Panda', 'Cat', 'Dog']
      var res = Math.floor(Math.random() * table.length)
      const response = await fetch('https://some-random-api.ml/img/' + table[res].replace(' ', '%20'));
      const text = await response.text();
      text = message.channel.send(text.replace('link', '').replace(':', '').replace('{', '').replace('}', '').replace('??', '?').replace('???', '?').replace('""', '').replace('"', '').replace('"', '').replace('error', ''));
      if (text.startsWith('https://')) {
        const attachment = new Discord.MessageAttachment(text)
        message.channel.send(attachment)
      } else {
        message.channel.send(text)
      }
    }
  }
}