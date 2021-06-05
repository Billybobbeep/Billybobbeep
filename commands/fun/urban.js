const Discord = require('discord.js');
const urban = require('urban');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = {
    name: 'urban',
    aliases: ['search', 'dictionary', 'dict'],
    description: 'Search the dictionary for a word',
    catagory: 'generator',
    guildOnly: true,
    options: [{ name: 'word', description: 'A word to search in the dictionary.', type: 3, required: true }],
    /**
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {objects} client The bots client
     */
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
                urban(message.data.options[0].value).first(async json => {
                    if (!json) return require('../../utils/functions').slashCommands.reply(message, client, 'The word ' + interaction.data.options[0].value + ' does not exist');
                    const embed = new Discord.MessageEmbed()
                        .setTitle(json.word)
                        .setDescription((json.definition).split('[').join('').split(']').join(''))
                        .addField('Upvotes', json.thumbs_up || 0, true)
                        .addField('Downvotes', json.thumb_down || 0, true)
                        .setFooter('Billybobbeep is not responsible for what you search | Written by: ' + (json.author || 'Unknown'))
                        .setColor(result.embedColor)
                    require('../../utils/functions').slashCommands.reply(message, client, embed);
                });
            });
        }
    }
}