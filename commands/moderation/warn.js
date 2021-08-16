module.exports = {
	name: 'warn',
	description: 'Warn a user',
	guildOnly: true,
	catagory: 'moderation',
	usage: 'warn [user] [reason]',
	slashInfo: { enabled: true, public: true, options: { mod: true } },
	options: [{ name: 'user', description: 'The user you\'d like to warn', type: 6, required: true }, { name: 'reason', description: 'Warning reason', type: 3, required: false }],
	/**
	 * @param {object} message The message that was sent
	 * @param {string} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	async execute(message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../../events/client/database/models/guilds.js');
		const guildMemberData = require('../../events/client/database/models/guildMembers.js');
		const logging = require('../../utils/functions').logging;
		let guildResult = await guildData.findOne({ guildId: message.guild?.id || message.guild_id });

		async function warnCmd(slash) {
			let args = slash ? message.data.options : message.content.slice(prefix.length).trim().split(/ +/g);
			let user = slash ? args[0].value : (message.mentions.users.first() || message.guild.members.cache.get(args[1]));
			let channel = slash ? {
				send(msg) {
					require('../../utils/functions').slashCommands.reply(message, client, msg)
				},
				reply(user, msg) {
					require('../../utils/functions').slashCommands.reply(message, client, `<@!${user.id}>, ${msg}`)
				}
			} : message.channel;
			let guild = await client.guilds.fetch(message.guild?.id || message.guild_id);
			if (typeof user == 'undefined')
				return channel.send('You must mention a user to warn');
			if (!isNaN(user) && !user.id) user = await client.users.fetch(user);
			if (!user.id && user.user) user = user.user;

			if (!slash && user.id == message.author.id || slash	&& user.id == message.member.user.id) return channel.send('You cannot warn yourself');
			if (user.bot) return channel.send('Bots cannot be warned');

			let member;
			let memberResult = await guildMemberData.findOne({ guildId: guild.id, memberId: user.id });
			if (!memberResult)
				memberResult = new guildMemberData({ memberId: user.id, guildId: guild.id });

			if (typeof user == 'string') {
				member = await guild.members.fetch(user);
				user = await client.users.fetch(user);
			} else if (typeof user == 'object') {
				if (!user.id || user.user) user = user.user;
				member = await guild.members.fetch(user.id);
			} else
				return channel.send('You must mention a user to warn');

			if (!member) return channel.send(user.username + ' is not in this server');
			if (member && member.user.bot) return channel.send('You cannot warn bots');
			if (typeof member.roles == 'object' && (member.roles).length > 0) {
				if (
					slash && member.roles.highest.rawPosition <= client.guilds.cache.get(message.guild_id).members.cache.get(message.member.user.id).roles.highest.rawPosition ||
					!slash && member.roles.highest.rawPosition <= message.guild.members.cache.get(message.author.id).roles.highest.rawPosition
				) return channel.send('You cannot warn ' + user.username);
			}

			let reason = slash ? (args[1] ? args[1].value : 'No reason was provided'): args.splice(2).join(' ');
			if (!reason || ['', ' '].includes(reason)) reason = 'No reason provided';

			memberResult.warnReasons.length > 0 ?
				(memberResult.warnReasons).push({ reason: reason, moderator: (message.author ? message.author : message.member.user) }) :
				memberResult.warnReasons = [{ reason: reason, moderator: (message.author ? message.author : message.member.user) }];

			let log = new Discord.MessageEmbed()
				.setTimestamp()
				.setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1')
				.setTitle('User Warned')
				.addField('User:', user.tag, true)
				.addField('By:', (message.author ? message.author.tag : message.member.user.username + '#' + message.member.user.discriminator), true)
				.addField('Reason:', reason)
				.addField('Total Warnings', `${memberResult.warnReasons.length || 1}`, true)

			let log2 = new Discord.MessageEmbed()
				.setTimestamp()
				.setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1')
				.setTitle('You have been warned')
				.addField('Responsible Moderator:', (message.author ? message.author.tag: message.member.user.username + '#' + message.member.user.discriminator), true)
				.addField('Reason:', reason)
				.addField('Guild:', guild.name);
			user.send(log2).catch(() => log.setFooter('DM could not be sent'));
			channel.send(`<@!${user.id}> has been warned by <@!${message.author ? message.author.id : message.member.user.id}>`);
			logging(log, (message.guild ? message : message.guild_id), client);

			memberResult.save();
		}

		let debounce = false;

		if (client.guilds.cache.get(message.guild?.id || message.guild_id).members.cache.get(message.author ? message.author.id : message.member.user.id).permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) ||
			client.guilds.cache.get(message.guild?.id || message.guild_id).members.cache.get(message.author ? message.author.id : message.member.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
			warnCmd(message.guild && message.author ? false : true);
			debounce = true;
		} else if (guildResult.preferences && guildResult.preferences.modRole) {
			if (message.member.roles.cache.find(role => role.id === guildResult.preferences.modRole)) {
				warnCmd(message.guild && message.author ? false : true);
				debounce = true;
			}
			if (debounce === false)
				channel.send('You do not have the permissions to use this command');
		}
	}
}