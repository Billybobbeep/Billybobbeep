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
        .setDescription(`With this command you can choose whether billy deletes invite links or ignores them.\n\n**Usage:**\nTo delete all invite links automatically: \`${prefix}setup ${args[1]} on\`\nTo ignore invite links: \`${prefix}setup ${args[1]} off\``)
        .setColor(embedColor)
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        message.channel.send(embed)
    }

    guildData.findOne({ guildId: message.guild.id }).then(result => {
        if (args[2] && args[2].toLowerCase() === 'reset' || args[2] && args[2].toLowerCase() === 'off') {
            if (result.inviteLinks) {
                result.inviteLinks = false;
                result.save().then(() => {
                    message.channel.send('I will no longer delete invite links');
                });
            } else {
                message.channel.send('This feature is already turned off');
            }
        } else if (args[2] && args[2].toLowerCase() === 'on') {
            if (!result.inviteLinks) {
                result.inviteLinks = true;
                result.save().then(() => {
                    message.channel.send('I will no longer ignore invite links');
                });
            } else {
                message.channel.send('This feature is already turned on');
            }
        } else {
            message.channel.send('Invalid arguments provided');
        }
    });
}