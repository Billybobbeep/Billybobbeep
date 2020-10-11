const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async (client, msg, args, prefix, message) => {
  let secretMessage = args.join(" ");
  message.channel.send(`||${secretMessage}||`);
  message.delete();
}