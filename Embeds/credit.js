const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    const embed = new Discord.MessageEmbed()
    embed.setTitle("Billybobbeep | Credits")
    embed.setDescription("Thank you for using Billybobbeep!\n" +
    "\n" +
    "Created by: **Spoink#2793**\n" +
    "Scripted by: **Spoink#2793** & **Will Os#9857**\n" +
    "Name development & suggestions: **wibbleywobbley♡#1564**\n\n" +
    "It has been a huge pleasure to script & develop Billybobbeep and a great thanks for all the support I have received throughout the development processes. However, Billybobbeep is not finished yet! We are working towards the brand-new version 2.0." +
    "\n\n If you would like to view more, feel free to check out our website: https://billybobbeep-1.tyler2p.repl.co/home")
    embed.setColor("7aa0f6")
    embed.setFooter(`Requested by: ${message.author.tag}`)
    embed.setTimestamp()
    message.channel.send(embed)
}