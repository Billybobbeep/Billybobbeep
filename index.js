const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	disableMentions: 'everyone'
});

/**
 * Get the flags used when executing the command
 * @returns {Object} List of flags
 */
function getFlags() {
	let args = [];
	(process.argv).forEach(arg => {
		if (arg.startsWith('--'))
			args.push(arg.split('--')[1].toLowerCase());
	});
	return args;
}

require('dotenv').config();
client.login(process.env.token);
if (getFlags().includes('guild-only') || getFlags().includes('dev-mode')) {
	console.log('[' + require('chalk').blue('INFO') + '] Starting up in dev mode');
	require('./utils/cache').dev.set(true);
}

require('./events/client/database/connection')();
require('./bot')(client);
require('./server/main')(client);