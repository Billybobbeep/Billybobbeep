const db = require('../../structure/global.js').db;

module.exports = async (member) => {
  if (db.get(member.guild.id + '.welcomeChannel')) {
    const channel = member.guild.channels.cache.find(ch => ch.id === db.get(member.guild.id + '.welcomeChannel'));
    if (!channel) return;
    channel.send(`${member} left the server. (${member.user.tag})`);
  }
  if (!member.user.bot) {
    const guildMemberData = require('../client/database/models/guildMembers.js');
    guildMemberData.findOneAndRemove({ guildId: member.guild.id, memberId: member.user.id });
  }
}