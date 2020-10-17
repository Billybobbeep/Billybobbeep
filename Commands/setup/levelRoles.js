const { MessageEmbed } = require('discord.js');

module.exports = (message, db) => {
	let prefix = db.get(message.guild.id + '.prefix') || '~';
	let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);

	if (!args[2] || args[2].toLowerCase() === 'help' || args[3].toLowerCase() === 'help') {
		const embed = new MessageEmbed()
			.setTitle('Billybobbeep | Setup Command')
			.setDescription(`With this command you can set up level roles.\n\n**Usage:**\nTo set up a level role: \`${prefix}setup ${args[1]} [level] [role]\`\nTo reset the role: \`${prefix}setup ${args[1]} [level] reset\``)
			.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
			.setTimestamp()
			.setFooter(`Requested by: ${message.author.tag}`)
		return message.channel.send(embed)
    }
    if (isNaN(args[2])) {
        return message.channel.send('Please mention the level required to get this role.\n*Must be a number.*')
    }
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
