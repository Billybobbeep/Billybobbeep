const guildData = require('../../events/client/database/models/guilds.js');
const { Permissions } = require('discord.js');

module.exports = {
	name: 'nickname',
	description: 'Change a users nickname',
	alias: ['nick'],
	guildOnly: true,
	catagory: 'moderation',
	usage: 'nickname [user] [nickname]',
	slashInfo: { enabled: true, public: true },
	options: [{ name: 'user', description: 'The user to change the nickname of', type: 6, required: true }, { name: 'nickname', description: 'The new nickname', type: 3, required: false }],
	/**
	 * @param {object} message The message that was sent
	 * @param {string} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	execute(message, prefix, client) {
		async function nicknameCmd() {
			let slash = message.data && !message.content ? true : false;
			let args = slash ? message.data.options : message.content.slice(prefix.length).trim().split(/ +/g);
			let user;

			if (!slash) user = message.mentions.users.first() || message.guild.members.cache.get(args[1]).user;
			else args[0] && args[0].value ? user = client.guilds.cache.get(message.guild_id).members.cache.get(args[0].value).user : user = message.member.user;
			if (!user) return slash ? require('../../utils/functions').slashCommands.reply(message, client, 'You must provide a valid user') : message.channel.send('You must provide a valid user');

			let nick;
			if (slash && args[1] && args[1].name !== 'user') nick = args[1].value
			else if (slash) nick = undefined;
			else nick = args.slice(2).join(' ');
			let member = slash ? client.guilds.cache.get(message.guild_id).members.cache.get(args[0].value) : message.guild.members.cache.get(user.id);
			if (!nick) {
				try {
					await member.setNickname('', `${slash ? `${message.member.user.username + '#' + message.member.user.discriminator} via slash command` : `${message.author.tag} via command`}`);
					slash ? require('../../utils/functions').slashCommands.reply(message, client, 'Removed **' + user.tag + '\'s** nickname') : message.channel.send('Removed **' + user.tag + '\'s** nickname');
				} catch {
					slash ? require('../../utils/functions').slashCommands.reply(message, client, 'I do not have the permissions to change this users nickname') : message.channel.send('I do not have the permissions to change this users nickname');
				}
			} else {
				try {
					await member.setNickname(nick, `${slash ? `${message.member.user.username + '#' + message.member.user.discriminator} via slash command` : `${message.author.tag} via command`}`);
					slash ? require('../../utils/functions').slashCommands.reply(message, client, `Changed **${user.tag}'s** nickname to ${nick}`) : message.channel.send(`Changed **${user.tag}'s** nickname to ${nick}`);
				} catch {
					slash ? require('../../utils/functions').slashCommands.reply(message, client, 'I do not have the permissions to change this users nickname') : message.channel.send('I do not have the permissions to change this users nickname');
				}
			}
		}

		let debounce = false;
		if (!message.data) {
			guildData.findOne({ guildId: message.guild.id }).then(result => {
				if (message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) || message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					nicknameCmd()
					debounce = true;
				} else if (result.preferences.modRole) {
					if (message.member.roles.cache.find(role => role.id == result.preferences.modRole)) {
						nicknameCmd()
						debounce = true;
					}
				}
				if (message.mentions.users.first() && message.mentions.users.first().id == message.author.id) {
					debounce = true;
					nicknameCmd();
				}
				if (!debounce)
					message.channel.send('You can only use this command on yourself unless you are a server moderator');
			});
		} else {
			guildData.findOne({ guildId: message.guild_id }).then(result => {
				if ((client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id)).permissions.has(Permissions.FLAGS.MANAGE_GUILD) || (client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id)).permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
					nicknameCmd();
					debounce = true;
				} else if (result.preferences.modRole) {
					if (message.member.roles.cache.find(role => role.id == result.preferences.modRole)) {
						nicknameCmd();
						debounce = true;
					}
				}
				if (!message.data.options[1]) message.data.options[1] = { value: message.member.user.id, name: 'user', type: 6 }
				if (!debounce && message.data.options[1].value !== message.member.user.id)
					require('../../utils/functions').slashCommands.reply(message, client, 'You can only use this command on yourself unless you are a server moderator');
				else
					nicknameCmd();
			});
		}
	}
}