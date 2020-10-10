const db = require('quick.db');
const configFile = require('../../config.json')
module.exports = async (client, message) => {
  message.channel.send('test')
}