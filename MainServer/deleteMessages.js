module.exports = async(client) => {

const Discord = require(`discord.js`);
const configFile = require('../config.json')
let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
let prefix = configFile.prefix;

let command;
let pinned;

    client.on('messageDelete', message => {
        let msg = message.content.toLowerCase();
        
        if (message.guild.id !== "733442092667502613") return;
        if (message.author.bot) return;
        if (msg.startsWith(prefix + `purge`)) return;
        if (message.content === null) {
            const embed = new Discord.MessageEmbed()
                .setTitle(`Message Deleted`)
                .setDescription(`
                        **Content:** *This message provided no text.*
                        **Message ID:** ${message.id}
                        **Channel:** ${message.channel}\n
                        **Author:** ${message.author}
                        **Author Tag:** ${message.author.tag}
                        **Author ID:** ${message.author.id}\n
                        **Command:** ${command}
                        **Pinned:** ${pinned}`)
                .setTimestamp()
        LoggingChannel.send(embed)
        }

        if (msg.startsWith(prefix)) {
            command = true
        } else {
            command = false
        }
        if (message.pinned) {
            pinned = true
        } else {
            pinned = false
        }

        const embed = new Discord.MessageEmbed()
        .setTitle(`Message Deleted`)
        .setDescription(`
                        **Content:** ${message.content}
                        **Message ID:** ${message.id}
                        **Channel:** ${message.channel}\n
                        **Author:** ${message.author}
                        **Author Tag:** ${message.author.tag}
                        **Author ID:** ${message.author.id}\n
                        **Command:** ${command}
                        **Pinned:** ${pinned}`)
        .setTimestamp()
        .setColor("#d9a9d5")
        LoggingChannel.send(embed)
    })
}