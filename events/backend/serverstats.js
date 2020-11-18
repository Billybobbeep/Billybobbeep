const configFile = require('../../structure/config.json');
const db = require('quick.db');

module.exports.add = (member, client) => {
  if (member.user.guild.id !== countChannel.serverID) return;

  let countChannel = {
    total: db.get(member.user.guild.id + '.serverStats.totalNo'),
    member: db.get(member.user.guild.id + '.serverStats.memberNo'),
    bots: db.get(member.user.guild.id + '.serverStats.botNo'),
    serverID: member.user.guild.id
  }
     
  if (!countChannel.total || !countChannel.member || !countChannel.bots) return;
  var tu = db.set(member.user.guild.id + '.serverStats.totalNoText') || 'Total Users:'
  var tm = db.set(member.user.guild.id + '.serverStats.memberNoText') || 'Members:';
  var tb = db.get(member.user.guild.id + '.serverStats.botNoText') || 'Bots:';
  try {
      client.channels.cache.get(countChannel.total).setName(`${tu} ${member.user.guild.memberCount}`);
      client.channels.cache.get(countChannel.member).setName(`${tm} ${member.user.guild.members.cache.filter(m => !m.user.bot).size}`);
      client.channels.cache.get(countChannel.bots).setName(`${tb} ${member.user.user.guild.members.cache.filter(m => m.user.bot).size}`);
  } catch {
      return;
  }
}

module.exports.remove = (member, client) => {
  if (member.user.guild.id !== countChannel.serverID) return;
  
  let countChannel = {
    total: db.get(member.user.guild.id + '.serverStats.totalNo'),
    member: db.get(member.user.guild.id + '.serverStats.memberNo'),
    bots: db.get(member.user.guild.id + '.serverStats.botNo'),
    serverID: member.user.guild.id
  }
  
  if (!countChannel.total || !countChannel.member || !countChannel.bots) return;
  var tu = db.set(member.user.guild.id + '.serverStats.totalNoText') || 'Total Users:'
  var tm = db.set(member.user.guild.id + '.serverStats.memberNoText') || 'Members:';
  var tb = db.get(member.user.guild.id + '.serverStats.botNoText') || 'Bots:';
  try {
      client.channels.cache.get(countChannel.total).setName(`${tu} ${member.user.guild.memberCount}`);
      client.channels.cache.get(countChannel.member).setName(`${tm} ${member.user.guild.members.cache.filter(m => !m.user.bot).size}`);
      client.channels.cache.get(countChannel.bots).setName(`${tb} ${member.user.guild.members.cache.filter(m => m.user.bot).size}`);
  } catch {
      return;
  }
}