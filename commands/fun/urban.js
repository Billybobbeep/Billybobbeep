const Discord = require('discord.js');
const urban = require('urban');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = {
    name: 'urban',
    aliases: ['search', 'dictionary', 'dict'],
    description: 'Search the dictionary for a word',
    catagory: 'generator',
    guildOnly: true,
    options: [{ name: 'word', description: 'A word to search in the dictionary.', type: 3, required: false }],
    execute (message, prefix, client) {
        if (!message.data) {
            guildData.findOne({ guildId: message.guild.id }).then(result => {
                let args = message.content.slice(prefix.length).trim().split(/ +/g);

                urban(args[1]).first(async json => {
                    if (!json) return message.channel.send('The word ' + args[1] + ' does not exist');
                    let embed = new Discord.MessageEmbed()
                        .setTitle(json.word)
                        .setDescription(json.definition)
                        .setColor(result.embedColor)
                        .setFooter('Billybobbeep is not responsible for what you search | Written by: ' + (json.author || 'Unknown'))
                        .addField('Upvotes', json.thumbs_up || 0, true)
                        .addField('Downvotes', json.thumb_down || 0, true)
                    let msgEmbed = await message.channel.send(embed);
                    await msgEmbed.react('👍');
                    await msgEmbed.react('👎');
                });
            });
        } else {
            guildData.findOne({ guildId: message.guild_id }).then(result => {
                urban(message.options.word).first(async json => {
                    if (!json) return message.channel.send('The word ' + message.options.word + ' does not exist');
                    let embed = new Discord.MessageEmbed()
                        .setTitle(json.word)
                        .setDescription(json.definition)
                        .setColor(result.embedColor)
                        .setFooter('Billybobbeep is not responsible for what you search | Written by: ' + (json.author || 'Unknown'))
                        .addField('Upvotes', json.thumbs_up || 0, true)
                        .addField('Downvotes', json.thumb_down || 0, true)
                    let msgEmbed = await message.channel.send(embed);
                    await msgEmbed.react('👍');
                    await msgEmbed.react('👎');
                });
            });
        }
    }
}