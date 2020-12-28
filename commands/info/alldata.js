const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
module.exports = {
  name: 'alldata',
  description: 'View all of the data from the database',
  guildOnly: true,
  disabled: true,
  async execute (message, prefix, client) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);

      embed.setTitle('Total Guild List:');
      embed.setFooter(`${client.users.cache.size} members`);
      var count = 0;
      client.guilds.cache.forEach(guild => { count++; embed.addField(`Guild ${count}`, guild.name) });
      message.channel.send(embed);
  }
}