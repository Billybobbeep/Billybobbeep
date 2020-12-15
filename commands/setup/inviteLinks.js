module.exports = (message, db) => {
    const { MessageEmbed } = require('discord.js');

    let prefix = db.get(message.guild.id + '.prefix') || '~'
    let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
    
    if (!args[2] || args[2].toLowerCase() === 'help') {
        const embed = new MessageEmbed()
        .setTitle('Billybobbeep | Setup Command')
        .setDescription(`With this command you can choose whether billy deletes invite links or ignores them.\n\n**Usage:**\nTo delete all invite links automatically: \`${prefix}setup ${args[1]} on\`\nTo ignore invite links: \`${prefix}setup ${args[1]} off\``)
        .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        .setTimestamp()
        .setFooter(`Requested by: ${message.author.tag}`)
        message.channel.send(embed)
    }

    if (args[2] && args[2].toLowerCase() === 'reset' || args[2] && args[2].toLowerCase() === 'off') {
        if (db.get(message.guild.id + '.inviteLinks')) {
        db.delete(message.guild.id + '.inviteLinks');
        message.channel.send('I will no longer delete invite links.');
        } else {
        message.channel.send('This feature was already turned off.');
        }
    } else if (args[2] && args[2].toLowerCase() === 'on') {
        if (!db.get(message.guild.id + '.inviteLinks')) {
            message.channel.send('I will no longer ignore invite links.');
        } else {
            message.channel.send('This feature is already turned on.');
        }
    } else {
        message.channel.send('Invalid arguments provided');
    }
}