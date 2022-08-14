const { Client, GatewayIntentBits } = require("discord.js");
const chalk = require("chalk");

const client = new Client({
  disableEveryone: true,
  fetchAllMembers: true,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildScheduledEvents
  ]
});

/**
 * Get the flags used when executing the command
 * @returns List of flags
 */
function getFlags() {
	let args = [];
	(process.argv).forEach(arg => {
		if (arg.startsWith("--"))
			args.push(arg.split("--")[1].toLowerCase());
	});
	return args;
}

// Get the environment variables
require("dotenv").config();
// Login to the bot
client.login(process.env.token);

// Check the flags
if (getFlags().includes("dev-mode") || getFlags().includes("dev")) {
	console.log("[" + chalk.blue("INFO") + "] Starting up in dev mode");
	require("./utils/cache").dev.changeState(true);
}

// Connect to the database
require("./database/connection")();
// Start the bot
require("./bot")(client);