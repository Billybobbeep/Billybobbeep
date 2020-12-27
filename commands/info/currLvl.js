module.exports = {
  name: 'currlvl',
  description: 'View a users current level',
  alias: ['cl', 'xp', 'cx'],
  catagory: 'info',
  usage: 'currlvl [user]',
  guildOnly: true,
  execute(message, prefix, client) {
    const db = require('../../structure/global.js').db;
    const Discord = require('discord.js');

    var prefix = db.get(message.guild.id + '.prefix') || '~'
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let user = message.guild.members.cache.get(args[1]) || message.mentions.users.first() || message.author
    let currLvl = db.get(message.guild.id + '_' + user.id + '.level') || 0;

    if (db.get(message.guild.id + '.levelsEnabled') === false) return message.channel.send(`Levels have been disabled for this server);
    if (user.username === undefined) user = user.user
    if (user.bot) return message.channeol.send(`Bots cannot have levels);
    const embed = new Discord.MessageEmbed();
    embed.setTitle('Billybobbeep | Levelling System');
    embed.setTimestamp();
    embed.setFooter(`Requested by: ${message.author.tag}`);
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
    embed.setDescription(`${user.username[0].toUpperCase()}${(user.username).substring(1).toLowerCase()}'s level is currently ${currLvl}`);
    message.channel.send(embed);
  }
}