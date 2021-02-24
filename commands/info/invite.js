module.exports = {
	name: 'invite',
	description: 'Generate a bot invite',
	catagory: 'info',
	execute (message, prefix, client) {
		const guildData = require('../../events/client/database/models/guilds');
		const Discord = require('discord.js');
		const embed = new Discord.MessageEmbed();

		guildData.findOne({ guildId: message.guild.id }).then(result => {
			if (result) embed.setColor(result.embedColor); else embed.setColor('#447ba1');
			embed.addField('Invite the bot to your server', `[https://discord.com/oauth2/authorize](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`);
			embed.addField('View more information', `[View ${client.user.username} on top.gg](https://top.gg/bot/${client.user.id})`);
			embed.addField(`Join the official ${client.user.username} server`, '[Billybobbeep Help Center](https://discord.com/invite/AUGX9sywnP)');
			message.channel.send(embed);
		});
	}
}