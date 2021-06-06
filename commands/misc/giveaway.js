const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = {
	name: 'giveaway',
	description: 'Start a giveaway',
	catagory: 'other',
	usage: 'giveaway [time] [channel] [prize]',
	guildOnly: true,
	/**
	   * @param {object} message The message that was sent
	   * @param {string} prefix The servers prefix
	   * @param {objects} client The bots client
	   */
	execute(message, prefix, _client) {
		if (!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send('You must have `Manage Server` permissions to use this command');
		guildData.findOne({ guildId: message.guild.id }).then(async result => {
			let args = message.content.slice(prefix.length).trim().split(/ +/g);
			if (!args[1]) return message.channel.send('Please specify a time');
			if (
				!args[1].endsWith('d') &&
				!args[1].endsWith('h') &&
				!args[1].endsWith('m')
			) return message.channel.send('You did not use the correct formatting for the time');
			if (isNaN(args[1][0])) return message.channel.send('You did not specify a valid time');
			let channel = message.mentions.channels.first();
			if (!channel)
				return message.channel.send('I could not find that channel in the server');
			let prize = args.slice(2).join(' ');
			if (!prize) return message.channel.send('Please specify a prize');
			message.channel.send(`*Giveaway created in ${channel}.*`);
			let Embed = new MessageEmbed()
				.setTitle(`${prize}`)
				.setDescription(
					`**Host:** ${message.author.tag}\n` + `**Prize:** ${prize}`
				)
				.setTimestamp(Date.now() + ms(args[1]))
				.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');

			let m = await channel.send(Embed);
			m.react('🎉');
			setTimeout(() => {
				if (m.reactions.cache.get('🎉').count <= 1) {
					message.channel.send(`Reactions: ${m.reactions.cache.get('🎉').count}`);
					return message.channel.send(`Not enough people reacted for me to start draw a winner!`);
				}

				let winner = m.reactions.cache
					.get('🎉')
					.users.cache.filter((u) => !u.bot)
					.random();
				channel.send(`${winner} has won the giveaway!`);
				m.reactions.removeAll();
				let winningEmbed = new MessageEmbed()
					.setTitle(`${prize}`)
					.setDescription(
						`**Host:** ${message.author.tag}\n` + `**Prize:** ${prize}\n` + `**Winner:** ${winner.tag}\n` + `\n` + `*This giveaway has now ended.*`
					)
					.setTimestamp(Date.now() + ms(args[1]))
					.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
				m.edit(winningEmbed)
			}, ms(args[1]));
		});
	}
}