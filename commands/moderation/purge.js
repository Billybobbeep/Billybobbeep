module.exports = {
	name: 'purge',
	description: 'Delete alot of messages at once',
	guildOnly: true,
	catagory: 'moderation',
	usage: 'purge [amount]',
	/**
	 * Execute the selected command
	 * @param {Object} message The message that was sent
	 * @param {String} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	execute(message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../../events/client/database/models/guilds.js');
		const logging = require('../../utils/functions').logging;
		let args = message.content.slice(prefix.length).trim().split(/ +/g);
		/**
		 * Return a message back to the sender
		 * @param {*} msg The message to return
		 * @returns The sent message
		 */
		async function send(msg) {
			return await message.data ?
				require('../../utils/functions').slashCommands.reply(message, client, msg).message :
				message.channel.send(msg);
		}
		/**
		 * The purge command to execute
		 */
		function purgeCmd() {
			if (!args[1]) return send('You must provide an amount of messages to delete');
			if (isNaN(args[1])) return send('You have entered an invalid number');
			args[1] = parseInt(args[1]);
			if (args[1] > 100) return send('The maximum messages to purge is 100, select a number equal or less than 100');
			if (args[1] < 2) return send(`I cannot delete ${args[1]} messages`);
			guildData.findOne({ guildId: message.guild.id }).then(result => {
				let msg1;
				message.delete();
				message.channel.bulkDelete(args[1])
					.then(async messages => {
						msg1 = await send(`Deleted ${messages.size}/${args[0]} messages`);

						const embed = new Discord.MessageEmbed()
						embed.setTitle('Purged Messages');
						embed.setDescription(`**Channel:** ${message.channel}\n` +
							`**Messages Purged:** ${messages.size}\n\n` +
							`**Moderator:** ${message.author}\n` +
							`**Moderator Tag:** ${message.author.tag}\n` +
							`**Moderator ID:** ${message.author.id}\n`)
						embed.setTimestamp();
						embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
						logging(embed, message, client);
						msg1.delete({ timeout: 3000 });
					})
					.catch(() => message.channel.send('Something went wrong, ensure the messages are not over 2 weeks old'));
			});
		}

		let debounce = false;
		if (message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES) || message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
			purgeCmd();
			debounce = true;
		} else if (result.preferences.modRole) {
			if (message.member.roles.cache.find(role => role.id === result.preferences.modRole)) {
				purgeCmd();
				debounce = true;
			}
		}
		if (debounce === false)
			send('You do not have the permissions to use this command')
	}
}