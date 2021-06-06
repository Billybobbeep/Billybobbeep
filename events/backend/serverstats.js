const guildData = require('../client/database/models/guilds');

module.exports = (member, client) => {
	guildData.findOne({ guildId: member.guild.id }).then(result => {
		let data = {
			total: result.preferences.serverStats_totalNo,
			member: result.preferences.serverStats_memberNo,
			bots: result.preferences.serverStats_botNo,
			serverID: member.guild.id
		}

		if (!data.total || !data.member || !data.bots) return;
		let tu = result.preferences.serverStats_totalNoText || 'Total Users:'
		let tm = result.preferences.serverStats_memberNoText || 'Members:';
		let tb = result.preferences.serverStats_botNoText || 'Bots:';
		try {
			client.channels.cache.get(data.total).setName(`${tu} ${member.guild.memberCount}`);
			client.channels.cache.get(data.member).setName(`${tm} ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
			client.channels.cache.get(data.bots).setName(`${tb} ${member.guild.members.cache.filter(m => m.user.bot).size}`);
		} catch {
			return;
		}
	});
}