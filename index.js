const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
	disableMentions: 'everyone',
	intents: [
		Discord.Intents.FLAGS.GUILDS,
		Discord.Intents.FLAGS.GUILD_MESSAGES,
		Discord.Intents.FLAGS.GUILD_PRESENCES,
		Discord.Intents.FLAGS.GUILD_MEMBERS,
		Discord.Intents.FLAGS.GUILD_INVITES,
		Discord.Intents.FLAGS.GUILD_BANS,
		Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
		Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
		Discord.Intents.FLAGS.GUILD_VOICE_STATES,
		Discord.Intents.FLAGS.DIRECT_MESSAGES,
	]
});

/**
 * Get the flags used when executing the command
 * @returns List of flags
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
require('./server/server')(client);