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
        .setDescription(`With this command you can set up a auto role.\nA auto role is a role that is given to a user after they join the server.\n\n**Usage:**\nTo set up a auto role: \`${prefix}setup ${args[1]} [role]\`\nTo reset the role: \`${prefix}setup ${args[1]} reset\``)
        .setColor(embedColor)
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
    return message.channel.send(embed)
    }
    if (args[2].toLowerCase() === 'reset') {
        guildData.findOneAndUpdate({ guildId: message.guild.id }, { autoRole: '' }).then(() => {
            return message.channel.send('Removed auto role from the database');
        });
    }
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if (!role) return message.channel.send(`Could not find the role \`${args[2]}\``);
    guildData.findOne({ guildId: message.guild.id }).then(result => {
        if (result.autoRole && result.autoRole === role.id) return message.channel.send(`Your auto role is already set as ${role}`);
        guildData.findOneAndUpdate({ guildId: message.guild.id }, { autoRole: role }).then(() => {
            message.channel.send(`Your auto role is now set up as ${role}`);
        });
    });
}
