const guildData = require("../client/database/models/guilds");

module.exports = async (member) => {
	guildData.findOne({ guildId: member.guild.id }).then(result => {
		if (!result) return;
		if (result.preferences ? result.preferences.welcomeChannel : false) {
			const channel = member.guild.channels.cache.find(ch => ch.id == result.preferences.welcomeChannel);
			if (!channel) return;
			channel.send(`${member} left the server. (${member.user.tag})`);
		}
		if (!member.user.bot) {
			// Remove the user from the database
			const guildMemberData = require("../client/database/models/guildMembers");
			guildMemberData.findOne({ guildId: member.guild.id, memberId: member.user.id }).then(memberResult => memberResult ? memberResult.delete() : null);
		}
	});
}