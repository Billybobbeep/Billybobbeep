module.exports = async () => {
  // [Varibles] //
  const Discord = require('discord.js');
  const db = require('quick.db');
  const client = new Discord.Client({
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
  });
  const configFile = require('./config.json');
  const embed = new Discord.MessageEmbed()

  /////////////////////////////
  //////Exporting Modules//////
  /////////////////////////////

  module.exports.data = function(callback) {
    var totalNum = client.guilds.cache.get(configFile.ServerId).members.cache.array();
    var totalOnlineNum = client.guilds.cache.get(configFile.ServerId).members.cache.filter(m => m.presence.status != 'offline').array();
    var totalBotNum = client.guilds.cache.get(configFile.ServerId).members.cache.filter(m => m.user.bot);
    setTimeout(function() {
      var jsonArr = {
        "TMembers": totalNum.length,
        "TOnline": totalOnlineNum.length,
        "TBots": totalBotNum.size,
        "TMembers2": totalNum,
        "TOnline2": totalOnlineNum,
        "TBots2": totalBotNum.array()
      }
      callback(jsonArr);
    }, 30);
  }

  const server125 = require('./server.js');
  server125(client);


  client.once('ready', async () => {
    const serverStatsFile = require('./MainServer/serverstats.js');
    serverStatsFile(client);

    var guildManage = require('./MainServer/guildCreate.js');
    guildManage(client)
    const deleteMessages = require('./MainServer/deleteMessages.js');
    deleteMessages(client);
    const editMessages = require('./MainServer/editMessage.js');
    editMessages(client);
    const reactionRole1 = require('./MainServer/reactionRoles/main.js');
    reactionRole1(client);

    //Display activities in the correct order
    let activities = [`~help`, `Version 2.0 👀`]
      i = 0;
    setInterval(() => {
      client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: 'LISTENING'
      });
    }, 10000);
  });

  function command_function(message, prefix) {
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let msg = message.content.toLowerCase();
    let command = args.shift().toLowerCase();
    if (message.content.toLowerCase().startsWith(prefix + 'back') || message.content.toLowerCase().startsWith(prefix + 'afk')) return;
    try {
      const commandFile = require(`./Commands/${command}.js`);
      commandFile(client, msg, args, prefix, message);
    } catch(err) {
      if (err.toLocaleString().startsWith('Error: Cannot find module')) return;
      console.log(err.toLocaleString());
    }
  };

  client.on('message', async message => {
    const AfkFile = require('./MainServer/Afk/AfkHandle.js');
    AfkFile(client, message);
    const DmLogger = require('./MainServer/dmRecieving.js');
    DmLogger(client, message, Discord);
    const reactMessages = require(`./MainServer/deletingMessages.js`);
    reactMessages(message, Discord, client);
    const mentionsHandle = require('./MainServer/mentions.js');
    mentionsHandle(client, message);
    const levels = require('./MainServer/levels/main.js');
    levels(client, message)
    const talk2billy = require('./MainServer/talk2billy');
    talk2billy(message)
    if (
      message.channel.id === configFile.PollChannel ||
      message.channel.id === configFile.MemesChannel
    ) {
      const reactMessages = require(`./MainServer/reactions.js`);
      reactMessages(message);
    }

    if (message.author.bot) return;
    if (!message.guild) return;
    let prefix = db.get(message.guild.id + '.prefix') || '~'
    if (!message.content.startsWith(prefix)) return;
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    let msg = message.content.toLowerCase();
    if (message.content.toLowerCase() == prefix + 'ping') {
      const commandFile = require(`./Commands/pong.js`);
      return commandFile(client, msg, args, prefix, message);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'cl') || message.content.toLowerCase().startsWith(prefix + 'currlvl') || message.content.toLowerCase().startsWith(prefix + 'currentlvl')) {
      const commandFile = require('./MainServer/levels/currLvl.js')
      commandFile(message)
    }
    if (message.content.toLowerCase() == prefix + 'credit' || message.content.toLowerCase() == prefix + 'credits') {
      const commandFile = require(`./Embeds/credit.js`);
      return commandFile(message);
    }
    if (message.content.toLowerCase() == prefix + 'members') {
      const commandFile = require(`./Commands/members.js`);
      return commandFile(client, msg, args, prefix, message);
    }
    if (
      msg.startsWith(prefix + 'cmds') ||
      msg.startsWith(prefix + 'commands') ||
      msg.startsWith(prefix + 'c')
    ) {
      const commandFile = require(`./Embeds/Commands/main.js`);
      return commandFile(msg, args, prefix, message, client);
    }
    if (message.content.toLowerCase() == prefix + 'pronounrole') {
      const commandFile = require(`./MainServer/reactionRoles/pronoun.js`);
      return commandFile(message);
    }
    if (message.content.toLowerCase() == prefix + 'countryrole') {
      const commandFile = require(`./MainServer/reactionRoles/country.js`);
      return commandFile(message);
    }
    if (message.content.toLowerCase() == prefix + 'info') {
      const commandFile = require(`./Embeds/info.js`);
      return commandFile(client, message);
    }
    if (message.content.toLowerCase() == prefix + 'help') {
      const commandFile = require(`./Embeds/help.js`);
      return commandFile(client, prefix, message);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'removelevel') || message.content.toLowerCase().startsWith(prefix + 'removelvl') || message.content.toLowerCase().startsWith(prefix + 'rl')) {
      const commandFile = require(`./MainServer/levels/removeLvl.js`);
      return commandFile(client, message, prefix);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'job')) {
      const commandFile = require(`./Commands/Economy/jobs.js`);
      return commandFile(prefix, message, client);
    }
    if (message.content.toLowerCase() == prefix + 'image') {
      const commandFile = require(`./Commands/image.js`);
      return commandFile.run(client, msg, args, prefix, message);
    }
    if (message.content.toLowerCase() == prefix + 'daily') {
      const commandFile = require(`./Commands/Economy/daily.js`);
      return commandFile(prefix, message, client);
    }
    if (message.content.toLowerCase() == prefix + 'work') {
      const commandFile = require(`./Commands/Economy/work.js`);
      return commandFile(prefix, message, client);
    }
    if (message.content.toLowerCase() == prefix + 'fonts') {
      const commandFile = require(`./Commands/font.js`);
      return commandFile(client, msg, args, prefix, message);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'setup')) {
      const commandFile = require(`./Commands/setup/main.js`);
      return commandFile(client, message, db);
    }
    if (message.content.toLowerCase() == prefix + 'shutdown') {
      if (message.author.discriminator === '2793') {
        await message.channel.send('Shutting down ' + client.user.username);
        return client.destroy()
      } else {
        return message.channel.send('You do not have the correct premissions for this command');
      }
    }
    if (message.content.toLowerCase() == prefix + 'restart') {
      if (message.author.discriminator === '2793') {
        message.channel.send('restarting ' + client.user.username)
        .then(()=> client.destroy())
        .then(()=> client.login(process.env.token));
        return;
      } else {
        return message.channel.send('You do not have the correct premissions for this command');
      }
    }
    if (message.content.toLowerCase().startsWith(prefix + 'play') || message.content.toLowerCase().startsWith(prefix + 'stop') || message.content.toLowerCase().startsWith(prefix + 'tts')) {
      const commandFile = require(`./Commands/play.js`);
      return commandFile(message, args, prefix);
    }
    command_function(message, prefix)
  });

  // Welcomes new members
  client.on('guildMemberAdd', member => {
    try {
      const NewMember = require(`./MainServer/newMember.js`);
      NewMember(member);
    } catch (err) {
        return
    }
  });

  //Logs members leaving
  client.on('guildMemberRemove', member => {
    try {
      const NewMember = require(`./MainServer/removingMember.js`);
      NewMember(member);
    } catch {
       return;
    }
  });

  client.login(process.env.token);
}