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
        guildData.findOne({ guildId: message.guild.id }).then(result => {
            result.autoRoles = [];
            result.save();
            message.channel.send('Removed auto role from the database');
        });
    } else {
      let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
      if (!role) return message.channel.send(`I could not find the role \`${args[2]}\``);
      guildData.findOne({ guildId: message.guild.id }).then(result => {
        let roles = [];
        if (result.autoRoles && typeof result.autoRoles === 'array') {
          for (var i=0; i < (result.autoRoles).length; i++) {
            roles.push(result.autoRoles[i]);
          }
        }
        if (roles && roles.length > 0 && roles.includes(role.id)) return message.channel.send(`${role} is already a auto role`);
        roles.push(role.id);
        result.autoRoles = roles;
        result.save().then(() => {
            message.channel.send(`${role} has been set as an auto role`);
        });
      });
    }
}
