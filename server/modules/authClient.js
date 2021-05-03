const discordAuth = require('disco-oauth');
const client = new discordAuth(process.env.clientId, process.env.clientSecret);
client.setRedirect('https://billybobbeep-1.tyler2p.repl.co/auth');
client.setScopes(['identify', 'guilds']);

module.exports = client;