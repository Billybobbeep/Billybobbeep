const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const guildData = require('../../events/client/database/models/guilds.js');

const filterLevels = {
	DISABLED: 'Off',
	MEMBERS_WITHOUT_ROLES: 'No Role',
	ALL_MEMBERS: 'Everyone'
}

const verificationLevels = {
	NONE: 'None',
	LOW: 'Low',
	MEDIUM: 'Medium',
	HIGH: 'High',
	VERY_HIGH: 'Very high'
}

const regions = {
	brazil: 'Brazil',
	europe: 'Europe',
	hongkong: 'Hong Kong',
	india: 'India',
	japan: 'Japan',
	russia: 'Russia',
	singapore: 'Singapore',
	southafrica: 'South Africa',
	sydeny: 'Sydeny',
	'us-central': 'US Central',
	'us-east': 'US East',
	'us-west': 'US West',
	'us-south': 'US South'
}

module.exports = {
	name: 'serverinfo',
	description: 'View this servers info',
	alias: ['server'],
	catagory: 'info',
	guildOnly: true,
	/**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
	execute (message, _prefix, _client) {
		const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
		const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;

		guildData.findOne({ guildId: message.guild.id }).then(result => {
			const embed = new MessageEmbed()
				.setDescription(`**Billybobbeep | Server Information**`)
				.setColor(result.preferences ? result.preferences.embedColor : '#447ba1')
				.setThumbnail(message.guild.iconURL({ dynamic: true }))
				.setFooter(`Requested by: ${message.author.tag}`)
				.addField('General', [
					`**Name:** ${message.guild.name}`,
					`**ID:** ${message.guild.id}`,
					`**Owner:** ${message.guild.owner.user.tag} (${message.guild.ownerID})`,
					`**Region:** ${regions[message.guild.region]}`,
					`**Boost Tier:** ${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'}`,
					`**Explicit Filter:** ${filterLevels[message.guild.explicitContentFilter]}`,
					`**Verification Level:** ${verificationLevels[message.guild.verificationLevel]}`,
					`**Time Created:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')}, ${moment(message.guild.createdTimestamp).fromNow()}`,
					'\u200b'
				])
				.addField('Statistics', [
					`**Role Count:** ${roles.length}`,
					`**Emoji Count:** ${emojis.size}`,
					`**Members:** ${message.guild.memberCount}`,
					`**Text Channels:** ${channels.filter(channel => channel.type === 'text').size}`,
					`**Voice Channels:** ${channels.filter(channel => channel.type === 'voice').size}`,
					`**Boost Count:** ${message.guild.premiumSubscriptionCount || '0'}`,
					'\u200b'
				])
				.setTimestamp();
			message.channel.send({ embeds: [embed] });
		});
	}
}