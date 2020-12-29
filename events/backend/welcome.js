const db = require('../../structure/global.js').db;
module.exports = async (member) => {
  if (db.get(member.guild.id + '.welcomeChannel')) {
    const channel = member.guild.channels.cache.find(ch => ch.id === db.get(member.guild.id + '.welcomeChannel'));
    if (!channel) return;
    channel.send(`Welcome ${member} to the server! (${member.user.tag})`);
  }
  if (db.get(member.guild.id + '.autoRole')) {
    member.roles.add(db.get(member.guild.id + '.autoRole'))
  }

  const guildMemberData = require('../client/database/models/guildMembers.js');
  const newData = new guildMemberData({
    guildId: member.guild.id,
    memberId: member.user.id
  });
  newData.save();
}