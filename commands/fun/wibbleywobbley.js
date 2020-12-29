const guildData = require('../../events/client/database/models/guilds.js');
module.exports = {
  name: 'wibbleywobbley',
  description: ';)',
  alias: ['wibwob'],
  guildOnly: true,
  catagory: 'general',
  explit: true,
  execute (message, prefix, client) {
    guildData.findOne({ guildId: message.guild.id }).then(result => {
      if (result.cleanFilter)
        return message.channel.send('This server has been set to clean content only');

      message.channel.send("suck\nmy");
      message.channel.send("dick\nyou");
      message.channel.send("stupid\nbitch");
    });
  }
}