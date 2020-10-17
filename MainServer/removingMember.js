const db = require('quick.db');

module.exports = async (member) => {
  if (db.get(member.guild.id + '.welcomeChannel')) {
    const channel = member.guild.channels.cache.find(ch => ch.id === db.get(member.guild.id + '.welcomeChannel'));
    if (!channel) return;
    channel.send(`${member} left the server. (${member.user.tag})`);
  }
  if (db.get(member.guild.id + '_' + member.user.id)) {
    db.delete(member.guild.id + '_' + member.user.id)
  }
}