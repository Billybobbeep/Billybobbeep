module.exports = {
	name: "kick",
	description: "Kick a member",
	guildOnly: true,
	catagory: "moderation",
	usage: "kick [user] [reason]",
	slashInfo: { enabled: true, public: false, options: { mod: true } },
	options: [{ name: "user", description: "The user you'd like to kick", type: 6, required: true }, { name: "reason", description: "Reason to kick", type: 3, required: false }],
	/**
	 * @param {Object} message The message that was sent
	 * @param {String} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	execute(message, prefix, client) {
		const Discord = require("discord.js");
		const guildData = require("../../events/client/database/models/guilds.js");
		const logging = require("../../utils/functions").logging;

		async function kickCmd() {
			let slash = (!message.content && message.data ? true : false);
			let args = !slash ? message.content.slice(prefix.length).trim().split(/ +/g) : message.data.options;
			let channel = slash ?
				{
					send(msg) {
						require("../../utils/functions").slashCommands.reply(message, client, msg)
					},
					reply(user, msg) {
						require("../../utils/functions").slashCommands.reply(message, client, `<@!${user.id}>, ${msg}`)
					}
				} : message.channel;
			let guild = await client.guilds.fetch(message.guild?.id || message.guild_id);
			guildData.findOne({ guildId: guild.id }).then(async result => {
				let user = slash ? message.data.options[0].value : message.mentions.users.first() || message.guild.members.cache.get(args[1]);
				let reason = typeof args == "object" ? (args[1] ? args[1].value : false) : (args ? args.slice(2).join(" ") : false);
				let succ = true;
				let member;

				if (typeof user == "string") {
					member = await guild.members.fetch(user);
					user = await client.users.fetch(user);
				} else if (typeof user == "object") {
					if (!user.id || user.user) user = user.user;
					member = await guild.members.fetch(user.id);
				} else
					return channel.send("You must mention a user to kick");

				if (user.id == (message.author ? message.author.id : message.member.user.id))
					return channel.send("You cannot kick yourself from the server");
				if (user.id == client.user.id)
					return channel.send("You cannot kick me from the server");

				if (!reason) reason = "No reason provided";
				if (member.roles.highest <= message.member.roles.highest) return channel.send("You cannot kick " + user.username);

				let log = new Discord.MessageEmbed()
					.setTimestamp()
					.setColor(result.preferences ? result.preferences.embedColor : "#447ba1")
					.setTitle("You have been kicked")
					.addField("Responsible Moderator:", (message.author ? message.author.tag : `${message.member.user.username}#${message.member.user.discriminator}`), true)
					.addField("Reason:", reason)
					.addField("Guild:", (message.guild ? message.guild.name : client.guilds.cache.get(message.guild_id).name));
				let embed = new Discord.MessageEmbed()
					.setTitle("Member Kicked")
					.setDescription(
						`**Member Tag:** ${user.tag}\n` +
						`**Member ID:** ${user.id}\n` +
						`**Reason:** ${reason}\n\n` +
						`**Moderator:** ${message.author ? message.author : message.member.user}\n` +
						`**Moderator Tag:** ${message.author ? message.author.tag : (message.member.user.username + "#" + message.member.user.discriminator)}\n` +
						`**Moderator ID:** ${message.author ? message.author.id : message.member.user.id}`
					)
					.setColor(result.preferences ? result.preferences.embedColor : "#447ba1")
					.setTimestamp();

				reason = reason + " - " + (message.author ? message.author.tag : (message.member.user.username + "#" + message.member.user.discriminator))
				member.kick({ reason: reason })
					.then(() => {
						channel.send(`Successfully kicked **${user.tag}**`);
					})
					.catch(() => {
						channel.reply("I was unable to kick the member you provided");
						succ = false
					});
				if (succ) {
					await user.send(log).catch(() => embed.setFooter("DM could not be sent"));
					logging(embed, (message.guild?.id || message.guild_id), client);
				}
			});
		}
		let debounce = false;

		guildData.findOne({ guildId: message.guild?.id || message.guild_id }).then(async result => {
			if (!result || result) await client.guilds.cache.get(message.guild?.id || message.guild_id);
			if (client.guilds.cache.get(message.guild?.id || message.guild_id).members.cache.get(message.author ? message.author.id : message.member.user.id).permissions.has(Discord.Permissions.FLAGS.KICK_MEMBERS) ||
				client.guilds.cache.get(message.guild?.id || message.guild_id).members.cache.get(message.author ? message.author.id : message.member.user.id).permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
				kickCmd();
				debounce = true;
			} else if (result.preferences.modRole) {
				if (message.member.roles.cache.find(role => role.id == result.preferences.modRole)) {
					if (result.modsCanKick) {
						kickCmd();
						debounce = true;
					}
				}
			}
			if (!debounce)
				message.channel.send("You do not have the permissions to use this command");
		});
	}
}