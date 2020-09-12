const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {    
    let wantToSay = message.content.substring(5);
    message.channel.send(wantToSay);
    message.delete();
}