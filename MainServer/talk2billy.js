const db = require('quick.db');
const fetch = require('isomorphic-fetch');

module.exports = async (message) => {
  if (!message.guild) return;
  let talk2billy = db.get(message.guild.id + '.talk2billy')
  if (talk2billy) {
    if (message.channel.id !== talk2billy) return;
    const response = await fetch('https://some-random-api.ml/chatbot?message=' + args[0].replace(' ', '%20'));
    const text = await response.text();
    message.channel.send(text.replace('response', '').replace(':', '').replace('{', '').replace('}', '').replace('??', '?').replace('???', '?').replace('""', '').replace('"', '').replace('"', ''));
  }
}