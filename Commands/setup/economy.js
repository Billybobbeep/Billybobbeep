const { MessageEmbed } = require('discord.js')
module.exports = (message, db) => {
    let prefix = db.get(message.guild.id + '.prefix') || '~'
    let args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

    if (!args[2] || args[2].toLowerCase() === 'help') {
    const embed = new MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can turn off economic commands in your server.\n\n**Usage:**\nTo turn off economic commands: \`${prefix}setup ${args[1]} off\`\nTo turn on economic commands: \`${prefix}setup ${args[1]} on\``)
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    .setTimestamp()
    .setFooter(`Requested by: ${message.author.tag}`)
    return message.channel.send(embed)
    }

    if (args[2].toLowerCase() === 'reset' || args[2].toLowerCase() === 'on') {
        if (db.get(message.guild.id + '.ecoEnabled') === false) {
            db.delete(message.guild.id + '.ecoEnabled');
            return message.channel.send('Economic commands has been turned on.')
        } else {
            return message.channel.send('Economic commands is already on.');
        }
    }

    if (args[2] === 'off' && db.get(message.guild.id + '.ecoEnabled')) return message.channel.send(`Economic commands are already turned off.`)
    db.set(message.guild.id + '.ecoEnabled', false)
    message.channel.send(`Economic commands has now been turned off.`)
}