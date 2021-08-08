module.exports = {
	name: 'help',
	description: 'Get help whilst using billybobbeep',
	slashInfo: { enabled: true, public: true },
    options: [],
	/**
	   * @param {object} message The message that was sent
	   * @param {string} prefix The servers prefix
	   * @param {Client} client The bots client
	   */
	execute(message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../events/client/database/models/guilds');

		const embed = new Discord.MessageEmbed();
		embed.setTitle('Billybobbeep | Help')
		embed.setDescription(`Thank you for using ${client.user.username}!\n` +
				'\n' +
				'Below are some commands to get you started:\n' +
				`${prefix}cmds\n` +
				'*Prompts you to view the commands.*\n' +
				`${prefix}info\n` +
				'*Shows info about the bot.*\n' +
				`${prefix}help\n` +
				'*Shows a quick briefing.*')
		!message.data ? embed.setFooter(`Requested by: ${message.author.tag}`) : null;
		embed.setTimestamp();
		guildData.findOne({ guildId: message.guild ? message.guild.id : message.guild_id }).then(result => {
			result.preferences ? embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1') : embed.setColor('#447ba1');
			message.data ?
				require('../utils/functions').slashCommands.reply(message, client, embed) :
				message.channel.send(embed);
		});
	}
}