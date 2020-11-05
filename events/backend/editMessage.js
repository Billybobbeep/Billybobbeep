module.exports = (newMessage, oldMessage, client) => {
	const Discord = require('discord.js');
	const db = require('../../data/databaseManager/index.js');
	const logging = require('../../utils/functions.js').logging;

	if (!newMessage) return;
	if (!oldMessage) return;
	if (!oldMessage.author) return;
	try {
	if (oldMessage.author.bot) return;
	} catch {
		console.log('bot');
	}
	if (!oldMessage.guild) return;

	if (
		newMessage.content === null ||
		newMessage.content === ' ' ||
		newMessage.content === undefined
	) {
		const embed = new Discord.MessageEmbed()
			.setTitle(`Message Edited`)
			.setDescription(
				`**Old Content:** ${oldMessage.content}\n` +
				`**New Content:** *This message provided no text.*\n` +
				`**Channel:** ${oldMessage.channel}\n` +
				`**Message ID:** ${newMessage.id}\n\n` +
				`**Author:** ${oldMessage.author}\n` +
				`**Author Tag:** ${oldMessage.author.tag}\n` +
				`**Author ID:** ${oldMessage.author.id}`
			)
			.setTimestamp()
			.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
		return logging(embed, message, client);
	}
	if (oldMessage === newMessage) return;

	if (
		(newMessage.content.toLowerCase().includes('https://') &&
			oldMessage.content.toLowerCase().includes('https://')) ||
		(newMessage.content.toLowerCase().includes('http://') &&
			oldMessage.content.toLowerCase().includes('http://')) ||
		(newMessage.content.toLowerCase().includes('www.') &&
			oldMessage.content.toLowerCase().includes('www.')) ||
		(newMessage.content.toLowerCase().includes('.com') &&
			oldMessage.content.toLowerCase().includes('.com')) ||
		(newMessage.content.toLowerCase().includes('.co.uk') &&
			oldMessage.content.toLowerCase().includes('.co.uk'))
	)
		return;

	const embed = new Discord.MessageEmbed()
		.setTitle(`Message Edited`)
		.setDescription(
			`**Old Content:** ${oldMessage.content}\n` +
			`**New Content:** ${newMessage.content}\n` +
			`**Channel:** ${oldMessage.channel}\n` +
			`**Message ID:** ${newMessage.id}\n\n` +
			`**Author:** ${oldMessage.author}\n` +
			`**Author Tag:** ${oldMessage.author.tag}\n` +
			`**Author ID:** ${oldMessage.author.id}`
		)
		.setTimestamp()
		.setColor(`${db.get(oldMessage.guild.id + '.embedColor') || '#447ba1'}`);
	logging(embed, oldMessage, client);
}