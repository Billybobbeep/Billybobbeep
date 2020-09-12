module.exports = async(client) => {
  const configFile = require('../config.json')
let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);

  client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    const embed = new Discord.MessageEmbed()
    .setTitle(`Guild Removed`)
    .setDescription(`**Guild Name:** ${guild.name}\n` + `**Guild ID:** ${guild.id}\n` + `**Guild Members:** ${guild.memberCount}\n` + `**Invite Link:** `)
    .setTimestamp()
    LoggingChannel.send(embed)
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  });

  client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    const embed = new Discord.MessageEmbed()
    .setTitle(`Guild Added`)
    .setDescription(`**Guild Name:** ${guild.name}\n` + `**Guild ID:** ${guild.id}`)
    .setTimestamp()
    LoggingChannel.send(embed)
  });
}