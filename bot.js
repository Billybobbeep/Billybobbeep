module.exports = async() => {
// [Varibles] //
const Discord = require('discord.js');
const client = new Discord.Client();
const Version = require('./package.json');
const configFile = require('./config.json');
let prefix = configFile.prefix;
let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);

// used to store playlists for different guilds
const guilds = {};
/////////////////////////////
//////Exporting Modules//////
/////////////////////////////

client.once('ready', async () => {
	const serverStatsFile = require('./MainServer/serverstats.js');
	serverStatsFile(client);

	const guildManager = require('./MainServer/guildManager.js');
	guildManager(client);

	const serverStats2 = require('./UDecide/serverstats.js');
	serverStats2(client);

	const deleteMessages = require('./MainServer/deleteMessages.js');
	deleteMessages(client);

	const editMessages = require('./MainServer/editMessage.js');
	editMessages(client);

	const reactionRole1 = require('./MainServer/reactionRoles/main.js');
	reactionRole1();

  const levelSystem = require('./MainServer/levelSys/main.js');
	levelSystem(client);

	//Display activities in the correct order
	let activities = [`${prefix}help`, `Work in progress.`],
		i = 0;
	setInterval(() => {
		client.user.setActivity(`${activities[i++ % activities.length]}`, {
			type: 'LISTENING'
		});
	}, 10000);

	setInterval(() => {
		const autoFeed = require(`./Commands/automaticFeed/main.js`);
		autoFeed(client);
	}, 86400000);
});

client.on('message', async message => {
	if (message.channel === configFile.LoggingChannel) return;
	if (message.author.bot) return; //Ensures bots cannot access command
	if (!message.content.startsWith(prefix)) return;

	let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	let msg = message.content.toLowerCase();
	let command = args.shift().toLowerCase();

	try {
		if (
			message.content.toLowerCase() == prefix + 'ping' ||
			message.content.toLowerCase() == prefix + 'members' ||
			msg.startsWith(prefix + 'cmds') ||
			message.content.toLowerCase() == prefix + 'joins' ||
      message.content.toLowerCase() == prefix + 'leaderboard' ||
			message.content.toLowerCase() == prefix + 'leaves'
		)
			return;
		const commandFile = require(`./Commands/${command}.js`);
		commandFile(client, msg, args, prefix, message);
	} catch (err) {
		if (configFile.SendLogs === true) {
			LoggingChannel.send(
				`There was an error in ${
					message.channel
				}.\n **Error:** ${err}\n **Command:** ${command}`
			);
		} else {
			return;
		}
	}
});
client.on('message', async message => {
	const DmLogger = require('./MainServer/dmRecieving.js');
	DmLogger(client, message, Discord);
	if (message.channel === configFile.LoggingChannel) return;
	if (message.author.bot) return; //Ensures bots cannot access command
	if (!message.content.startsWith(prefix)) return;
	let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	let msg = message.content.toLowerCase();

	if (message.content.toLowerCase() == prefix + 'ping') {
		const commandFile = require(`./Commands/pong.js`);
		commandFile(client, msg, args, prefix, message);
	}
	if (message.content.toLowerCase() == prefix + 'members') {
		const commandFile = require(`./Commands/members.js`);
		commandFile(client, msg, args, prefix, message);
	}
	if (
		msg.startsWith(prefix + 'cmds') ||
		msg.startsWith(prefix + 'commands') ||
		msg.startsWith(prefix + 'c')
	) {
		const commandFile = require(`./Embeds/Commands/main.js`);
		commandFile(msg, args, prefix, message);
	}
	if (message.content.toLowerCase() == prefix + 'pronounrole') {
		const commandFile = require(`./MainServer/reactionRoles/pronoun.js`);
		commandFile(message);
	}
	if (message.content.toLowerCase() == prefix + 'countryrole') {
		const commandFile = require(`./MainServer/reactionRoles/country.js`);
		commandFile(message);
	}
	if (message.content.toLowerCase() == prefix + 'joins') {
		const commandFile = require(`./Commands/musicCommands/24hMusic/join.js`);
		commandFile(message, client);
	}
	if (message.content.toLowerCase() == prefix + 'leaves') {
		const commandFile = require(`./Commands/musicCommands/24hMusic/leave.js`);
		commandFile(message, client);
	}
});

//Monitoring

client.on('message', message => {
	//let BotStatusChannel = client.channels.cache.get(configFile.BotStatusChannel);
	const reactMessages = require(`./MainServer/deletingMessages.js`);
	reactMessages(message);

	if (
		message.channel.id === configFile.PollChannel ||
		message.channel.id === configFile.MemesChannel ||
		message.channel.id === configFile.JokesChannel
	) {
		const reactMessages = require(`./MainServer/reactions.js`);
		reactMessages(message);
	}
	if (message.channel.id === configFile.CountingChannel) {
		const countingFile = require('./MainServer/countingChannel.js');
		countingFile(message, client);
	}
});

// Welcomes new members
client.on('guildMemberAdd', member => {
	try {
		const NewMember = require(`./MainServer/newMember.js`);
		NewMember(member);
	} catch (err) {
		if (configFile.SendLogs === true) {
			LoggingChannel.send(
				`Error whilst welcoming a new member.\n **Error:** ${err}\n **Member:** ${member}`
			);
		} else {
			return;
		}
	}
});

//Logs members leaving
client.on('guildMemberRemove', member => {
	try {
		const NewMember = require(`./MainServer/removingMember.js`);
		NewMember(member);
	} catch {
		if (configFile.SendLogs === true) {
			LoggingChannel.send(
				`Error whilst dismissing a member.\n **Error:** ${err}\n **Member:** ${member}`
			);
		} else {
			return;
		}
	}
});

client.login(process.env.TOKEN);
}