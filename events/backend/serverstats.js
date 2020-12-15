const configFile = require('../../structure/config.json');
const db = require('../../structure/global.js').db;

module.exports = (member, client) => {
  let countChannel = {
    total: db.get(member.guild.id + '.serverStats.totalNo'),
    member: db.get(member.guild.id + '.serverStats.memberNo'),
    bots: db.get(member.guild.id + '.serverStats.botNo'),
    serverID: member.guild.id
  }
  
  if (!countChannel.total || !countChannel.member || !countChannel.bots) return;
  var tu = db.get(member.guild.id + '.serverStats.totalNoText') || 'Total Users:'
  var tm = db.get(member.guild.id + '.serverStats.memberNoText') || 'Members:';
  var tb = db.get(member.guild.id + '.serverStats.botNoText') || 'Bots:';
  try {
      client.channels.cache.get(countChannel.total).setName(`${tu} ${member.guild.memberCount}`);
      client.channels.cache.get(countChannel.member).setName(`${tm} ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
      client.channels.cache.get(countChannel.bots).setName(`${tb} ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  } catch {
      return;
  }
}