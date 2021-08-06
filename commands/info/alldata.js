const { MessageEmbed } = require('discord.js');
let embed = new MessageEmbed();

module.exports = {
	name: 'alldata',
	description: 'View all of the data from the database',
	guildOnly: true,
	disabled: true,
	/**
	 * @param {object} message The message that was sent
	 * @param {string} prefix The servers prefix
	 * @param {Client} client The bots client
	 */
	async execute(message, _prefix, client) {
		embed.setTitle('Total Guild List:');
		let count = 0;
		client.guilds.cache.forEach(guild => { count++; embed.addField(`Guild ${count}`, guild.name) });
		message.channel.send(embed);
		embed = new MessageEmbed();
		embed.setTitle('Users');
		embed.addField('Total Users', client.users.cache.size);
		embed.addField('Members', client.users.cache.array().filter(user => !user.bot).length);
		embed.addField('Bots', client.users.cache.array().filter(user => user.bot).length);
		message.channel.send(embed)
	}
}