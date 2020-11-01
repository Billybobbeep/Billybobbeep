const Discord = require(`discord.js`);
const configFile = require('../../structure/config.json');
const db = require('../../data/databaseManager/index.js');

module.exports = {
    name: 'members',
    description: 'View the member stats for the server.',
    guildOnly: true,
    execute (message, prefix, client) {
        let member = message.guild.members;
        let offline = member.cache.filter(m => m.user.presence.status === 'offline').size,
            online = member.cache.filter(m => m.user.presence.status === 'online').size,
            idle = member.cache.filter(m => m.user.presence.status === 'idle').size,
            dnd = member.cache.filter(m => m.user.presence.status === 'dnd').size,
            robot = member.cache.filter(m => m.user.bot).size,
            total = message.guild.memberCount;
            
        const embed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Server Members')
        .addField('Total Members:', `${total}`, true)
        .addField('Offline Members:', `${offline}`, true)
        .addField('Online Members:', `${online}`, true)
        .addField('Idle Members:', `${idle}`, true)
        .addField('DND Members:', `${dnd}`, true)
        .addField('Bots:', `${robot}`, true)
        .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(embed)
    }
}