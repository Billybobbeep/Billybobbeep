const configFile = require('../../../config.json')

module.exports = async (message, client, ) => {
    let data = message.guild.id || {};

    if (!message.member.voice.channel) return message.channel.send(`You must be in a voice channel to run this command.`)

    if (!data.connection) {
        data.connection = await message.member.voice.channel.leave();
        message.channel.send("I have left your voice channel.")
    }
}