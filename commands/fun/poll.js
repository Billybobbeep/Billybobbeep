const Discord = require('discord.js');
const configFile = require('../../utils/config.json');
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
    //options: [{ name: 'description', description: 'The poll description', type: 3, required: true }, { name: 'title', description: 'The poll title', type: 3, required: false }, { name: 'channel', description: 'The channel to send the poll in', type: 7, required: false }],
    /**
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {objects} client The bots client
     */
    execute (message, prefix, _client) {
        if (!message.data) {
            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                let args = message.content.slice(prefix.length).trim().split(/ +/g);
                let pollChannel = message.mentions.channels.first();
                let pollDescription = args.slice(2).join(' ');

                let embedPoll = new Discord.MessageEmbed()
                    .setTitle('New Poll!')
                    .setDescription(pollDescription)
                    .setColor(result.embedColor)
                    .setFooter(`Poll created by: ${message.author.tag}`)
                let msgEmbed = await pollChannel.send(embedPoll);
                await msgEmbed.react('👍');
                await msgEmbed.react('👎');
            });
        } else {
            guildData.findOne({ guildId: message.guild_id }).then(async result => {
                let pollChannel = message.data.options.channel || message.channel_id

                let embedPoll = new Discord.MessageEmbed()
                    .setTitle(message.data.options.title || 'New Poll!')
                    .setDescription(message.data.options.description)
                    .setColor(result.embedColor)
                    .setFooter(`Poll created by: ${message.author_tag}`)
                let msgEmbed = await pollChannel.send(embedPoll);
                await msgEmbed.react('👍');
                await msgEmbed.react('👎');
            });
        }
    }
}