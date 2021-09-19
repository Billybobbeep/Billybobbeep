let waiting = [];

module.exports = {
	name: 'quit',
	description: 'Quit your current job',
	catagory: 'economy',
	guildOnly: true,
	/**
	 * @param {Object} message The message that was sent
	 * @param {String} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	async execute(message, _prefix, _client) {
		const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
		const users = require('../../events/client/database/models/users');
		const guilds = require('../../events/client/database/models/guilds');
		const userResult = await users.findOne({ userId: message.author.id });

		if (typeof userResult.job_name !== 'string' || userResult.job_name == '' || userResult.job_name == 'false')
			return message.channel.send('You do not have a job');

		guilds.findOne({ guildId: message.guild.id }).then(guildResult => {
			let button1 = new MessageButton();
			button1.setLabel('Yes');
			button1.setStyle('PRIMARY');
			button1.setCustomId('quit-yes');
			let button2 = new MessageButton()
			button2.setLabel('No');
			button2.setStyle('PRIMARY');
			button2.setCustomId('quit-no');
			let embed = new MessageEmbed()
				.setTitle('Are you sure you want to quit your job?')
				.setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1')
				.setDescription('You will have to re-apply for another job before you can start working again');
			let buttons = new MessageActionRow().addComponents(button1, button2);
			message.channel.send({ embeds: [embed], components: [buttons] });
			waiting.push(message.author ? message.author.id : message.member.user.id);
		});
	},
	/**
     * A function to be emitted whenever someone interacts with a button
     * @param {*} interaction The interaction
     * @param {Client} client The bots client
     */
	async buttonCallback(interaction, client) {
		const users = require('../../events/client/database/models/users');

		let guild = client.guilds.cache.get(interaction.guild_id);
		if (typeof guild !== 'object')
			guild = await client.guilds.fetch(interaction.guild_id);
		let channel = guild.channels.cache.get(interaction.channel_id);
		if (typeof channel !== 'object')
			channel = await client.channels.fetch(interaction.channel_id);
		if (!waiting.includes(interaction.member.user.id))
			return require('../../utils/functions').buttons.respond(
				interaction,
				client,
				`Only the person that executes the ${this.name} command can interact with the embed`,
				{ userOnly: true }
			);
		if ((interaction.data.custom_id).toLowerCase() == 'quit-yes') {
			let tick = client.emojis.cache.get(require('../../utils/config.json').TickEmoji);
			users.findOne({ userId: interaction.member.user.id }).then(result => {
				if (!result || !result.job_name) return;
				require('../../utils/functions').buttons.respond(
					interaction,
					client,
					`${tick} <@!${interaction.member.user.id}> has successfully quit their job (${result.job_name})`
				);
				result.job_name = false;
				result.save();
			});
		} else {
			require('../../utils/functions').buttons.respond(
				interaction,
				client,
				'Interaction cancelled'
			);
		}
		let originalMessage = await channel.messages.fetch(interaction.message.id);
		let embeds = [];
		let components = [];
		(originalMessage.components).forEach(row => {
			row.components.forEach(component => {
				component.disabled = true;
			});
			components.push(row);
		});
		(originalMessage.embeds).forEach(embed => {
			embeds.push(embed);
		});
		originalMessage.edit({ embeds, components });
		waiting.filter(x => x == interaction.member.user.id).forEach((_user, index) => {
			waiting.splice(index, 1);
		});
	}
}