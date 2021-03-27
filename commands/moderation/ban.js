module.exports = {
	name: 'ban',
	description: 'Ban a member',
	guildOnly: true,
	catagory: 'moderation',
	usage: 'ban [user] [reason]',
	execute (message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../../events/client/database/models/guilds.js');
		const embed = new Discord.MessageEmbed();
		const logging = require('../../utils/functions.js').logging;
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		function banCmd() {
			guildData.findOne({ guildId: message.guild.id }).then(result => {
				let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);

				let member = message.guild.member(user);
				let reason = args.slice(2).join(' ');
				let succ = true

				if (!user) return message.channel.send('Please specify a user to ban');
				if (user.id === message.author.id) return message.channel.send('You cannot ban yourself from the server');
				if (user.id === client.user.id) return message.channel.send('You cannot ban me');
				if (!reason) reason = 'No reason was provided';
				if (user.tag === undefined || user.id === undefined) user = user.user;

				let embed = new Discord.MessageEmbed();
				embed.setTitle('Member Banned');
				embed.setDescription(
					`**Member Tag:** ${user.tag}\n` +
					`**Member ID:** ${user.id}\n` +
					`**Reason:** ${reason}\n\n` +
					`**Moderator:** ${message.author}\n` +
					`**Moderator Tag:** ${message.author.tag}\n` +
					`**Moderator ID:** ${message.author.id}`
				);
				embed.setTimestamp();
				embed.setColor(result.embedColor);
				let log = new Discord.MessageEmbed();
				log.setTimestamp();
				log.setColor(result.embedColor);
				log.setTitle(`You have been banned`);
				log.addField(`Responsible Moderator:`, message.author.tag, true);
				log.addField(`Reason:`, reason);
				log.addField(`Guild:`, message.guild);
				user.send(log).catch(() => embed.setFooter('DM could not be sent'));

				reason = reason + ' - ' + user.tag.toString()
				member.ban({ days: 0, reason: reason })
				.then(() => {
					message.channel.send(`Successfully banned **${user.tag}**`);
				}).catch(() => {
					succ = false
					message.reply('I was unable to ban the member you provided');
				});
				if (succ) logging(embed, message, client);
			});
		}

		let debounce = false;

		guildData.findOne({ guildId: message.guild.id }).then(result => {
			if (message.member.hasPermission('BAN_MEMBERS') || message.member.hasPermission('ADMINISTRATOR')) {
				banCmd()
				debounce = true;
			} else if (result.modRole) {
				if (message.member.roles.cache.find(role => role.id === result.modsRole)) {
					if (result.modsCanBan) {
						if (message.guild.id === '733442092667502613') return;
						banCmd()
						debounce = true;
					}
				}
			}
			if (debounce === false)
				message.channel.send('You do not have the permissions to use this command');
		});
	}
}