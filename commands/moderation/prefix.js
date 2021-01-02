const guildData = require('../../events/client/database/models/guilds.js');

module.exports = {
  name: 'prefix',
  description: 'Set up a new server prefix',
  guildOnly: true,
  catagory: 'moderation',
  usage: 'prefix [new-prefix]',
  execute (message, prefix, client) {
    guildData.findOne({ guildId: message.guild.id }).then(result => {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need the `Administrator` permissions to use this command');
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      let newPrefix = args[1].toLowerCase();
      if (!newPrefix && result.prefix === '~') return message.channel.send('Please specify a prefix');
      if (!newPrefix && !result.prefix) return message.channel.send('Please specify a prefix');
      if (!newPrefix) {
        result.prefix = '~';
        result.save().then(() => {
          message.channel.send('Your prefix has been set to `~`');
        });
      } else {
        if (newPrefix === prefix) return message.channel.send(`Your prefix is already ${newPrefix}`);
        if (!isNaN(newPrefix)) return message.channel.send('The prefix cannot be a number');

        result.prefix = newPrefix;
        result.save().then(() => {
          message.channel.send(`This servers prefix has been set to \`${newPrefix}\``);
        });
      }
    });
  }
}