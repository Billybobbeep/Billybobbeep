module.exports = {
  name: 'purge',
  description: 'Delete alot of messages at once.',
  guildOnly: true,
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const configFile = require('../../structure/config.json');
    const db = require('../../structure/global.js').db;
    const logging = require('../../utils/functions.js').logging;
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    function purgeCmd() {
      if (isNaN(args[1])) return message.channel.send('You have entered an invalid number.');
      if (args[1] > 100) return message.channel.send('Please enter a number below 100.');
      if (args[1] < 2) return message.channel.send('Please enter a number more than 1.');
      var msg1;
      message.delete()
      message.channel.bulkDelete(args[1])
        .then(messages => {
          async function main() {
            msg1 = await message.channel.send(`Deleted ${messages.size}/${args[0]} messages.`);

            const embed = new Discord.MessageEmbed()
            embed.setTitle(`Purged Messages`)
            embed.setDescription(`**Channel:** ${message.channel}\n` +
                                `**Messages Purged:** ${messages.size}\n\n` +
                                `**Moderator:** ${message.author}\n` +
                                `**Moderator Tag:** ${message.author.tag}\n` +
                                `**Moderator ID:** ${message.author.id}\n`)
            embed.setTimestamp()
            embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)

            logging(embed, message, client);

            msg1.delete({ timeout: 3000 })
          }
          main()
        })
        .catch(() => message.channel.send('Something went wrong, please ensure the messages are not over 2 weeks old.'));
    }
    var debounce = false;

    if (message.member.hasPermission('MANAGE_MESSAGES') || message.member.hasPermission('ADMINISTRATOR')) {
      purgeCmd()
      debounce = true;
    } else if (db.get(message.guild.id + '.modRole')) {
      if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
        purgeCmd()
        debounce = true;
      }
      if (debounce === false) {
        message.channel.send('You do not have the premissions to run this command.')
      }
    }
  }
}