const configFile = require('../config.json')

module.exports = async(member) => {
    const channel = member.guild.channels.cache.find(ch => ch.id === configFile.WelcomeChannel);
    if (!channel) return;
    channel.send(`${member} left the server. (${member.user.tag})`);
}