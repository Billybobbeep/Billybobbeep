const guildData = require('../../events/client/database/models/guilds.js');

module.exports = {
	name: 'prefix',
	description: 'Set up a new server prefix',
	guildOnly: true,
	catagory: 'moderation',
	usage: 'prefix [new-prefix]',
	/**
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {objects} client The bots client
     */
	execute (message, prefix, client) {
		function prefixCmd() {
			guildData.findOne({ guildId: message.guild.id }).then(result => {
				let args = message.content.slice(prefix.length).trim().split(/ +/g);
				if (!args[1]) { return message.channel.send('Please specify a new prefix\n\nThis servers current prefix is ' + result.prefix ? result.prefix : '~') };
				let newPrefix = args[1].toLowerCase();
				if (!newPrefix && result.prefix === '~') return message.channel.send('Please specify a prefix');
				if (!newPrefix && !result.prefix) return message.channel.send('Please specify a prefix');
				if (!newPrefix) {
					result.prefix = '~';
					result.save().then(() => {
						message.channel.send('This servers prefix has been set to `~`');
					});
				} else {
					if (newPrefix === prefix) return message.channel.send(`This servers prefix is already ${newPrefix}`);
					if (!isNaN(newPrefix)) return message.channel.send('The prefix cannot be a number');

					result.prefix = newPrefix;
					result.save().then(() => {
						message.channel.send(`This servers prefix has been set to \`${newPrefix}\``);
					});
				}
			});
		}

		guildData.findOne({ guildId: message.guild.id }).then(result => {
			if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR')) {
				prefixCmd()
				debounce = true;
			} else if (result.modRole) {
				if (message.member.roles.cache.find(role => role.id === result.modRole)) {
					prefixCmd()
					debounce = true;
				}
			}
			if (debounce === false)
				message.channel.send('You do not have the permissions to use this command');
		});
	}
}