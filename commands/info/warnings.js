const Discord = require('discord.js');
const db = require('quick.db');
var reasons = [];
module.exports = {
  name: 'warnings',
  description: 'View a users warnings.',
  catagory: 'info',
  usage: 'warnings [user]',
  guildOnly: true,
  execute (message, prefix, client) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    var user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
    if (!user) return message.channel.send('Please specify a user.');
    let tWarnings = db.get(message.guild.id + '_' + user.id + '.warnings') || 0
    var count = 0;
    if (user.username === undefined) {
      user = user.user
    }
    if (user.bot) return message.channel.send(`Bots cannot be warned.`);
    if (tWarnings > 0) {
      reasons = reasons = db.get(message.guild.id + '_' + user.id + '.warnReasons');
      if (!reasons) return noWarnings()
      const embed = new Discord.MessageEmbed()
      .setDescription(`${user.username} has **${tWarnings}** warnings.`)
      .setTimestamp()
      .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      .setAuthor(`${user.tag}`)
      reasons.forEach(result => {
        count++;
        embed.addField(`Case #${count}`, result)
      });
      message.channel.send(embed);
    } else {
      noWarnings()
    }

    function noWarnings() {
      const embed = new Discord.MessageEmbed()
      .setDescription(`${user.username} has **${tWarnings}** warnings.`)
      .setTimestamp()
      .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      .setAuthor(`${user.tag}`)
      message.channel.send(embed);
    }
  }
}