const configFile = require('../config.json')

module.exports = async (member) => {
  if (configFile.WelcomeChannelModeration === false) return;
  const channel = member.guild.channels.cache.find(ch => ch.id === configFile.WelcomeChannel);
  if (!channel) return;
  channel.send(`Welcome ${member} to the server! (${member.user.tag})`);
  if (configFile.AutoRole === false) return;
  member.roles.add(configFile.AutoRoleId)
}