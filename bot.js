module.exports = async() => {
	'use strict';
	// [Varibles] //
	const Discord = require('discord.js');
	const client = new Discord.Client();
	const configFile = require('./config.json');
	let prefix = configFile.prefix;
	const embed = new Discord.MessageEmbed()
	
	/////////////////////////////
	//////Exporting Modules//////
	/////////////////////////////
	
	module.exports.data = function(callback) {
	  var totalNum = client.guilds.cache.get(configFile.ServerId).members.cache.array();
	  var totalOnlineNum = client.guilds.cache.get(configFile.ServerId).members.cache.filter(m => m.presence.status != 'offline').array();
	  var totalBotNum = client.guilds.cache.get(configFile.ServerId).members.cache.filter(m => m.user.bot);
	  setTimeout(function() {
		var jsonArr = {
		  "TMembers": totalNum.length,
		  "TOnline": totalOnlineNum.length,
		  "TBots" : totalBotNum.size,
		  "TMembers2" : totalNum,
		  "TOnline2" : totalOnlineNum,
		  "TBots2" : totalBotNum.array()
		}
		callback(jsonArr);
	  }, 30);
	}
	
	const server125 = require('./server.js');
	server125(client);
	
	
	client.once('ready', async () => {
		const serverStatsFile = require('./MainServer/serverstats.js');
		serverStatsFile(client);

		const typing = require('./MainServer/typing/main.js')
		typing(client)

		const antiSpam = require('./MainServer/antiSpam/antiSpam.js');
		antiSpam(client)
	
		const mentionsHandle = require('./MainServer/mentions.js');
		mentionsHandle(client);
	
		const guildManager = require('./MainServer/guildManager.js');
		guildManager(client);
	
		const deleteMessages = require('./MainServer/deleteMessages.js');
		deleteMessages(client);

		const talk2billy = require('./MainServer/talk2billy/main.js')
		talk2billy(client)
	try {
		const editMessages = require('./MainServer/editMessage.js');
		editMessages(client);
	} catch(e) {
	  console.log(e)
	}
		const reactionRole1 = require('./MainServer/reactionRoles/main.js');
		reactionRole1();
	
		//Display activities in the correct order
		let activities = [`${prefix}help`, `Version 2.0 👀`],
			i = 0;
		setInterval(() => {
			client.user.setActivity(`${activities[i++ % activities.length]}`, {
				type: 'LISTENING'
			});
		}, 10000);
	
	let guild = client.guilds.cache.get(configFile.ServerId);
	  var numberOfOnline;
	  let userOnline = guild.channels.cache.find(channel => channel.id === configFile.OnlineVoiceId);
	  setInterval(async function() {
		guild.members.fetch();
		numberOfOnline = guild.members.cache.filter(member => member.presence.status == 'online').array().length;
		if (numberOfOnline != userOnline.name.slice(14)) {
		  userOnline.edit({ name: "➳𝓞𝓷𝓵𝓲𝓷𝓮 𝓤𝓼𝓮𝓻𝓼: " + numberOfOnline });
		}
	  }, 50000);
	});
	
	client.on('message', async message => {
		if (message.channel === configFile.LoggingChannel) return;
		if (message.author.bot) return;
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
			msg.startsWith(prefix + 'c') ||
			message.content.toLowerCase() == prefix + 'joins' ||
			message.content.toLowerCase() == prefix + 'leaderboard' ||
			message.content.toLowerCase() == prefix + 'leaves' ||
			message.content.toLowerCase() == prefix + 'info' ||
			message.content.toLowerCase() == prefix + 'image' ||
			message.content.toLowerCase() == prefix + 'help' ||
			message.content.toLowerCase() == prefix + 'daily' ||
			message.content.toLowerCase() == prefix + 'work' ||
			message.content.toLowerCase() == prefix + 'startevent' ||
			message.content.toLowerCase() == prefix + 'shutdown' ||
			message.content.toLowerCase() == prefix + 'fonts' ||
			msg.startsWith(prefix + 'afk') ||
			msg.startsWith(prefix + 'back') ||
			msg.startsWith(prefix + 'whois')
			) return;
			const commandFile = require(`./Commands/${command}.js`);
			commandFile(client, msg, args, prefix, message);
		} catch (err) {
			if (configFile.SendLogs === true) {
		  if (message.channel.type === 'dm') return;
		  let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
		  embed.setTitle(`Command Error`)
		  embed.setDescription(
			`**Channel:** ${message.channel}\n` +
			`**Command:** ${command}\n\n` +
			`**Error Code:**\n` + err
		  )
		  embed.setColor(`#fcb69f`)
				LoggingChannel.send(embed);
			} else {
				return;
			}
		}
	});
	client.on('message', async message => {
		const AfkFile = require('./MainServer/Afk/AfkHandle.js');
		AfkFile(client, message);
		const DmLogger = require('./MainServer/dmRecieving.js');
		DmLogger(client, message, Discord);


		try {
			const reactMessages = require(`./MainServer/deletingMessages.js`);
			reactMessages(message, Discord, client);

			if (
				message.channel.id === configFile.PollChannel ||
				message.channel.id === configFile.MemesChannel
			) {
				const reactMessages = require(`./MainServer/reactions.js`);
				reactMessages(message);
			}
		} catch (err) {
				if (configFile.SendLogs === true) {
				let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
				embed.setTitle(`Command Error`)
				embed.setDescription(
				`**Channel:** ${message.channel}\n` +
				`**Command:** ${command}\n\n` +
				`**Error Code:**\n` + err
				)
				embed.setColor(`#fcb69f`)
					LoggingChannel.send(embed);
				} else {
					return;
				}
		}


		if (message.channel === configFile.LoggingChannel) return;
		if (message.author.bot) return; //Ensures bots cannot access command
		if (!message.content.startsWith(prefix)) return;
		let args = message.content
			.slice(prefix.length)
			.trim()
			.split(/ +/g);
		let msg = message.content.toLowerCase();
	try {
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
			commandFile(msg, args, prefix, message, client);
		}
		if (message.content.toLowerCase() == prefix + 'pronounrole') {
			const commandFile = require(`./MainServer/reactionRoles/pronoun.js`);
			commandFile(message);
		}
		if (message.content.toLowerCase() == prefix + 'countryrole') {
			const commandFile = require(`./MainServer/reactionRoles/country.js`);
			commandFile(message);
		}
		if (message.content.toLowerCase() == prefix + 'info') {
			const commandFile = require(`./Embeds/info.js`);
			commandFile(client, msg, args, prefix, message);
		}
	  if (message.content.toLowerCase() == prefix + 'help') {
			const commandFile = require(`./Embeds/help.js`);
			commandFile(client, msg, args, prefix, message);
		}
	  if (message.content.toLowerCase() == prefix + 'image') {
			const commandFile = require(`./Commands/image.js`);
			commandFile.run(client, msg, args, prefix, message);
		}
	  if (message.content.toLowerCase() == prefix + 'credit' || 
	  		message.content.toLowerCase() == prefix + 'credits') {
			const commandFile = require(`./Embeds/credit.js`);
			commandFile(client, msg, args, prefix, message);
		}
	  if (message.content.toLowerCase() == prefix + 'daily') {
			const commandFile = require(`./Commands/Economy/daily.js`);
			commandFile(prefix, message);
		}
	  if (message.content.toLowerCase() == prefix + 'work') {
			const commandFile = require(`./Commands/Economy/work.js`);
			commandFile(prefix, message);
		}
	if (message.content.toLowerCase() == prefix + 'fonts') {
		const commandFile = require(`./Commands/font.js`);
		commandFile(client, msg, args, prefix, message);
	}
	  if (message.content.toLowerCase() == prefix + 'shutdown') {
		  if (message.author.discriminator === '2793') {
			await message.channel.send('Shutting down ' + client.user.username);
			return client.destroy()
		  } else {
			  return message.channel.send('You do not have the correct premissions for this command')
		  }
	  }
	} catch (err) {
			if (configFile.SendLogs === true) {
		  if (message.channel.type === 'dm') return;
		  let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
		  embed.setTitle(`Command Error`)
		  embed.setDescription(
			`**Channel:** ${message.channel}\n` +
			`**Command:** ${command}\n\n` +
			`**Error Code:**\n` + err
		  )
		  embed.setColor(`#fcb69f`)
				LoggingChannel.send(embed);
			} else {
				return;
			}
		}
	});
	
	// Welcomes new members
	client.on('guildMemberAdd', member => {
		try {
			const NewMember = require(`./MainServer/newMember.js`);
			NewMember(member);
		} catch (err) {
			if (configFile.SendLogs === true) {
		  let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
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
		  LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
				LoggingChannel.send(
					`**Error whilst dismissing a member.**\n **Error:** ${err}\n **Member:** ${member}`
				);
			} else {
				return;
			}
		}
	});
	
	client.login();
}