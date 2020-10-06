const Discord = require('discord.js');
const embed = new Discord.MessageEmbed().setTitle('Billybobbeep | Talk to Billy');
const settings = require('./settings.json');
const configFile = require('../../config.json');
const fs = require('fs');

//errors
module.exports.disabled = function (message) {
    if (message.author.bot) return;
    if (message.channel.id != configFile.talk2billy) return;
    embed.setDescription('Talk to Billy has been disabled.')
    embed.setColor('#a18cd1')
    return message.channel.send(embed)
}

module.exports.error = function (message) {
    if (message.author.bot) return;
    if (message.channel.id != configFile.talk2billy) return;
    embed.setDescription('An error has occured.')
    embed.setColor('#a18cd1')
    return message.channel.send(embed)
}

//test command
module.exports.testCmdOn = function (message) {
    if (message.author.bot) return;
    if (message.channel.id != configFile.talk2billy) return;
    fs.readFile('./MainServer/talk2billy/settings.json', 'utf8', function readFileCallback(err, data) {
        nd = JSON.parse(data);
        fs.writeFile('./MainServer/talk2billy/settings.json', `{ "talk2billyEnabled" : ${nd.talk2billyEnabled}, "testCmd" : true }`, 'utf8', function() { });
    });
    return message.channel.send('Test mode activated.')
}

module.exports.testCmdOff = function (message) {
    if (message.author.bot) return;
    if (message.channel.id != configFile.talk2billy) return;
    fs.readFile('./MainServer/talk2billy/settings.json', 'utf8', function readFileCallback(err, data) {
        nd = JSON.parse(data);
        fs.writeFile('./MainServer/talk2billy/settings.json', `{ "talk2billyEnabled" : ${nd.talk2billyEnabled}, "testCmd" : false }`, 'utf8', function() { });
    });
    return message.channel.send('Test mode deactivated.')
}

//phrases
module.exports.hello = function (message) {
    let reply = ['Hello.', 'morning', 'good morning', 'Greetings', 'Welcome to my home', 'Hello, user', 'Morning, user', 'wassup g']
    let response = reply[Math.floor(Math.random() * reply.length)]
    if (response === 'Morning, user') return message.channel.send(`Morning, ${message.author}`);
    if (response === 'Hello, user') return message.channel.send(`Hello, ${message.author}`);
    return message.channel.send(response)
}
module.exports.bye = function (message) {
    let reply = ['good bye.', 'byebye', 'nightttt', 'see you soon', 'byee', `bye, ${message.author}`, `byebye, ${message.author}`]
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.feeling = function (message) {
    let reply = ['i\m good, you?', 'im alright', 'feeling gooood', 'it doesn\'t matter about me, how are you?']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.doing = function (message) {
    let reply = ['not alot, you', 'nm, you?', 'just doing stuff, wbu', 'just chilling in the server, what about you?']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.yeah = function (message) {
    let reply = ['yeye', 'yuhh', 'ikr', 'ikrr', '']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.attachment = function (message) {
    let reply = ['do i smell an image?', 'you cannot send images here ♥', 'no ♥']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.oh = function (message) {
    let reply = ['oh?', 'right', 'i disagree']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.good = function (message) {
    let reply = ['goodgood', 'ayeee thats good', 'das good init']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.bad = function (message) {
    let reply = ['oh no :(', 'noo, what happened?', ':/']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.agree = function (message) {
    let reply = ['yessir', 'bet', 'goodgood', 'yeeeeh']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.disagree = function (message) {
    let reply = ['right', 'how do i reply to that-', 'hm', 'ping pong, your opinion is wrong', 'thanks for your feedback']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.laugh = function (message) {
    let reply = ['lmaoo', 'right', 'i have no emotionssss ✨']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(response)
}
module.exports.why = function (message) {
    let reply =['why not', 'ahhh i dont know how to answerrr', 'how do i respond to thatt']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(message)
}
module.exports.know = function (message) {
    let reply =['yeye', 'yuhh', 'yeah', 'yeeeeh']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(message)
}
module.exports.replySame = function(message) {
    let args = message.content.split(/ +/g);
    return message.channel.send(args[0])
}
module.exports.noProblem = function(message) {
    let reply =['no problem', 'no problemm']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(message)
}
module.exports.thanks = function(message) {
    let reply =['thanks', 'thank you', 'fanks', '👉👈']
    let response = reply[Math.floor(Math.random() * reply.length)]
    return message.channel.send(message)
}