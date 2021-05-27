const Discord = require('discord.js');
const configFile = require('../../utils/config.json');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = {
	name: 'nickname',
	description: 'Change a users nickname',
	alias: ['nick'],
	guildOnly: true,
	catagory: 'moderation',
	usage: 'nickname [user] [nickname]',
	execute(message, prefix, client) {
		async function nicknameCmd() {
			let args = message.content.slice(prefix.length).trim().split(/ +/g);
			let user = message.mentions.users.first() || message.guild.members.fetch(args[1]);
			if (!user) return message.channel.send('Please mention a user');

			let nick = args.slice(2).join(' ');
			let member = message.guild.members.fetch(user.id);
			if (!nick) {
				try {
					await member.setNickname('');
					return message.channel.send('Removed **' + user.tag + '\'s** nickname');
				} catch {
					message.channel.send('I do not have the permissions to change this users nickname');
				}
			}
			if (user.tag === undefined)
				user = user.user
			try {
				await member.setNickname(nick);
				message.channel.send(`Changed **${user.tag}'s** nickname to ${nick}`);
			} catch {
				message.channel.send('I do not have the permissions to change this users nickname');
			}
		}

		async function nicknameSlashCommand() {
			let args = message.data.options;
			let user;
			args[1] && args[1].value ? user = client.guilds.fetch(message.guild_id).members.fetch(args[1].value).user : user = message.member.user;
			if (!user) return require('../../utils/functions').slashCommands.reply(message, client, 'Please provide a user');

			let nick = args[0].value
			let member = message.guild.members.fetch(user.id);
			if (!nick) {
				try {
					await member.setNickname('');
					return require('../../utils/functions').slashCommands.reply(message, client, 'Removed **' + user.tag + '\'s** nickname');
				} catch {
					require('../../utils/functions').slashCommands.reply(message, client, 'I do not have the permissions to change this users nickname');
				}
			}
			if (user.tag == undefined)
				user = user.user
			try {
				await member.setNickname(nick);
				require('../../utils/functions').slashCommands.reply(message, client, `Changed **${user.tag}'s** nickname to ${nick}`);
			} catch {
				require('../../utils/functions').slashCommands.reply(message, client, 'I do not have the permissions to change this users nickname');
			}
		}

		let debounce = false;
		if (!message.data) {
			guildData.findOne({ guildId: message.guild.id }).then(result => {
				if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR')) {
					nicknameCmd()
					debounce = true;
				} else if (result.modRole) {
					if (message.member.roles.cache.find(role => role.id == result.modRole)) {
						nicknameCmd()
						debounce = true;
					}
				}
				if (debounce === false)
					message.channel.send('You do not have the permissions to use this command');
			});
		} else {
			guildData.findOne({ guildId: message.guild_id }).then(result => {
				if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR')) {
					nicknameSlashCommand();
					debounce = true;
				} else if (result.modRole) {
					if (message.member.roles.cache.find(role => role.id == result.modRole)) {
						nicknameSlashCommand();
						debounce = true;
					}
				}
				if (!message.data.options[1]) message.data.options[1] = { value: message.member.user.id, name: 'user', type: 6 }
				if (debounce == false && message.data.options[1].value !== message.member.user.id)
					require('../../utils/functions').slashCommands.reply(message, client, 'You do not have the permissions to use this command');
				else
					nicknameSlashCommand()
			});
		}
	}
}