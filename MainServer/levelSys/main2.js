const configFile = require('../../config.json');
module.exports = async (client) => {
  const fs = require('fs');

  function generateExperiencePoints() {
    return Math.round(Math.random() * 250)
  }

  client.on("message", async message => {
    if (message.author.bot) return; // ignore bots
    if (!message.content.toLowerCase().startsWith(configFile.prefix)) {
      let xpFile = fs.readFile('proectdb.json', 'utf8');
        var json = JSON.parse(xpFile);
        if (json.hasOwnProperty(message.author.id)) {
          let xpObject = json[message.author.id];
          if (xpObject.hasOwnProperty(message.guild.id)) {
            let guildXpObect = xpObject[message.guild.id];
            let newXp = generateExperiencePoints();
            let currentXp = guildXpObect['xp'];
            let updateXp = currentXp + newXp;
            let currentLevel = guildXpObect['level'];
            let level = updateLevel(updateXp);
            if (currentLevel != level) message.channel.send(`${message.member}, is now level ${level}`)
            json[message.author.id][message.guild.id]['xp'] = updateXp;
            json[message.author.id][message.guild.id]['level'] = level;

            await fs.writeFile('proectdb.json', JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
          } else {
            json[message.author.id][message.guild.id] = {
              "xp": generateExperiencePoints(),
              "level": 1
            }
            await fs.writeFile('proectdb.json', JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
          }
        } else {
          let guildId = message.guild.id
          json[message.author.id] = {}
          json[message.author.id][guildId] = {
            "xp": generateExperiencePoints(),
            "level": 1
          }
          await fs.writeFile('proectdb.json', JSON.stringify(xpObject, null, 4), 'utf8').catch(err => console.log(err));
        }
    }
  });
}
function updateLevel(exp) {
  if (exp >= 0 && exp <= 1000) return 1; //level 1
  else if (exp > 1000 && exp <= 2000) return 2; //level 2
  else if (exp > 2000 && exp <= 3000) return 3; //level 3
  else if (exp > 3000 && exp <= 4000) return 4; //level 4
  else if (exp > 4000 && exp <= 5000) return 5; //level 5
  else { return 6; } // Max level: 6
}