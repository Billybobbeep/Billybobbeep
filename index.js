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
require('./events/client/database/connection')();
require('./bot')(client);
require('./server/main')(client);