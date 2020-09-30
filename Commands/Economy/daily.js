const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async(prefix, message) => {
  const embed = new Discord.MessageEmbed();
  embed.setTimestamp()
  embed.setTitle(`Requested by: ${message.author.tag}`)
  var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      var numdate = dd + mm + yyyy;
      var fs = require('fs');
      fs.readFile('./database/shop.json', 'utf8', function readFileCallback(err, data) {
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
          fs.writeFile('./database/shop.json', stuff, 'utf8', function() { });
        }
      });
      setTimeout(function() {
        fs.readFile('./database/shop.json', 'utf8', function readFileCallback(err, data) {
          var stuff = JSON.parse(data);
          stuff.forEach(m => {
            if (m.userID == message.author.id) {
              if (numdate > m.lastSeen) {
                var index = stuff.findIndex(x => x.userID == m.userID);
                stuff[index].lastSeen = numdate;
                stuff[index].money += 500;
                var currentMoney = stuff[index].money;
                stuff = JSON.stringify(stuff);
                fs.writeFile('./database/shop.json', stuff, 'utf8', function() { });
                embed.setTitle("Economy | Daily Command");
                embed.setDescription("You have successfully added £500 to your balance! Your balance is now: `£" + currentMoney + "`");
                message.channel.send({ embed });
              }
              else {
                embed.setTitle("Economy | Daily Command");
                embed.setDescription("Sorry, You need to wait another day untill you can use this command again!");
                message.channel.send({ embed });
              }
            }
          });
        });
      }, 300);
}