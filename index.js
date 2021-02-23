//https://billybobbeep.tyler2p.repl.co/

const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  disableMentions: 'everyone'
});

const dotenv = require('dotenv');
dotenv.config();
const token = process.env.token;

client.login(token);

//require(`./bot.js`)(client);
require('./events/client/database/connection');
require('./public/server/main')(client);

module.exports.restart = (message) => {
    if (message.author.discriminator === '2793') {
        message.channel.send('restarting ' + client.user.username)
        .then(()=> client.destroy())
        .then(()=> client.login(token));
    } else {
        return message.channel.send('You do not have the correct permissions for this command');
    }
}