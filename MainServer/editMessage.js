module.exports = async(client) => {

    const Discord = require(`discord.js`);
    const configFile = require('../config.json')
    let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
    let prefix = configFile.prefix;
    
    client.on('messageUpdate', async (oldMessage, newMessage) => {
        if (oldMessage.guild.id !== configFile.ServerId) return;
            if (oldMessage.author.bot) return;
            if (oldMessage.content === null) {
                const embed = new Discord.MessageEmbed()
            .setTitle(`Message Edited`)
            .setDescription(`**Old Content:** ${oldMessage.content}\n` +
            `**New Content:** *This message provided no text.*\n` +
            `**Channel:** ${oldMessage.channel}\n` +
            `**Message ID:** ${oldMessage.id}\n\n` +
            `**Author:** ${oldMessage.author}\n` +
            `**Author Tag:** ${oldMessage.author.tag}\n` +
            `**Author ID:** ${oldMessage.author.id}`)
            .setTimestamp()
            .setColor("#84faaa")
            LoggingChannel.send(embed)
            }

            const embed = new Discord.MessageEmbed()
            .setTitle(`Message Edited`)
            .setDescription(`**Old Content:** ${oldMessage.content}\n` +
            `**New Content:** ${oldMessage.content}\n` +
            `**Channel:** ${oldMessage.channel}\n` +
            `**Message ID:** ${oldMessage.id}\n\n` +
            `**Author:** ${oldMessage.author}\n` +
            `**Author Tag:** ${oldMessage.author.tag}\n` +
            `**Author ID:** ${oldMessage.author.id}`)
            .setTimestamp()
            .setColor("#84faaa")
            LoggingChannel.send(embed)
        })
    }