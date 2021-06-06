module.exports = {
	name: 'warn',
	description: 'Warn a user',
	guildOnly: true,
	catagory: 'moderation',
	usage: 'warn [user] [reason]',
	slashInfo: { enabled: true, public: false, options: { mod: true } },
	options: [{ name: 'user', description: 'The user you\'d like to warn', type: 6, required: true }, { name: 'reason', description: 'Warning reason', type: 3, required: false }],
	/**
	 * @param {object} message The message that was sent
	 * @param {string} prefix The servers prefix
	 * @param {objects} client The bots client
	 */
	async execute(message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../../events/client/database/models/guilds.js');
		const guildMemberData = require('../../events/client/database/models/guildMembers.js');
		const logging = require('../../utils/functions').logging;
		let guildResult = await guildData.findOne({ guildId: (message.guild_id || message.guild.id) });

		async function warnCmd(slash) {
			let args = slash ? message.data.options : message.content.slice(prefix.length).trim().split(/ +/g);
			let user = slash ? args[0].value : (message.mentions.users.first() || message.guild.members.cache.get(args[1]));
			let channel = slash ? {
				send(...msg) {
					require('../../utils/functions').slashCommands.reply(message, client, msg)
				},
				reply(user, ...msg) {
					require('../../utils/functions').slashCommands.reply(message, client, `<@!${user.id}>, ${msg}`)
				}
			} : channel;
			let guild = await client.guilds.fetch(message.guild ? message.guild.id : message.guild_id);
			if (!user) return channel.send('Please specify a user to warn');
			if (!user.id || !user.tag) user = user.user;

			if (user.id === message.author.id) return channel.send('You cannot warn yourself');
			if (user.bot) return channel.send('Bots cannot be warned');
			if (member.roles.highest <= message.member.roles.highest) return channel.send('You cannot warn' + user.username);

			let member;
			let memberResult = await guildMemberData.findOne({ guildId: guild.id, memberId: user.id });

			if (typeof user == 'string') {
				member = await guild.members.fetch(user);
				user = await client.users.fetch(user);
			} else if (typeof user == 'object') {
				if (!user.id || user.user) user = user.user;
				member = await guild.members.fetch(user.id);
			} else
				return channel.send('Please mention a user to warn');

			if (member && member.user.bot) return channel.send('You cannot warn bots');
			if (!member) return message.reply(user.username + ' is not in this server');

			let reason = slash ? args[1].value : args.splice(2).join(' ');
			if (!reason) return reason = 'No reason provided';

			let reasons = []
			if (typeof memberResult.warnReasons === 'object') {
				for (var i = 0; i < (memberResult.warnReasons).length; i++) {
					if (typeof memberResult.warnReasons[i] == 'object')
						reasons.push(memberResult.warnReasons[i]);
				}
			}

			reasons.push({ reason: reason, moderator: (message.author ? message.author : client.users.cache.get(message.member.user)) });
			memberResult.warnReasons = reasons;

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
				.addField('Responsible Moderator:', message.author.tag, true)
				.addField('Reason:', reason)
				.addField('Guild:', guild.name);
			user.send(log2).catch(() => log.setFooter('DM could not be sent'));
			channel.send(`<@${user.id}> has been warned by <@!${message.author ? message.author.id : message.member.user.id}>`);
			logging(log, (message.guild ? message : message.guild_id), client);

			memberResult.warnReasons.length = memberResult.warnReasons.length ? memberResult.warnReasons.length + 1 : 1;
			memberResult.save();
		}

		let debounce = false;

		if (client.guilds.cache.get(message.guild_id || message.guild.id).members.cache.get(message.author ? message.author.id : message.member.user.id).permissions.has('MANAGE_MESSAGES') ||
			client.guilds.cache.get(message.guild_id || message.guild.id).members.cache.get(message.author ? message.author.id : message.member.user.id).permissions.has('ADMINISTRATOR')) {
			warnCmd()
			debounce = true;
		} else if (guildResult.preferences.modRole) {
			if (message.member.roles.cache.find(role => role.id === guildResult.preferences.modRole)) {
				warnCmd()
				debounce = true;
			}
			if (debounce === false)
				channel.send('You do not have the permissions to use this command');
		}
	}
}