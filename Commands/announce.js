const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
  let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
  const embed = new Discord.MessageEmbed()
  embed.setTitle(`Announcement Sent`)
  embed.setTimestamp()
  embed.setColor('#f5d271')
        let filter = m => m.author.id === message.author.id;
        let q1 = new Discord.MessageCollector(message.channel, filter, {
            max: 1
        })
        message.channel.send('What channel would you like to share your announcement in?');

        q1.on('collect', async (message, col) => {
            let channel = message.mentions.channels.first();
            if (!channel) return message.channel.send("Invalid channel, Please run the command again.")
            message.channel.send('What is the message you would like to annouce?')
            q1.stop();
            let q2 = new Discord.MessageCollector(message.channel, filter, {
                max: 1
            })
            q2.on('collect', async (message, col) => {
                channel.send(message.content);
                await message.react('✔');
                embed.setDescription(
                   `**Message:** ${message.content}\n` +
                    `**Message ID:** ${message.id}\n` +
                    `**Channel:** ${channel}\n\n` +
                    `**Moderator:** ${message.author}\n` +
                    `**Moderator Tag:** ${message.author.tag}\n` +
                    `**Moderator ID:** ${message.author.id}\n`
                )
                await LoggingChannel.send(embed)
                q2.stop();
            })
        })
}