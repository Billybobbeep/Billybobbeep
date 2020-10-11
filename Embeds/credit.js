const Discord = require(`discord.js`);

module.exports = async (message) => {
  const embed = new Discord.MessageEmbed()
  embed.setTitle("Billybobbeep | Credits")
  embed.setDescription("Thank you for using Billybobbeep!\n" +
    "\n" +
    "Created by: **Spoink#2793**\n" +
    "Scripted by: **Spoink#2793** & **Will Os#9857**\n" +
    "Name development & suggestions: **wibbleywobbley♡#1564**\n\n" +
    "If you would like to view more, feel free to check out our website: https://billybobbeep.tyler2p.repl.co/home")
  embed.setColor("7aa0f6")
  embed.setFooter(`Requested by: ${message.author.tag}`)
  embed.setTimestamp()
  message.channel.send(embed)
}