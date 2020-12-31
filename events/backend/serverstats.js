const { Message } = require('discord.js');
const configFile = require('../../structure/config.json');
const guildData = require('../client/database/models/guilds');

module.exports = (member, client) => {
  guildData.findOne({ guildId: member.guild.id }).then(result => {
    let countChannel = {
      total: result.serverStats_totalNo,
      member: result.serverStats_memberNo,
      bots: result.serverStats_botNo,
      serverID: member.guild.id
    }
    
    if (!countChannel.total || !countChannel.member || !countChannel.bots) return;
    let tu = result.serverStats_totalNoText || 'Total Users:'
    let tm = result.serverStats_memberNoText || 'Members:';
    let tb = result.serverStats_botNoText || 'Bots:';
    try {
        client.channels.cache.get(countChannel.total).setName(`${tu} ${member.guild.memberCount}`);
        client.channels.cache.get(countChannel.member).setName(`${tm} ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
        client.channels.cache.get(countChannel.bots).setName(`${tb} ${member.guild.members.cache.filter(m => m.user.bot).size}`);
    } catch {
        return;
    }
  });
}