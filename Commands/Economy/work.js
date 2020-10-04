const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async(prefix, message) => {
      var fs = require('fs');
      fs.readFile('./Commands/Economy/database/shop.json', 'utf8', function readFileCallback(err, data) {
        var count = 0;
        stuff = JSON.parse(data);
        stuff.forEach(m => {
          if (m.userID == message.author.id) {
            count += 1;
          }
        });
        if (count == 0) {
          var json = {
            "userID": message.author.id,
            "lastSeen": 0,
            "money": 0,
            "inv": []
          }
          stuff.push(json);
          stuff = JSON.stringify(stuff);
          fs.writeFile('./Commands/Economy/database/shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function() {
        fs.readFile('./Commands/Economy/database/shop.json', 'utf8', function readFileCallback(err, data) {
          var stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.userID == message.author.id) {
              var index = stuff.findIndex(x => x.userID == m.userID);
              var amount = Math.floor(Math.random() * 65) + 1
              stuff[index].money += amount;
              var currentMoney = stuff[index].money;
              stuff = JSON.stringify(stuff);
              fs.writeFile('./Commands/Economy/database/shop.json', stuff, 'utf8', function() { });
              embed.setTitle("Regular Command");
              embed.setDescription("You have successfully added £" + amount + " to your balance! Your balance is now: `£" + currentMoney.toFixed(2) + "`");
              message.channel.send({ embed });
            }
          });
        });
      }, 50);
}