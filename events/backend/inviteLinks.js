const guildData = require('../client/database/models/guilds');
const { MessageEmbed } = require('discord.js');
const { logging } = require('../../utils/functions');
const axios = require('axios');
let il = ['dsc.gg', 'discord.gg', 'discord.com/invite'];

async function getInvite(guildResult, inviteResponse, message, client) {
	console.log(inviteResponse);
	const embed = new MessageEmbed();
	embed.setTitle(`Billybobbeep | Invite Links`);
	embed.setTimestamp();
	embed.setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1');
	embed.setDescription(
		`${message.guild.id} does not allow you to send links to external servers.\n` +
		`**Connected Server:** ${inviteResponse.guild.name}\n` +
		`**Detected Invite Link:** https://discord.gg/${inviteResponse.code}`
	);
	(await message.author.send(embed)).catch(() => embed.setFooter('DM was not sent'));

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
	let found = false;
	let completed = false;
	if (!message.guild) return;
	guildData.findOne({ guildId: message.guild.id }).then(result => {
		if (message.author.bot) return;
		let inviteLinks = result.preferences ? result.preferences.inviteLinks : false;
		if (!inviteLinks) return;

		if (message.guild.owner.id == message.author.id) return;
		il.forEach(link => {
			if ((message.content).toLowerCase().includes(link)) found = true;
		});
		if (found) {
			message.delete();
			(message.content).split(/ +/g).forEach(word => {
				let word1 = word.split('/');
				word1.forEach(word2 => {
					if (completed) return;
					if (il.includes(word2.toLowerCase())) {
						completed = true;
						axios.get(`https://discord.com/api/v9/invites/${word.split('/')[1]}`).then(data => {
							if (data.data && !data.data.error)
								getInvite(result, data.data, message, client);
						});
					}
				});
			});
		}
	});
}