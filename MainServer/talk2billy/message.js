const settings = require('./settings.json');
const modules = require('./modules.js')
const configFile= require('../../config.json')

//Settings\\
let messageHello = ['hello', 'hi', 'morning', 'good morning', 'hoi', 'yo', 'ola', 'hi', 'ahola', 'alhoa', 'wagwan', 'welcome', 'greetings']
let messageFeeling = ['how are you', 'you good', 'hows you', 'how is you', 'how r u', 'hows u']
let messageBye = ['bye', 'night', 'good night', 'i leaving', 'i\'m leaving', 'i\'m leaving now', 'cya', 'bai', 'im off', 'right im off', 'im leaving', 'im leaving now']
let messageDoing = ['wyd', 'wuu2', 'wassup', 'sup', 'what you doing', 'what u doing', 'whats you up to', 'what you up to', 'what ya doing', 'whatcha up 2', 'whatcha up to', 'whatcha up two']
let messageYeah = ['ye', 'yea', 'sure', 'ofc', 'of course']
let messageOh = ['oh']
let messageGood = ['good', 'alright', 'im']
let messageBad = ['bad', ':(', ':c', 'd:']
let messageAgree = ['i agree', 'i do agree']
let messageDisagree = ['i disagree', 'i do not agree', 'i object', 'no']
let messageLaugh = ['lol', 'xd', 'lmao', ':)', ':d', '(:', 'c:', ':p']


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
        messageDoing.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                modules.doing(message)
            }
        });
        messageYeah.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                modules.yeah(message)
            }
        });
        messageOh.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                modules.oh(message)
            }
        });
        messageGood.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                if (message.includes('bad', 'not good')) return modules.bad(message)
                modules.good(message)
            }
        });
        messageBad.forEach((a) => {
            if (message.content.toLowerCase().startsWith(a)) {
                modules.bad(message)
            }
        });
    });
}