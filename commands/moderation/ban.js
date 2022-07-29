module.exports = {
	name: "ban",
	description: "Ban a member",
	guildOnly: true,
	catagory: "moderation",
	usage: "ban [user] [reason]",
	/**
	 * Execute the selected command
	 * @param {Object} message The message that was sent
	 * @param {String} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	execute: function(message, prefix, client) {
		const Discord = require("discord.js");
		const guildData = require("../../events/client/database/models/guilds.js");
		const embed = new Discord.MessageEmbed();
		const logging = require("../../utils/functions").logging;
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		function banCmd() {
      if (!args[1]) return message.channel.send("You must provide a member to ban");
			guildData.findOne({ guildId: message.guild.id }).then(async result => {
				let user;
        if (message.mentions.users.first()) {
          user = await message.mentions.users.first();
        } else {
          user = await client.users.fetch(args[1]);
        }

				let member = client.guilds.cache.get(message.guild.id).members.cache.get(user.id);
				let reason = args.slice(2).join(" ");
				let succ = true

				if (!user) return message.channel.send("You must provide a user to ban");
				if (user.id === message.author.id) return message.channel.send("You cannot ban yourself from the server");
				if (user.id === client.user.id) return message.channel.send("You cannot ban me");
				if (!reason) reason = "No reason was provided";
				if (user.tag === undefined || user.id === undefined) user = user.user;

				let embed = new Discord.MessageEmbed();
				embed.setTitle("Member Banned");
				embed.setDescription(
					`**Member Tag:** ${user.tag}\n` +
					`**Member ID:** ${user.id}\n` +
					`**Reason:** ${reason}\n\n` +
					`**Moderator:** ${message.author}\n` +
					`**Moderator Tag:** ${message.author.tag}\n` +
					`**Moderator ID:** ${message.author.id}`
				);
				embed.setTimestamp();
				embed.setColor(result.preferences ? result.preferences.embedColor : "#447ba1");
				let log = new Discord.MessageEmbed();
				log.setTimestamp();
				log.setColor(result.preferences ? result.preferences.embedColor : "#447ba1");
				log.setTitle(`You have been banned`);
				log.addField(`Responsible Moderator:`, message.author.tag, true);
				log.addField(`Reason:`, reason);
				log.addField(`Guild:`, (message.guild).name);
				user.send(log).catch(() => embed.setFooter("DM could not be sent"));

				reason = reason + " - " + message.author.tag.toString()
				member.ban({ days: 0, reason: reason })
				.then(() => {
					message.channel.send(`Successfully banned **${user.tag}**`);
				}).catch(() => {
					succ = false
					message.channel.send(`<@!${message.author ? message.author.id : message.member.user.id}>, I was unable to ban the member you provided`);
				});
				if (succ) logging(embed, message, client);
			});
		}

		let debounce = false;

		guildData.findOne({ guildId: message.guild.id }).then(result => {
			if (message.member.permissions.has(Discord.Permissions.FLAGS.BAN_MEMBERS) || message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
				banCmd();
				debounce = true;
			} else if (result.preferences.modRole) {
				if (message.member.roles.cache.find(role => role.id === result.modsRole)) {
					if (result.modsCanBan) {
						if (message.guild.id === "733442092667502613") return;
						banCmd();
						debounce = true;
					}
				}
			}
			if (debounce === false)
				message.channel.send("You do not have the permissions to use this command");
		});
	}
}