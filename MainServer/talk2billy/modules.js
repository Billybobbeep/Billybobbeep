const Discord = require('discord.js');
const embed = new Discord.MessageEmbed().setTitle('Billybobbeep | Talk to Billy');
const settings = require('./settings.json');
const configFile = require('../../config.json');
const fs = require('fs');
const { json } = require('express');

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