const { MessageEmbed } = require('discord.js');
module.exports = (client, message, db) => {
	let prefix = db.get(message.guild.id + '.prefix') || '~';
	var redirect;
	let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
	if (message.content.toLowerCase().startsWith(prefix + 'setup logging')) {
		redirect = require('./loggingChannel.js');
		redirect(client, message, db);
	}
	if (message.content.toLowerCase().startsWith(prefix + 'setup muted')) {
		redirect = require('./mutedRole.js');
		redirect(client, message, db);
	}

	if (!args[1]) {
		const embed = new MessageEmbed()
			.setTitle('Billybobbeep | Setup Command')
			.setDescription(
				'The billybobbeep setup command is used to set billy up in a new server.\nRequires the `Administrator` premissions.\n\n' +
				`Commands:\n` +
				`${prefix}setup muted [role]\n` +
				`*Sets up the muted role to use mute commands.*\n` +
				`${prefix}setup logging [channel]\n` +
				`*Sets up a logging channel.*\n` +
				`${prefix}setup level [channel]\n` +
				`*Set up a channel for level ups to dosplay in*\n` +
				`*Do not set up for level ups to display in channel the message was sent in.*\n` +
				`${prefix}prefix [new prefix]\n` +
				`*Changes the default prefix for the server.*`
			)
			.setColor('#C1F3F1')
			.setTimestamp()
			.setFooter(`Requested by: ${message.author.tag}`);
			message.channel.send(embed)
	}
};
