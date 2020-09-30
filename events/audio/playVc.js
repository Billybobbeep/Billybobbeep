const configFile = require('../../config.json');
module.exports = async (client) => {
    client.on('message', async message => {
        if(message.content.toLowerCase() === configFile.prefix + "startevent") {
            /*var voiceChannel = message.member.voice.channel; 
            if (!voiceChannel)
                return message.channel.send("You are not in a voice channel.")
            else voiceChannel.join().then(connection => {
                const dispatcher = connection.play('./audio.mp3');
                dispatcher.on("end", end => voiceChannel.leave());
            }).catch(err => console.log(err));
        }*/
        const yts = require('yt-search');
        const ytdl = require('ytdl');
        let args = message.content
        .trim()
        .split(/ +/g);
        let video = args[0]
        let connection = await message.member.voice.channel.join()
        connection.play(ytdl(video.url))
    }
    });
}