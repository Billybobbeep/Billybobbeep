const Discord = require('discord.js');
const modules = require('./modules.js');
const configFile = require('../../config.json');
const settings = require('./settings.json');
const fs = require('fs');

module.exports = async (client, message) => {
    if (configFile.talk2billyEnabled != settings.talk2billyEnabled) {
        fs.readFile('./MainServer/talk2billy/settings.json', 'utf8', function readFileCallback(err, data) {
            nd = JSON.parse(data);
            fs.writeFile('./MainServer/talk2billy/settings.json', `{ "talk2billyEnabled" : ${configFile.talk2billyEnabled}, "testCmd" : ${nd.testCmd} }`, 'utf8', function() { } );
        });
    }
    if (settings.testCmd === false || settings.testCmd === true) {
            if (message.content.toLowerCase() === '--test--' || message.content.toLowerCase() === '--test-- on' || message.content.toLowerCase() === '--test-- true') {
                if (settings.testCmd === true) return message.channel.send('Test mode is already on.')
                return modules.testCmdOn(message)
            } else if (message.content.toLowerCase() === '--test-- off' || message.content.toLowerCase() === '--test-- false') {
                if (settings.testCmd === false) return message.channel.send('Test mode is already off.')
                return modules.testCmdOff(message)
            }
    }
    if (settings.talk2billyEnabled === true && settings.testCmd === false) {
        var file = require('./message.js')
        file(client, message)
    } else {
            modules.disabled(message)
    }
}