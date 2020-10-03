const Discord = require('discord.js')

module.exports = async (client) => {
    const configFile = require('../../config.json')
    if (configFile.talk2billyEnabled === true) {

    } else {
        client.on('message', async message => {
            if (message.channel.id != configFile.talk2billy) return;
            const embed = new Discord.MessageEmbed()
            .setTitle('Billybobbeep | Talk to Billy')
            .setDescription('Talk to Billy has been disabled.')
            message.channel.send(embed)
        });
    }
}