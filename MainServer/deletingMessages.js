const configFile = require('../config.json')
const spoink = configFile.SpoinkID;
let prefix = configFile.prefix;
module.exports = async(message, Discord, client) => {
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

    if (message.content.toLowerCase().startsWith('discord.gg') || message.content.toLowerCase().endsWith('discord.gg') ||
    message.content.toLowerCase().startsWith('www.discord.gg') || message.content.toLowerCase().endsWith('www.discord.gg') ||
    message.content.toLowerCase().startsWith('https://discord.gg') || message.content.toLowerCase().endsWith('https://discord.gg') ||
    message.content.toLowerCase().startsWith('https://www.discord.gg') || message.content.toLowerCase().endsWith('https://www.discord.gg') ||
    message.content.toLowerCase().startsWith('https:/www.discord.gg') || message.content.toLowerCase().endsWith('https:/discord.gg') ||
    message.content.toLowerCase().startsWith('w.discord.gg') || message.content.toLowerCase().endsWith('w.discord.gg') ||
    message.content.toLowerCase().startsWith('ww.discord.gg') || message.content.toLowerCase().endsWith('ww.discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
    }
    } 
    if (args[0]) {
        if (args[0].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[1]) {
        if (args[1].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[2]) {
        if (args[2].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[3]) {
        if (args[3].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[4]) {
        if (args[4].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[5]) {
        if (args[5].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[6]) {
        if (args[6].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[7]) {
        if (args[7].startsWith('discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
    }
    if (args[8]) {
        if (args[8].startsWith('discord.gg') ||
        args[8].startsWith('https://discord.gg') ||
        args[8].startsWith('www.discord.gg') ||
        args[8].startsWith('http://discord.gg')) {
        message.delete()
        const embed = new Discord.MessageEmbed()
                .setTitle(`Billybobbeep | Invite Links`)
                .setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
                                `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
                                `Thanks, the Squiddies Staff Team.`)
                .setTimestamp()
        message.author.send(embed)
        const embed2 = new Discord.MessageEmbed()
                  .setTitle(`Invite Link Detected`)
                  .setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
                  `**Message ID:** ${message.id}\n\n` +
                  `**Channel:** ${message.channel}\n` +
                  `**Channel ID:** ${message.channel.id}\n\n` +
                  `**Author:** ${message.author}\n` +
                  `**Author Tag:** ${message.author.tag}\n` +
                  `**Author ID:** ${message.author.id}\n`)
                  .setTimestamp()
                  .setColor('#dbbf70')
        LoggingChannel.send(embed2)
        }
}