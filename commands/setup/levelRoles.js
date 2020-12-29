const { MessageEmbed, MessageReaction } = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = (message, prefix, embedColor) => {
    let supportedLevels = ['1', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '75', '100', '120', '130', '140', '150', '160', '170', '180', '190', '200', '250', '300', '350', '400', '450', '500', '1000', '1200', '1400', '1500', '1600', '1700', '1800', '1900', '2000']
    let count = 0;
    let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);

	if (!args[2] || args[2] && args[2].toLowerCase() === 'help' || args[3] && args[3].toLowerCase() === 'help') {
		const embed = new MessageEmbed()
			.setTitle('Billybobbeep | Setup Command')
            .setDescription(`With this command you can set up level roles.\n\n**Usage:**\nTo set up a level role: \`${prefix}setup ${args[1]} [level] [role]\`\nTo reset the role: \`${prefix}setup ${args[1]} [level] reset\`\n\n` +
            `**Supported Level Roles:**\n${supportedLevels.join(', ')}`)
			.setColor(`${embedColor}`)
			.setTimestamp()
			.setFooter(`Requested by: ${message.author.tag}`)
		return message.channel.send(embed)
    }
    if (isNaN(args[2]) && args[2].toLowerCase() !== 'reset') return message.channel.send('Please mention the level required to get this role.\n*Must be a number.*')
    supportedLevels.forEach(a => {
        if (args[2] !== a) {
            count++;
        }
	});
	guildData.findOne({ guildId: message.guild.id }).then(result => {
		if (count === supportedLevels.length && args[2].toLowerCase() !== 'reset') return message.channel.send('The level number you have entered is not a supported role');
		if (args[3] && args[3].toLowerCase() === 'reset' || args[2] && args[2].toLowerCase() === 'reset') {
			if (args[2].toLowerCase() === 'reset') {
				guildData.findOneAndUpdate({ guildId: message.guild.id }, { lvlRoles: [] }).then(() => {
					message.channel.send(`Removed all level roles from the database`);
				});
			} else {
				if (result.lvlRoles.length < 1) return message.channel.send('There are no levels in the database');
				let found = false;
				result.lvlRoles.forEach(level => {
					if (level.level === args[2]) found = true;
				});
				if (found === false) message.channel.send('Could not find a level role for the level ' + args[2]);
				else {
					guildData.findOneAndUpdate({ guildId: message.guild.id }, {  }).then(() => {
						message.channel.send(`Removed level ${args[2]} role from the database`);
					});
				}
			}
		} else {
			let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[3]);
			if (!role)
				return message.channel.send(`Could not find the role \`${args[3]}\``);
			let debounce = false;
			if (result.lvlRoles) {
				result.lvlRoles.forEach(level => {
					if (level.role === role.id) debounce = true;
				});
				if (debounce === true) return message.channel.send(`This role (${role}) has already been used for another level role`);
				else {
					guildData.findOneAndUpdate({ guildId: message.guild.id },{ $push: { lvlRoles:  { level: Number(args[2]), role: role.id }}}).then(() => {
						message.channel.send(`Your level ${args[2]} role is now set up as ${role}`);
					});
				}
			} else {
				guildData.findOneAndUpdate({ guildId: message.guild.id },{ $push: { lvlRoles:  { level: Number(args[2]), role: role.id }}}).then(() => {
					message.channel.send(`Your level ${args[2]} role is now set up as ${role}`);
				});
			}
		}
	});
}
