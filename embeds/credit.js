const Discord = require('discord.js');
const db = require('../structure/global.js').db;

module.exports = {
  name: 'credit',
  description: 'View billybobbeep\'s credits',
  aslias: ['credits'],
  execute (message, prefix, client) {
    const embed = new Discord.MessageEmbed()
    embed.setTitle('Billybobbeep | Credits')
    embed.setDescription('Thank you for using Billybobbeep!\n' +
      '\n' +
      `Created by: **${client.users.cache.get('697194959119319130').tag}**\n` +
      `Scripted by: **${client.users.cache.get('697194959119319130').tag}** & **${client.users.cache.get('303097521314725890').tag}**\n` +
      `Name development & suggestions: **${client.users.cache.get('441613173003649028').tag}**\n\n` +
      'If you would like to view more, feel free to check out [our website](https://billybobbeep.tyler2p.repl.co/home)');
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
    embed.setFooter(`Requested by: ${message.author.tag}`);
    embed.setTimestamp();
    message.channel.send(embed);
  }
}