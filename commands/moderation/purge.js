module.exports = {
	name: "purge",
	description: "Delete alot of messages at once",
	guildOnly: true,
	catagory: "moderation",
	usage: "purge [amount]",
	/**
	 * Execute the selected command
	 * @param {Object} message The message that was sent
	 * @param {String} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	async execute(message, prefix, client) {
		// Define dependancies
		const Discord = require("discord.js");
		const guilds = require("../../events/client/database/models/guilds.js");
		const logging = require("../../utils/functions").logging;
		// Define the message args
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		// Find the guild data
		let guildData = await guilds.findOne({ guildId: message.guild.id });

		/**
		 * Return a message back to the sender
		 * @param {*} msg The message to return
		 * @returns The sent message
		 */
		async function send(msg) {
			return await message.data ?
				require("../../utils/functions").slashCommands.reply(message, client, msg).message :
				message.channel.send(msg);
		}
		/**
		 * The purge command to execute
		 */
		async function purgeCmd() {
			// Ensure a message count has been provided
			if (!args[1]) return send("You must provide an amount of messages to delete");
			if (isNaN(args[1])) return send("You have entered an invalid number");

			// Parse the message amount into a number
			args[1] = parseInt(args[1]);

			// Ensure the message count is a number within the guidelines
			if (args[1] > 100) return send("The maximum messages to purge is 100, select a number equal or less than 100");
			if (args[1] < 2) return send("The minimum messages to purge is 1");

			let msg1;
			// Delete the original message
			await message.delete().catch(() => null);
			// Bulk delete the defined messages
			message.channel.bulkDelete(args[1])
				.then(async messages => {
					// Let the user know the messages has been deleted
					msg1 = await send(`Deleted ${messages.size}/${args[1]} messages`);

					// Send a message to the logging channel, if set up
					const embed = new Discord.MessageEmbed();
					embed.setTitle("Purged Messages");
					embed.setDescription(`**Channel:** ${message.channel}\n` +
						`**Messages Purged:** ${messages.size}\n\n` +
						`**Moderator:** ${message.author}\n` +
						`**Moderator Tag:** ${message.author.tag}\n` +
						`**Moderator ID:** ${message.author.id}\n`)
					embed.setTimestamp();
					embed.setColor(guildData?.preferences ? guildData.preferences.embedColor : "#447ba1");
					logging(embed, message, client);
					// Delete the sent message after 3 seconds
					setTimeout(() => {
						try {
							msg1.delete();
						} catch {
							null;
						}
					}, 3000);
				})
				.catch(() => message.channel.send("Something went wrong, ensure the messages are not over 2 weeks old"));
		}

		let debounce = false;
		// Ensure the user has permission to use the command inside the guild
		// Checks if the user has raised permissions in the guild or is a mod
		if (message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
			purgeCmd();
			debounce = true;
		} else if (guildData?.preferences?.modRole) {
			if (message.member.roles.cache.find(role => role.id === guildData?.preferences?.modRole)) {
				purgeCmd();
				debounce = true;
			}
		}
		// If the user doesn"t have permission to execute the command, send an error message
		if (debounce === false)
			send("You do not have the permissions to use this command");
	}
}