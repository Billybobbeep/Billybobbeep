const configFile = require('../../../config.json')
const path = require('path')

module.exports = async (message, client, ) => {
    let data = message.guild.id || {};

    if (!message.member.voice.channel) return message.channel.send(`You must be in a voice channel to run this command.`)

    if (!data.connection) {
        data.connection = await message.member.voice.channel.join();
        message.channel.send("I am in your voice channel!")
    }

    data.dispatcher = await data.connection.play(path.join(__dirname, 'Intro.mp3'))
}