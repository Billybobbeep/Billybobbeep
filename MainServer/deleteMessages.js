const editMessage = require('./editMessage');

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

		if (message.guild.id != configFile.ServerId) return;
		if (message.author.bot) return;
		if (msg.startsWith(prefix + `purge`)) return;
		if (message.content === null || message.content === " " || message.content === undefined) {
			embed.setDescription(
			`**Content:** *This message provided no text.*\n` +
			`**Message ID:** ${message.id}\n` +
			`**Channel:** ${message.channel}\n\n` +
			`**Author:** ${message.author}\n` +
			`**Author Tag:** ${message.author.tag}\n` +
			`**Author ID:** ${message.author.id}\n\n` +
			`**Command:** ${command}\n` +
			`**Pinned:** ${pinned}\n`)
			return LoggingChannel.send(embed);
		}
		
		if (message.attachments.size > 0) {
			embed.setDescription(
			`**Content:** *This message contained an image.*\n` +
			`**Message ID:** ${message.id}\n` +
			`**Channel:** ${message.channel}\n\n` +
			`**Author:** ${message.author}\n` +
			`**Author Tag:** ${message.author.tag}\n` +
			`**Author ID:** ${message.author.id}\n\n` +
			`**Command:** ${command}\n` +
			`**Pinned:** ${pinned}\n`)
			return LoggingChannel.send(embed);
		}
		if (message.embeds.length > 0) {
			embed.setDescription(
				`**Content:** *This message contained an embeded link.*\n` +
				`**Link**: ${message.content}` +
				`**Message ID:** ${message.id}\n` +
				`**Channel:** ${message.channel}\n\n` +
				`**Author:** ${message.author}\n` +
				`**Author Tag:** ${message.author.tag}\n` +
				`**Author ID:** ${message.author.id}\n\n` +
				`**Command:** ${command}\n` +
				`**Pinned:** ${pinned}\n`)
				return LoggingChannel.send(embed);
		}

			embed.setDescription(
				'**Content:** ' + message.content +
					'\n**Message ID:** ' + message.id +
					'\n**Channel:** ' + message.channel +
					`\n\n**Author:** ${message.author}` +
					'\n**Author Tag:** ' + message.author.tag +
					'\n**Author ID:** ' + message.author.id +
					'\n\n**Command:** ' + command +
					'\n**Pinned:** ' + pinned
			)
		LoggingChannel.send(embed);
	});
};
