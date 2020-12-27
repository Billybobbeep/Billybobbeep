const { MessageEmbed } = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = (message, prefix, embedColor) => {
	let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);

	if (!args[2] || args[2].toLowerCase() === 'help') {
		const embed = new MessageEmbed()
			.setTitle('Billybobbeep | Setup Command')
			.setDescription(`With this command you can set up a moderator role.\n\n**Usage:**\nTo set up a moderator role: \`${prefix}setup ${args[1]} [role]\`\nTo reset the role: \`${prefix}setup ${args[1]} reset\``)
			.setColor(`${embedColor}`)
			.setTimestamp()
			.setFooter(`Requested by: ${message.author.tag}`)
		message.channel.send(embed);
	} else if (args[2].toLowerCase() === 'reset') {
		guildData.findOneAndUpdate({ guildId: message.guild.id }, { modRole: false }).then(() => {
			message.channel.send('Removed moderator role from the database');
		});
	} else {
		guildData.findOne({ guildId: Mmessage.guild.id }).then(result => {
			let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
			if (!role)
				return message.channel.send(`Could not find the role \`${args[2]}\``)
			if (role.id === result.modRole) return message.channel.send(`Your moderator role is already set as ${role}`)
			guildData.findOneAndUpdate({ guildId: message.guild.id }, { modRole: role.id }).then(() => {
				message.channel.send(`Your moderator role is now set up as ${role}`);
			});
		});
	}
}
