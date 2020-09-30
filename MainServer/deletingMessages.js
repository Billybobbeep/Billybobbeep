const configFile = require('../config.json')
let prefix = configFile.prefix;

module.exports = async(message, Discord, client) => {
  
  const embed = new Discord.MessageEmbed()
  const LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
    if(message.author.bot) return;
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
      await LoggingChannel.send(embed)
    }
}