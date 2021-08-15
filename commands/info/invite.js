module.exports = {
	name: 'invite',
	description: 'Generate a bot invite',
	catagory: 'info',
	slashInfo: { enabled: true, public: false },
    options: [],
	/**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
	execute (message, _prefix, client) {
		const guildData = require('../../events/client/database/models/guilds');
		const Discord = require('discord.js');
		const embed = new Discord.MessageEmbed();

		guildData.findOne({ guildId: message.guild?.id || message.guild_id }).then(result => {
			if (result) embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1'); else embed.setColor('#447ba1');
			embed.addField('Invite the bot to your server', `[https://discord.com/oauth2/authorize/...](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)`);
			embed.addField('View more information', `[View ${client.user.username} on top.gg](https://top.gg/bot/${client.user.id})`);
			embed.addField(`Join the official ${client.user.username} server`, '[Billybobbeep Help Center](https://discord.com/invite/AUGX9sywnP)');
			message.data ?
				require('../../utils/functions').slashCommands.reply(message, client, embed) :
				message.channel.send({ embeds: [embed] });
		});
	}
}