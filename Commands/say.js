const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {    
    let wantToSay = args.join(" ");
    message.channel.send(wantToSay);
    message.delete();
}