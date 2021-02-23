const discordAuth = require('disco-oauth');
const client = new discordAuth('731498842813366304', 'PQ8T2ybPhlgEvB9ewHFpgfQGXTUx8exw');
client.setRedirect('https://billybobbeep-1.tyler2p.repl.co/auth');
client.setScopes(['identify', 'guilds']);

module.exports = client;