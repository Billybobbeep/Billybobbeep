const guildData = require('../client/database/models/guilds');
const guildMemberData = require('../client/database/models/guildMembers');
let punc = ['!', '/', '"', 'p!', '%', '&', '?', '£', '$', '^', '*', '', '>', ',', '<', 'pls', 'owo', '~'];

module.exports = async (message, _client) => {
	if (!message.guild) return;
	guildData.findOne({ guildId: message.guild.id }).then(guildResult => {
		if (!guildResult) return;
		guildMemberData.findOne({ guildId: message.guild.id, memberId: message.author.id }).then(async memberResult => {
			if (!memberResult) return;

			// Define required variables
			let prefix = guildResult.prefix || '~';
			let levelUpChannel = guildResult.preferences ? guildResult.preferences.levelUpChannel || false : false;
			let args = message.content.split(/ +/g);
			let xpForLevel = 150;
			let level = memberResult.level || 0;

			if (message.content.startsWith(prefix) || args[0].length < 2 && !args[1] || !isNaN(message.content)) return;

			if (guildResult.activeGuild) {
				xpForLevel = level * 2 + 200;
				if (xpForLevel < 100)
					xpForLevel = 100;
				if (xpForLevel[xpForLevel.length - 1] !== 0)
					xpForLevel[xpForLevel.length - 1] = 0;
			} else {
				xpForLevel = Math.floor(level * 2 + 150);
				if (xpForLevel < 100)
					xpForLevel = 100;
				if (xpForLevel[xpForLevel.length - 1] !== 0)
					xpForLevel[xpForLevel.length - 1] = 0;
			}

			let currlev = memberResult.level || 0;
			let gainedXp = Math.round(Math.random() * 5);
			if (gainedXp < 1) gainedXp = Math.round(Math.random() * 5);
			if (message.author.bot) return;
			let levelsEnabled =
				typeof guildResult.preferences == 'object' && guildResult.preferences.levelsEnabled == 'boolean' ?
					guildResult.preferences.levelsEnabled :
					true;
			if (!levelsEnabled) return;
			if (message.content.startsWith(prefix)) return;
			let debounce = false;

			// If the message starts with a registered prefix, return
			punc.forEach(p => {
				if (debounce == true || !p || p == ' ' || p == '') return;
				if (message.content.startsWith(p)) debounce = true;
				else if (args[0].includes(p)) debounce = true;
			});
			if (debounce == true) return;

			memberResult.xp = memberResult.xp ? memberResult.xp + gainedXp : gainedXp; // Add the XP to the users profile

			// If the current XP is enough for a new level
			if (memberResult.xp >= xpForLevel) {
				memberResult.xp = 0;
				memberResult.level = memberResult.level ? memberResult.level + 1 : 1;
				// If a level up channel exists
				if (!levelUpChannel)
					message.channel.send(`<@!${message.author.id}> is now level ${memberResult.level}`);
				else {
					let channel = await message.guild.channels.fetch(levelUpChannel);
					channel.send(`<@!${message.author.id}> is now level ${memberResult.level}`);
				}
			}
			memberResult.save(); // Save the users profile
			currlev = memberResult.level; // Get the users current level

			if (guildResult.preferences && typeof guildResult.preferences.lvlRoles == 'object') {
				let roleExists = false;
				(guildResult.preferences.lvlRoles).forEach(data => {
					if (data.level == currlev)
						roleExists = true;
				});
				if (roleExists) {
					(guildResult.preferences.lvlRoles).forEach(data => {
						if (message.member.roles.cache.get(data.role) && data.level < currlev)
							message.member.roles.remove(data.role, `${message.author.tag} has levelled up`);
						else if (message.member.roles.cache.get(data.role) && data.level > currlev)
							message.member.roles.remove(data.role, `${message.author.tag} has not reached the minimum level for this role`);
						if (data.level == currlev && !message.member.roles.cache.get(data.role))
							message.member.roles.add(data.role, `${message.author.tag} has reached level ${currlev}`);
					});
				}
			}
		});
	});
}