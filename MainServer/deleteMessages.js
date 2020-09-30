module.exports = async client => {
	const Discord = require(`discord.js`);
	const configFile = require('../config.json');
	let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
	let prefix = configFile.prefix;
  const embed = new Discord.MessageEmbed()
  embed.setTitle(`Message Deleted`)
  embed.setTimestamp();
	embed.setColor('#d9a9d5');

	let command;
	let pinned;

	client.on('messageDelete', message => {
		let msg = message.content.toLowerCase();

		if (message.guild.id !== '733442092667502613') return;
		if (message.author.bot) return;
		if (msg.startsWith(prefix + `purge`)) return;
		if (message.content === null) {
				embed.setDescription(
        `**Content:** *This message provided no text.*\n` +
        `**Message ID:** ${message.id}\n` +
        `**Channel:** ${message.channel}\n\n` +
        `**Author:** ${message.author}\n` +
        `**Author Tag:** ${message.author.tag}\n` +
        `**Author ID:** ${message.author.id}\n\n` +
        `**Command:** ${command}\n` +
        `**Pinned:** ${pinned}\n`)
			LoggingChannel.send(embed);
		}

		if (msg.startsWith(prefix)) {
			command = true;
		} else {
			command = false;
		}
		if (message.pinned) {
			pinned = true;
		} else {
			pinned = false;
		}

			embed.setDescription(
				'**Content:** ' + message.content +
					'\n**Message ID:** ' + message.id +
					'\n**Channel:** ' + message.channel +
					'\n\n**Author:** ' + message.author +
					'\n**Author Tag:** ' + message.author.tag +
					'\n**Author ID:** ' + message.author.id +
					'\n\n**Command:** ' + command +
					'\n**Pinned:** ' + pinned
			)
		LoggingChannel.send(embed);
	});
};
