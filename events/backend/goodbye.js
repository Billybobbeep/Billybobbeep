const guildData = require('../client/database/models/guilds');

module.exports = async (member) => {
  guildData.findOne({ guildId: member.guild.id }).then(result => {
    if (result.welcomeChannel) {
      const channel = member.guild.channels.cache.find(ch => ch.id === result.welcomeChannel);
      if (!channel) return;
      channel.send(`${member} left the server. (${member.user.tag})`);
    }
    if (!member.user.bot) {
      const guildMemberData = require('../client/database/models/guildMembers.js');
      guildMemberData.findOne({ guildId: member.guild.id, memberId: member.user.id }).then(memberResult => { if (memberResult) memberResult.delete() });
    }
  });
}