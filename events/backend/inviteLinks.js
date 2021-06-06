const guildData = require('../client/database/models/guilds');
const Discord = require('discord.js');
const axios = require('axios');
let il = ['dsc.gg', 'discord.gg', 'discord.com/invite'];

async function getInvite(guildResult, inviteResponse, message, client) {
	const embed = new Discord.MessageEmbed();
	const logging = require('../../utils/functions').logging;
	embed.setTitle(`Billybobbeep | Invite Links`);
	embed.setTimestamp();
	embed.setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1');
	embed.setDescription(
		`${message.guild.id} does not allow you to send links to external servers.\n`+
		`**Connected Server:** ${inviteResponse.guild.name}\n` +
		`**Detected Invite Link:** https://discord.gg/${inviteResponse.code}`
	);
	await message.author.send(embed);

	embed.setTitle('Invite Link Detected');
	embed.setDescription(
		`**Server:** [${inviteResponse.guild.name}](https://discord.gg/${inviteResponse.code})\n` +
		`**Message ID:** ${message.id}\n\n` +
		`**Channel:** ${message.channel}\n` +
		`**Channel ID:** ${message.channel.id}\n\n` +
		`**Author:** ${message.author}\n` +
		`**Author Tag:** ${message.author.tag}\n` +
		`**Author ID:** ${message.author.id}\n`
	)

	logging(embed, message, client);
}
module.exports = (message, client) => {
	if (!message.guild) return;
	guildData.findOne({ guildId: message.guild.id }).then(result => {
		if (message.author.bot) return;
		let inviteLinks = result.preferences ? result.preferences.inviteLinks : false;
		if (!inviteLinks) return;

		//if (message.guild.owner.id == message.author.id) return;
		if ((message.content).toLowerCase().includes(il)) {
			message.delete();
			(message.content).split(/ +/g).forEach(word => {
				if (il.includes(word.toLowerCase())) {
					if (il.includes(word.toLowerCase())) return;
					axios.get(`https://discord.com/api/v9/invites/${word}`).then(data => {
						if (data.data && !data.data.error)
							getInvite(result, data.data, message, client);
					});
				}
			});
		}
	});
}