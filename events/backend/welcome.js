const guildData = require('../client/database/models/guilds');
const guildMemberData = require('../client/database/models/guildMembers');

module.exports = async (member) => {
  guildData.findOne({ guildId: member.guild.id }).then(result => {
    if (result.welcomeChannel) {
      const channel = member.guild.channels.cache.find(ch => ch.id === result.welcomeChannel);
      if (!channel) return;
      channel.send(`Welcome ${member} to the server! (${member.user.tag})`);
    }
    if (result.autoRoles) {
      (result.autoRoles).forEach(roleId => {
        member.roles.add(roleId);
      });
    }
  });
}