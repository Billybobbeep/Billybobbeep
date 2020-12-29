const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const guildData = require('../../events/client/database/models/guilds.js');

//[Main letables]\\
let title;
let description;
let color;
let channel;
let autherValid;

module.exports = {
    name: 'poll',
    description: 'Send a poll',
    catagory: 'generator',
    guildOnly: true,
    execute (message, prefix, client) {
        guildData.findOne({ guildId: message.guild.id }).then(async result => {
            let args = message.content.slice(prefix.length).trim().split(/ +/g);
            let pollChannel = message.mentions.channels.first();
            let pollDescription = args.slice(2).join(' ')

            let embedPoll = new Discord.MessageEmbed()
                .setTitle('New Poll!')
                .setDescription(pollDescription)
                .setColor(result.embedColor)
                .setFooter(`Poll created by: ${message.author.tag}`)
            let msgEmbed = await pollChannel.send(embedPoll);
            await msgEmbed.react('👍');
            await msgEmbed.react('👎');
        });
    } 
}   