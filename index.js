const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	disableMentions: 'everyone'
});

require('dotenv').config();
client.login(process.env.token);
if (process.argv[2] && process.argv[2] == '--guild-only') console.log('[' + require('chalk').blue('INFO') + '] Starting up in dev mode');

require('./events/client/database/connection')();
require('./bot')(client);
require('./server/main')(client);