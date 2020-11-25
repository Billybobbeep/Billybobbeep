module.exports = {
  name: 'help',
  description: 'Get help whilst using billybobbeep.',
  execute(message, prefix, client) {
    const Discord = require('discord.js');
    const db = require('../structure/global.js').db;;

    const embed = new Discord.MessageEmbed()
      .setTitle('Billybobbeep | Help')
      .setDescription(`Thank you for using ${client.user.username}!\n` +
        '\n' +
        'Below are some commands to get you started:\n' +
        `${prefix}cmds\n` +
        '*Prompts you to view the commands.*\n' +
        `${prefix}info\n` +
        '*Shows info about the bot.*\n' +
        `${prefix}credits\n` +
        '*Provides you with Billybobbeep\'s development credits*\n' +
        `${prefix}help\n` +
        '*Shows a quick briefing.*\n' +
        `${prefix}setup\n` +
        '*To set up billybobbeep in your own server.*')
      .setFooter(`Requested by: ${message.author.tag}`)
      .setTimestamp()
      message.guild ? embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`) : embed.setColor('#447ba1');
    message.channel.send(embed);
  }
}