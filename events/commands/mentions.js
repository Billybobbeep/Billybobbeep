module.exports = async (message, client) => {
	const { MessageEmbed } = require('discord.js');
	const guildData = require('../client/database/models/guilds');
	const embed = new MessageEmbed();

	if (!message.guild) return;
	// Setup embed
	embed.setTitle('Billybobbeep | Mentioned');
	embed.setFooter(`Requested by: ${message.author.tag}`);
	embed.setTimestamp();

	// Mention commands
	if (message.mentions.users.first() && message.mentions.users.first().tag == client.user.tag) {
		let messagedUser = message.mentions.users.first();
		if (messagedUser.tag == client.user.tag && (message.content).includes('help'))
			client.commands.get('help').execute(message, prefix, client);
	}

	// Answer when mentioned
	if (message.mentions.users.first() && message.mentions.users.first().tag == client.user.tag) {
		guildData.findOne({ guildId: message.guild.id }).then(result => {
			if (message.author.bot) return;
			embed.setDescription(`Prefix: \`${result.prefix || '~'}\`\n` + 'For additional help use command: `/help`\n\n**Useful Links:**\n[Invite Billy to another server](https://top.gg/bot/' + client.user.id +'/invite)\n[View Billy on top.gg](https://top.gg/bot/' + client.user.id +')');
			if (result)
				embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
			message.channel.send({ embeds: [embed] });
		});
	}
}