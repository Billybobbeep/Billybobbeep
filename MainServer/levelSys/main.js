module.exports = async (client) => {

const botconfig = require("../../config.json");
const Database = require("@replit/database")
const db = new Database()

const main2 = require("./main2.js")
main2(client)
/*client.on("message", async message => {
  if (message.channel.id === "754028828388622577") {
    if (message.author.bot) return;
    db.list().then(keys => {message.reply(`\n` + keys)});
  }
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let prefix = botconfig.prefix
  let msg = message.content.toLowerCase();
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(msg.startsWith(prefix + 'leaderboard')) {
      const leaderboardFile = require('./leaderboard.js')
      leaderboardFile(client, args, message, db)
  }
  db.set(`messages_${message.guild.id}_${message.author.id}`, 1)
  let messagefetch = db.get(`messages_${message.guild.id}_${message.author.id}`)

  let messages;
  if (messagefetch == 25) messages = 25; //Level 1
  else if (messagefetch == 65) messages = 65; // Level 2
  else if (messagefetch == 115) messages = 115; // Level 3
  else if (messagefetch == 200) messages = 200; // Level 4
  else if (messagefetch == 300) messages = 300; // Level 5

  if (!isNaN(messages)) {
    db.set(`level_${message.guild.id}_${message.author.id}`, 1)
    let levelfetch = db.get(`level_${message.guild.id}_${message.author.id}`)
    
  let levelembed = new Discord.MessageEmbed()
  .setDescription(`${message.author}, You have leveled up to level ${levelfetch}`)
   message.channel.send(levelembed)
  }
});*/
};