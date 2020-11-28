const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const db = require('../../structure/global.js').db;

//[Main Varables]\\
let title;
let description;
let color;
let channel;
let autherValid;

module.exports = {
    name: 'poll',
    description: 'Send a poll.',
    catagory: 'generator',
    guildOnly: true,
    async execute (message, prefix, client) {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(2).join(' ')

        let embedPoll = new Discord.MessageEmbed()
            .setTitle('New Poll!')
            .setDescription(pollDescription)
            .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
            .setFooter(`Poll created by: ${message.author.tag}`)
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react('👍')
        await msgEmbed.react('👎')
    } 
}   