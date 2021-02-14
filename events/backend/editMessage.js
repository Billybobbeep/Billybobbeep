module.exports = (newMessage, oldMessage, client) => {
	const Discord = require('discord.js');
	const guildData = require('../client/database/models/guilds');
	const logging = require('../../utils/functions.js').logging;
  
	if (!newMessage) return;
	if (!oldMessage) return;
	if (!oldMessage.author) return;
	try {
	  if (oldMessage.author.bot) return;
	} catch {
	  console.log('editMsg - bot');
	}
	if (!oldMessage.guild) return;
  
	if (
	  newMessage.content === null ||
	  newMessage.content === ' ' ||
	  newMessage.content === undefined
	) {
	  guildData.findOne({ guildId: newMessage.guild.id }).then(result => {
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
		  .setColor(result.embedColor);
		return logging(embed, message, client);
	  });
	}
	if ((oldMessage.content).toLowerCase() === (newMessage.content).toLowerCase()) return;
  
	if (
	  (newMessage.content.toLowerCase().includes('https://') &&
		oldMessage.content.toLowerCase().includes('https://')) ||
	  (newMessage.content.toLowerCase().includes('http://') &&
		oldMessage.content.toLowerCase().includes('http://')) ||
	  (newMessage.content.toLowerCase().includes('www') &&
		oldMessage.content.toLowerCase().includes('www')) ||
	  (newMessage.content.toLowerCase().includes('.com') &&
		oldMessage.content.toLowerCase().includes('.com')) ||
	  (newMessage.content.toLowerCase().includes('.co.uk') &&
		oldMessage.content.toLowerCase().includes('.co.uk'))
	) return;
  
	guildData.findOne({ guildId: newMessage.guild.id }).then(result => {
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
		.setColor(result.embedColor);
	  logging(embed, oldMessage, client);
	});
}