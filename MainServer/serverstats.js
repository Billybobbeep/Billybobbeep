const configFile = require('../config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

let countChannel = {
    total: configFile.TotalUserVoiceId,
    member: configFile.MembersVoiceId,
    bots: configFile.BotsVoiceId,
    serverID: configFile.ServerId
  } 
  
module.exports = async(client) => {
  // We're gonna doing the same thing if member/bot left the server.

  client.on("guildMemberAdd", member => {
    if (member.guild.id !== countChannel.serverID) return;
    
    client.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  })
  
  client.on("guildMemberRemove", member => {
    if (member.guild.id !== countChannel.serverID) return;
    
    client.channels.cache.get(countChannel.total).setName(`Total Users: ${member.guild.memberCount}`);
    client.channels.cache.get(countChannel.member).setName(`Members: ${member.guild.members.cache.filter(m => !m.user.bot).size}`);
    client.channels.cache.get(countChannel.bots).setName(`Bots: ${member.guild.members.cache.filter(m => m.user.bot).size}`);
  });
}