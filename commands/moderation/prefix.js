const { Permissions } = require("discord.js");
const guildData = require("../../events/client/database/models/guilds.js");

module.exports = {
	name: "prefix",
	description: "Set up a new server prefix",
	guildOnly: true,
	catagory: "moderation",
	usage: "prefix [new-prefix]",
	/**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
	execute: function(message, prefix, client) {
		function prefixCmd() {
			guildData.findOne({ guildId: message.guild.id }).then(result => {
				let args = message.content.slice(prefix.length).trim().split(/ +/g);
				if (!args[1]) return message.channel.send("You must provide a new prefix for this server\n\nThis servers current prefix is " + result.prefix ? result.prefix : "~");
				let newPrefix = args[1].toLowerCase();
				if (!newPrefix && result.prefix == "~") return message.channel.send("You must provide a new prefix");
				if (!newPrefix) {
					result.prefix = "~";
					result.save().then(() => {
						message.channel.send("This servers prefix has been set to `~`");
					});
				} else {
					if (newPrefix === prefix) return message.channel.send(`This servers prefix is already ${newPrefix}`);
					if (!isNaN(newPrefix)) return message.channel.send("The prefix cannot be a number");

					result.prefix = newPrefix;
					result.save().then(() => {
						message.channel.send(`This servers prefix has been set to \`${newPrefix}\``);
					});
				}
			});
		}

		guildData.findOne({ guildId: message.guild.id }).then(result => {
			if (message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) || message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
				prefixCmd()
				debounce = true;
			} else if (result.preferences.modRole) {
				if (message.member.roles.cache.find(role => role.id === result.preferences.modRole)) {
					prefixCmd()
					debounce = true;
				}
			}
			if (debounce === false)
				message.channel.send("You do not have the permissions to use this command");
		});
	}
}