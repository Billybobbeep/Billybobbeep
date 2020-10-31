const configFile = require('../../structure/config.json');

let countChannel = {
  total: configFile.TotalUserVoiceId,
  member: configFile.MembersVoiceId,
  bots: configFile.BotsVoiceId,
  serverID: configFile.ServerId
}

module.exports = async (client) => {
  // We're gonna doing the same thing if member/bot left the server.

  client.on("guildMemberAdd", member => {
    if (member.guild.id !== countChannel.serverID) return;

    client.channels.cache.get(countChannel.total).setName(`➳𝓣𝓸𝓽𝓪𝓵 𝓤𝓼𝓮𝓻𝓼: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.member).setName(`➳𝓜𝓮𝓶𝓫𝓮𝓻𝓼: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(countChannel.bots).setName(`➳𝓑𝓸𝓽𝓼: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  })

  client.on("guildMemberRemove", member => {
    if (member.guild.id !== countChannel.serverID) return;

    client.channels.cache.get(countChannel.total).setName(`➳𝓣𝓸𝓽𝓪𝓵 𝓤𝓼𝓮𝓻𝓼: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.member).setName(`➳𝓜𝓮𝓶𝓫𝓮𝓻𝓼: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(countChannel.bots).setName(`➳𝓑𝓸𝓽𝓼: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  });
}