const Discord = require('discord.js');
const db = require('../../structure/global.js').db;
const logging = require('../../utils/functions.js').logging;

module.exports = {
  name: 'announce',
  description: 'Announce a message in a different channel.',
  guildOnly: true,
  catagory: 'moderation',
  usage: 'announce',
  execute (message, prefix, client) {
    if (!message.guild) return;
    const embed = new Discord.MessageEmbed()
    embed.setTitle(`Announcement Sent`)
    embed.setTimestamp()
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
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
            logging(embed, message, client);
            q2.stop();
        });
    });
  }
}