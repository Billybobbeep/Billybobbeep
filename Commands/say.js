const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {    
    let wantToSay = args.join(" ");
    if (!args[0]) return message.channel.send('You must specify a message to send.');
    message.channel.send(wantToSay, { disableMentions: 'everyone' });
    message.delete();
}