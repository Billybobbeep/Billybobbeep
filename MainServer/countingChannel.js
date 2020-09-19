const configFile = require('../config.json');
const Discord = require('discord.js');

module.exports = async(message, client) => {
    let msg = message.content.toLowerCase();
    if(message.author.bot) return;
    
    let emojis1 = [`${configFile.TickEmoji1}`, `${configFile.TickEmoji2}`], i = 0;
        `${emojis1[i ++ % emojis1.length]}`

    let emojis2 = [`${configFile.SlooshEmoji}`, `${configFile.PartyBlobEmoji}`], x = 0;

      var fs = require('fs');
      fs.readFile('./database/count.json', 'utf8', function(err, data) {
        var currentNo = JSON.parse(data)[0].number;
        if (!isNaN(msg.content)) {
          if (message.content == currentNo + 1) {
            msg.react(emojis1);
            var jsonStuff = [{
              "number": currentNo + 1
            }]
            jsonStuff = JSON.stringify(jsonStuff);
            fs.writeFile('./database/count.json', jsonStuff, 'utf8', function() { })
          }
          else {
            msg.react(emojis2);
            message.channel.send(message.author.tag + `has ruined the chain, the next number is \`1\``)
            var jsonStuff = [{
              "number": 0
            }]
            jsonStuff = JSON.stringify(jsonStuff);
            fs.writeFile('./database/count.json', jsonStuff, 'utf8', function() { })
        }
        }
      });
    if (msg.startsWith("69") || msg.startsWith("169") || msg.startsWith("269") || msg.startsWith("369")) {
        message.react(`${emojis2[Math.floor(Math.random() * emojis2.length)]}`)
    }
    if (isNaN(message.content)) {
        if (msg.startsWith === `${configFile.prefix}purge`) return;
        let m = await message.channel.send(`${message.author} has ruined the chain with an invalid number. The next number is \`1\``)
        message.reactions.removeAll();
        message.react(`${configFile.CrossEmoji}`)
        m.react(`${configFile.SmilingBlob}`)
        var jsonStuff = [{
          "number": 0
        }]
        jsonStuff = JSON.stringify(jsonStuff);
        fs.writeFile('./database/count.json', jsonStuff, 'utf8', function() { })
    }
    if (message.content > 400) {
        message.channel.send(`${message.author} has ruined the chain with a number too high. The next number is \`1\``)
        message.reactions.removeAll();
        message.react(`${configFile.CrossEmoji}`)
        var jsonStuff = [{
          "number": 0
        }]
        jsonStuff = JSON.stringify(jsonStuff);
        fs.writeFile('./database/count.json', jsonStuff, 'utf8', function() { })
    }
    if (message.content === "400") {
        message.channel.send(`You have reached the max number! The next number is \`1\``)
        configFile.TimesReached400 = configFile.TimesReached400 + 1
        message.react(configFile.RainbowParty)
        message.react(configFile.CrazyBlobEmoji)
        message.react(configFile.PartyBlobEmoji)
        var jsonStuff = [{
          "number": 0
        }]
        jsonStuff = JSON.stringify(jsonStuff);
        fs.writeFile('./database/count.json', jsonStuff, 'utf8', function() { })
    }
}