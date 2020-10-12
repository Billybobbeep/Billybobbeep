const configFile = require('../config.json')
const db = require('quick.db');

module.exports = async (message, Discord, client) => {
  if (!message.guild) return;
  let prefix = db.get(message.guild.id + '.prefix') || '~'
  const embed = new Discord.MessageEmbed()
  const LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
  if (message.author.bot) return;
  if (message.channel.id === configFile.RolesChannel) {
    if (message.author.id === "697194959119319130") return;
    if (!message.author.bot) {
      message.delete();
      message.author.send(`You cannot talk in <#${configFile.RolesChannel}>.`)
    }
  }

  if (message.channel.id === configFile.WelcomeChannel) {
    if (!message.author.bot) {
      message.delete();
      message.author.send(`You cannot talk in <#${configFile.WelcomeChannel}>.`)
    }
  }

  if (message.channel.id === configFile.RulesChannel) {
    if (message.author.id === configFile.SpoinkID || message.author.id === configFile.WibWobID) return;
    if (!message.author.bot) {
      message.delete();
      message.author.send(`You cannot talk in <#${configFile.RulesChannel}>.`)
    }
  }

  //Invite link detecting
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  embed.setTitle(`Billybobbeep | Invite Links`);
  embed.setTimestamp();
  embed.setColor('#dbbf70');

  if (message.content.toLowerCase().includes('discord.gg') || message.content.toLowerCase().includes('discord.com/invite')) {
    message.delete()
    embed.setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
      `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
      `Thanks, the Squiddies Staff Team.`);
    await message.author.send(embed);

    embed.setTitle(`Invite Link Detected`);
    embed.setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
      `**Message ID:** ${message.id}\n\n` +
      `**Channel:** ${message.channel}\n` +
      `**Channel ID:** ${message.channel.id}\n\n` +
      `**Author:** ${message.author}\n` +
      `**Author Tag:** ${message.author.tag}\n` +
      `**Author ID:** ${message.author.id}\n`)
      try {
        await LoggingChannel.send(embed)
      } catch {
        console.log(`${message.guild.name} has an invalid logging channel ID`)
      }
  }

  /*if (message.attachments.size > 0) {
      if (message.author.id != '724629665871822950') return;
      var countDownDate = new Date("October 3, 2020 15:00:00").getTime();
      var currentTime = new Date().getTime();
 
            var timeDifference = countDownDate - currentTime;
 
            var days = Math.floor(timeDifference
                / (1000 * 60 * 60 * 24));
 
            var hours = Math.floor((timeDifference %
                (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
 
            var minutes = Math.floor((timeDifference %
                (1000 * 60 * 60)) / (1000 * 60));
 
            var seconds = Math.floor((timeDifference %
                (1000 * 60)) / 1000);
    if (timeDifference > 0) {
        message.delete()
    embed.setTitle('Image detection')
    embed.setDescription(message.author.tag + ` attempted to send a image in ${message.channel}`);
    await LoggingChannel.send(embed);
    embed.setTitle('Billybobbeep | Image Detection')
    embed.setDescription(`You cannot send images in ${message.guild} for another:\n**${days}** days, **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds.\nReason: Maximum warnings.`)
    message.author.send(embed)
    }
}*/
}