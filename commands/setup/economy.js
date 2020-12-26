const { MessageEmbed } = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = (message, prefix, embedColor) => {
    let args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    if (!args[2] || args[2].toLowerCase() === 'help') {
        const embed = new MessageEmbed()
            .setTitle('Billybobbeep | Setup Command')
            .setDescription(`With this command you can turn off economic commands in your server.\n\n**Usage:**\nTo turn off economic commands: \`${prefix}setup ${args[1]} off\`\nTo turn on economic commands: \`${prefix}setup ${args[1]} on\``)
            .setColor(`${embedColor}`)
            .setTimestamp()
            .setFooter(`Requested by: ${message.author.tag}`)
        return message.channel.send(embed)
    }
    guildData.findOne({ guildId: message.guild.id }).then(result => {
        if (args[2].toLowerCase() === 'reset' || args[2].toLowerCase() === 'on') {
            if (!result.ecoEnabled) {
                guildData.findOneAndUpdate({ guildId: message.guild.id }, { ecoEnabled: true }).then(() => {
                    message.channel.send('Economic commands has been turned on');
                });
            } else {
                message.channel.send('Economic commands is already on');
            }
        }

        if (args[2] === 'off' && !result.ecoEnabled) return message.channel.send('Economic commands are already turned off');
        guildData.findOneAndUpdate({ guildId: message.guild.id }, { ecoEnabled: false }).then(() => {
            message.channel.send('Economic commands has now been turned off')
        });
    });
}