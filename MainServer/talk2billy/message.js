const settings = require('./settings.json');
const modules = require('./modules.js')
const configFile= require('../../config.json')

//Settings
let messageHello = ['hello', 'hi', 'morning', 'good morning']
let messageFeeling = ['how are you', 'you good']
let messageBye = ['bye', 'night', 'good night', 'i leaving', 'i\'m leaving', 'i\'m leaving now', 'cya']




module.exports = async (client) => {
    client.on('message', async message => {
        if (message.author.bot) return;
        if (message.channel.id != configFile.talk2billy) return;
        messageHello.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                modules.hello(message)
            }
        });
        messageFeeling.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                modules.feeling(message)
            }
        });
        messageBye.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                modules.bye(message)
            }
        });
    });
}