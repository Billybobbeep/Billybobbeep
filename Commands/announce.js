const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    if (message.content.toLowerCase() == prefix + "announce") {
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
                q2.stop();
            })
        })
    }
}