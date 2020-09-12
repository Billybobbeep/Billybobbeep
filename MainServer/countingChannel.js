const configFile = require('../config.json');
const Discord = require('discord.js');
const Database = require("@replit/database")
const db = new Database()

module.exports = async(message, client) => {
  let CurrentNumber = db.get(`number_${message.guild.id}`)
    let msg = message.content.toLowerCase();
    if(message.author.bot) return;
    
    let emojis1 = [`${configFile.TickEmoji1}`, `${configFile.TickEmoji2}`], i = 0;
        `${emojis1[i ++ % emojis1.length]}`

    let emojis2 = [`${configFile.SlooshEmoji}`, `${configFile.PartyBlobEmoji}`], x = 0;
    if (!isNaN(message.content)) {
        if (message.content > CurrentNumber) {
            if (message.content === CurrentNumber || message.content > CurrentNumber + 2 || message.content < CurrentNumber) return;
        message.react(`${emojis1[Math.floor(Math.random() * emojis1.length)]}`)
        db.set(`number_${message.guild.id}`, CurrentNumber + 1)
        } else {
            if (message.content === "1") return;
            message.channel.send(`${message.author} has ruined the chain. The next number is \`1\``)
            message.reactions.removeAll();
            message.react(`${configFile.CrossEmoji}`)
            db.set(`number_${message.guild.id}`, 0);
        }
    }
    if (msg.startsWith("69") || msg.startsWith("169") || msg.startsWith("269") || msg.startsWith("369")) {
        message.react(`${emojis2[Math.floor(Math.random() * emojis2.length)]}`)
    }
    if (isNaN(message.content)) {
        if (msg.startsWith === `${configFile.prefix}purge`) return;
        let m = await message.channel.send(`${message.author} has ruined the chain with an invalid number. The next number is \`1\``)
        message.reactions.removeAll();
        message.react(`${configFile.CrossEmoji}`)
        m.react(`${configFile.SmilingBlob}`)
        db.set(`number_${message.guild.id}`, 0);
    }
    if (message.content > 400) {
        message.channel.send(`${message.author} has ruined the chain with a number too high. The next number is \`1\``)
        message.reactions.removeAll();
        message.react(`${configFile.CrossEmoji}`)
        db.set(`number_${message.guild.id}`, 0);
    }
    if (message.content === "400") {
        message.channel.send(`You have reached the max number! The next number is \`1\``)
        configFile.TimesReached400 = configFile.TimesReached400 + 1
        message.react(configFile.RainbowParty)
        message.react(configFile.CrazyBlobEmoji)
        message.react(configFile.PartyBlobEmoji)
        db.set(`number_${message.guild.id}`, 0);
    }
    if (message.content === "1") {
        message.react(`${emojis1[Math.floor(Math.random() * emojis1.length)]}`)
    }
}