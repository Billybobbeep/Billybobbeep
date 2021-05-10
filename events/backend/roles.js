const logging = require('../../utils/functions').logging
const Discord = require('discord.js');

module.exports = async (oldMember, newMember, client) => {
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#447ba1');
        embed.setAuthor(newMember.user.tag, newMember.user.avatarURL());

        oldMember.roles.cache.forEach(role => {
            if (!newMember.roles.cache.has(role.id))
                embed.addField('Role Removed', role);
        });
        logging(embed, newMember, client);
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        const embed = new Discord.MessageEmbed();
        embed.setColor('#447ba1');
        embed.setAuthor(newMember.user.tag, newMember.user.avatarURL());
        
        newMember.roles.cache.forEach(role => {
            if (!oldMember.roles.cache.has(role.id))
                embed.addField('Role Added', role);
        });
        logging(embed, newMember, client);
    }
}