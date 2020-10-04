const Discord = require('discord.js');
const embed = new Discord.MessageEmbed().setTitle('Billybobbeep | Talk to Billy');
const settings = require('./settings.json');
const configFile = require('../../config.json');

module.exports.disabled = function (message) {
    if (message.author.bot) return;
    if (message.channel.id != configFile.talk2billy) return;
    embed.setDescription('Talk to Billy has been disabled.')
    embed.setColor('#a18cd1')
    return message.channel.send(embed)
}

module.exports.error = function (message) {
    if (message.author.bot) return;
    if (message.channel.id != configFile.talk2billy) return;
    embed.setDescription('An error has occured.')
    embed.setColor('#a18cd1')
    return message.channel.send(embed)
}