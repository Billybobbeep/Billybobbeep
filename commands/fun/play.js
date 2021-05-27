const ytdl = require('ytdl-core');

module.exports = {
    /*name: 'play',
    description: 'Play a song in a voice channel',
    alias: ['stop', 'tts'],
    catagory: 'general',
    guildOnly: true,*/
    execute (message, prefix, client) {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (message.content.startsWith(`${prefix}play`)) {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel)
        return message.channel.send('You need to be in a voice channel to use this command');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT'))
        return message.channel.send(
            'I don\'t have permissions to connect to a voice channel.'
        );
        if (!permissions.has('SPEAK'))
        return message.channel.send(
            'I don\'t have permissions to speak in a voice channel'
        );
        if (!args[1]) return message.channel.send('Please provide a youtube link to play');
        if (!args[1].toLowerCase().includes('you')) return message.channel.send('Please provide a valid youtube link')

        let queue = []

        /*let connection = await voiceChannel.join();
        message.channel.send('Now Playing: ' + args[1]);
        connection.voice.setSelfDeaf(true);

    const dispatcher = connection
    .play(ytdl(args[1]))
    .on('finish', () => {
        voiceChannel.leave();
    }).on('error', (error) => {
        message.channel.send('There was an error: ' + error.toString().replace('error:', ''));
        voiceChannel.leave()
    });
    dispatcher.setVolumeLogarithmic(5 / 5);*/

        if (queue.length < 1) {
            queue.push(args[1]);
            playNext();
        } else { queue.push(args[1]); }

        async function playNext() {
            let connection = await voiceChannel.join();
            message.channel.send('Now Playing: ' + queue[0]);
            connection.voice.setSelfDeaf(true);
            const dispatcher = connection
            .play(ytdl(queue[0]))
            .on('finish', () => {
                queue.shift();
                if (queue.length > 0) {
                    playNext(); 
                } else {
                    voiceChannel.leave()
                }
            })
            .on('error', (error) => {
                message.channel.send('There was an error: ' + error.toString().replace('error:', ''));
                if (queue.length > 0) {
                    playNext(); 
                } else {
                    voiceChannel.leave();
                }
            });
            connection.voice.setSelfDeaf(true);
            dispatcher.setVolumeLogarithmic(5 / 5);
        }

    } else if (message.content.startsWith(`${prefix}stop`)) {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel to stop the song');
    message.member.voice.channel.leave();
    }/* else if (message.content.startsWith(`${prefix}tts`)) {
        function connect(voiceChannel, text) {
            const say = require('say');
            const fs = require('fs');
            if (!fs.existsSync('./temp')) {
                fs.mkdirSync('./temp');
            }
            function makeid(length) {
                let result = '';
                let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let charactersLength = characters.length;
                for ( let i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                return result;
            }         
            const timestamp = new Date().getTime();
            let string = `${makeid(5)}_${timestamp}`
            const soundPath = `./temp/${string}.wav`;
            say.export(text, null, 1, soundPath, (err) => {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    voiceChannel.join().then((connection) => {
                        connection.voice.setSelfDeaf(true);
                        connection.play(soundPath).on('end', () => {
                            connection.disconnect();
                            fs.unlinkSync(soundPath);
                        }).on('error', (err) => {
                            console.error(err);
                            connection.disconnect();
                            fs.unlinkSync(soundPath);
                        }).on('finish', () => {
                            voiceChannel.leave();
                        });
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            });
        }
        if (message.attachments.size > 0) return message.channel.send('You cannot send an attachment as a tts message');
        if (message.content.toLowerCase().includes('https://') || message.content.toLowerCase().includes('http://') || message.content.toLowerCase().includes('www') || message.content.toLowerCase().includes('.com') || message.content.toLowerCase().includes('.co.uk')) return ('You cannot send a link as a tts message');
        if (!args[1]) return message.channel.send('Please provide a message to send')
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.channel.send('You need to be in a voice channel to use this command');
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if (!permissions.has('CONNECT')) return message.channel.send('I don\'t have permissions to connect to a voice channel');
        if (!permissions.has('SPEAK')) return message.channel.send('I don\'t have permissions to speak in a voice channel');
        let member = message.guild.members.cache.get(client.user.id);
        if (member.voice.channel) return message.channel.send('You cannot send TTS messages whilst I am playing music in a voice channel');
        message.react('🔊');
        connect(voiceChannel, args.slice(1).join(' '))
        }*/
    }
}