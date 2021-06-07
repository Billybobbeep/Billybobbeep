const guildData = require('../client/database/models/guilds');
const guildMemberData = require('../client/database/models/guildMembers');

module.exports = async (member) => {
	guildData.findOne({ guildId: member.guild.id }).then(result => {
		if (result.preferences && result.preferences.welcomeChannel) {
			const channel = member.guild.channels.cache.find(ch => ch.id == result.preferences.welcomeChannel);
			if (!channel) return;
			channel.send(`Welcome ${member} to the server! (${member.user.tag})`);
		}
		if (result.preferences && result.preferences.autoRoles) {
			(result.preferences ? result.preferences.autoRoles : []).forEach(roleId => {
				member.roles.add(roleId);
			});
		}
	});
}