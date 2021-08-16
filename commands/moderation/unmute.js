module.exports = {
	name: 'unmute',
	description: 'Unmute a member',
	guildOnly: true,
	catagory: 'moderation',
	usage: 'unmute [user] [reason]',
	/**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
	execute(message, prefix, client) {
		const mutedMembers = require('../../events/client/database/models/mutedMembers');
		const guildData = require('../../events/client/database/models/guilds');
		const Discord = require('discord.js');
		let embed1 = new Discord.MessageEmbed();
		let embed2 = new Discord.MessageEmbed();
		const logging = require('../../utils/functions').logging;
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		function unmuteCmd() {
			let user = message.mentions.users.first() || message.guild.members.cache.get(args[1])
			let reason = args.slice(2).join(' ');

			guildData.findOne({ guildId: message.guild.id }).then(async result => {
				if (!result.preferences.mutedRole) return message.channel.send('You must setup a muted role in your server to use this command');
				if (!user) return message.channel.send('You must mention a user to mute');
				let member = message.guild.members.cache.get(user.id);
				if (!member) return message.channel.send('I could not find the member you provided');
				if (!member.roles.cache.find(r => r.id === result.preferences.mutedRole)) return message.channel.send(`<@!${user.id}> is not muted`);
				if (user.bot) return message.channel.send('You cannot mute bots');
				if (!reason) reason = 'No reason was provided';

				member.roles.remove(message.guild.roles.cache.find(role => role.id === result.preferences.mutedRole));
				message.channel.send('Successfully unmuted <@!' + user + '>');

				embed1.setTimestamp()
				embed1.setColor(result.preferences ? result.preferences.embedColor : '#447ba1')
				embed1.setTitle('You have been unmuted');
				embed1.addField(`Responsible Moderator:`, message.author.tag);
				embed1.addField(`Reason:`, reason);
				embed1.addField(`Guild:`, message.guild.name);
				try {
					await user.send(embed1);
				} catch {
					message.channel.send('The user has not been notfied as they do not have their DM\'s turned on');
				}
				embed2.setTitle('User Unmuted');
				embed2.setTimestamp();
				embed2.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
				embed2.setDescription(`**User:** ${user}\n**User Tag:** ${user.tag}\n**User ID:** ${user.id}\n\n**Reason:** ${reason}\n\n**Moderator:** ${message.author}\n**Moderator Tag:** ${message.author.tag}\n**Moderator ID:** ${message.author.id}`);
				logging(embed2, message, client);
				mutedMembers.findOne({ userId: user.id, guildId: message.guild.id }).then(result => result.delete()).catch(() => {return});
			});
		}

		let debounce = false;

		guildData.findOne({ guildId: message.guild.id }).then(result => {
			if (message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
				unmuteCmd()
				debounce = true;
			} else if (result.preferences.modRole) {
				if (message.member.roles.cache.find(role => role.id === result.preferences.modRole)) {
					unmuteCmd()
					debounce = true;
				}
				if (debounce === false) {
					message.channel.send('You do not have the permissions to use this command')
				}
			}
		});
	}
}