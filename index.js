//https://billybobbeep.tyler2p.repl.co/

const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  disableMentions: 'everyone'
});

client.login(process.env.token);

require(`./bot.js`)(client);
require('./server.js')(client);

module.exports.restart = (message) => {
    if (message.author.discriminator === '2793') {
        message.channel.send('restarting ' + client.user.username)
        .then(()=> client.destroy())
        .then(()=> client.login(process.env.token));
    } else {
        return message.channel.send('You do not have the correct premissions for this command');
    }
}