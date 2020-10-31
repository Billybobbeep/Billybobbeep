//https://billybobbeep.tyler2p.repl.co/

const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

client.login('NzMxNDk4ODQyODEzMzY2MzA0.Xwm7Yg.0vdmC5RnAjZ4kB6abUdZkpI8Je0');

const mainFile = require(`./bot.js`);
mainFile(client)

const server = require('./server.js');
server(client);

require('./data/database/index.js');

module.exports.restart = (message) => {
    if (message.author.discriminator === '2793') {
        message.channel.send('restarting ' + client.user.username)
        .then(()=> client.destroy())
        .then(()=> client.login('NzMxNDk4ODQyODEzMzY2MzA0.Xwm7Yg.0vdmC5RnAjZ4kB6abUdZkpI8Je0'));
    return;
    } else {
        return message.channel.send('You do not have the correct premissions for this command');
    }
}