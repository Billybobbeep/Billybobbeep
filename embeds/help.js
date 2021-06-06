module.exports = {
	name: 'help',
	description: 'Get help whilst using billybobbeep',
	/**
	   * @param {object} message The message that was sent
	   * @param {string} prefix The servers prefix
	   * @param {objects} client The bots client
	   */
	execute(message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../events/client/database/models/guilds');

		const embed = new Discord.MessageEmbed()
			.setTitle('Billybobbeep | Help')
			.setDescription(`Thank you for using ${client.user.username}!\n` +
				'\n' +
				'Below are some commands to get you started:\n' +
				`${prefix}cmds\n` +
				'*Prompts you to view the commands.*\n' +
				`${prefix}info\n` +
				'*Shows info about the bot.*\n' +
				`${prefix}help\n` +
				'*Shows a quick briefing.*')
			.setFooter(`Requested by: ${message.author.tag}`)
			.setTimestamp()
		guildData.findOne({ guildId: message.guild.id }).then(result => {
			message.guild ? embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1') : embed.setColor('#447ba1');
			message.channel.send(embed);
		});
	}
}