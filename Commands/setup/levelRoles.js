const { MessageEmbed } = require('discord.js');

module.exports = (message, db) => {
    let prefix = db.get(message.guild.id + '.prefix') || '~';
    var supportedLevels = ['1', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '75', '100', '125', '130']
    var count = 0;
    let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);

	if (!args[2] || args[2] && args[2].toLowerCase() === 'help' || args[3] && args[3].toLowerCase() === 'help') {
		const embed = new MessageEmbed()
			.setTitle('Billybobbeep | Setup Command')
            .setDescription(`With this command you can set up level roles.\n\n**Usage:**\nTo set up a level role: \`${prefix}setup ${args[1]} [level] [role]\`\nTo reset the role: \`${prefix}setup ${args[1]} [level] reset\`\n\n` +
            `**Supported Level Roles:**\n${supportedLevels.join(', ')}`)
			.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
			.setTimestamp()
			.setFooter(`Requested by: ${message.author.tag}`)
		return message.channel.send(embed)
    }
    if (isNaN(args[2])) return message.channel.send('Please mention the level required to get this role.\n*Must be a number.*')
    supportedLevels.forEach(a => {
        if (args[2] !== a) {
            count++;
        }
    });
    if (count === supportedLevels.length) return message.channel.send('The level number you have entered is not a supported role.')
	if (args[3].toLowerCase() === 'reset') {
		db.delete(message.guild.id + `.level${args[2]}RoleId`);
		return message.channel.send(`Removed level ${args[2]} role from the database.`);
	}
	let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[3]);
	if (!role) {
		return message.channel.send(`Could not find the role \`${args[3]}\``)
	}
	if (role.id === db.get(message.guild.id + `.level${args[2]}RoleId`)) return message.channel.send(`Your level ${args[2]} role is already set as ${role}`)
	db.set(message.guild.id + `.level${args[2]}RoleId`, role.id);
	message.channel.send(`Your level ${args[2]} role is now set up as ${role}`);
};
