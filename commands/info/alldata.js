const { MessageEmbed } = require('discord.js');
const embed = new MessageEmbed();
module.exports = {
  name: 'alldata',
  description: 'View all of the data from the database.',
  guildOnly: true,
  spoinkOnly: true,
  async execute (message, prefix, client) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    const db = require('../../data/databaseManager/index.js');

    if (args[1] && args[1] === 'guild') {
      embed.setTitle('Total Guild List:')
      var count = 0;
      client.guilds.cache.forEach(guild => { count++; embed.addField(`Guild ${count}`, guild.name) });
      message.channel.send(embed);
    } else {
      console.log(db.fetchAll());
      message.channel.send('All of the data from the database is currently in the terminal').then(msg => { setTimeout(() => { msg.delete()}, 6000)});
    }
  }
}