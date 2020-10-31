module.exports = async (client) => {
  // [Varibles] //
  const Discord = require('discord.js');
  const db = require('./data/databaseManager/index.js');
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

  client.once('ready', async () => {
    const serverStatsFile = require('./events/backend/serverstats.js');
    serverStatsFile(client);
    var timeOutFunctions = require('./events/backend/timeOut.js');
    timeOutFunctions(db, client);
    var ban_logs = require('./events/backend/logging.js');
    ban_logs(client);
    var guildManage = require('./events/backend/guildCreate.js');
    guildManage(client)
    const deleteMessages = require('./events/backend/deleteMessages.js');
    deleteMessages(client);
    const editMessages = require('./events/backend/editMessage.js');
    editMessages(client);
    const reactionRole1 = require('./events/backend/reactionRoles/main.js');
    reactionRole1(client);

    //Display activities in the correct order
    let activities = [`~help`, `Version 2.0 BETA`]
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
      console.log(err);
    }
  };

  client.on('message', async message => {
    const AfkFile = require('./events/commands/Afk/AfkHandle.js');
    AfkFile(client, message);
    const counting = require('./events/commands/counting.js');
    counting(client, message);
    const DmLogger = require('./events/backend/dmRecieving.js');
    DmLogger(client, message, Discord);
    const reactMessages = require(`./events/backend/deletingMessages.js`);
    reactMessages(message, Discord, client);
    const mentionsHandle = require('./events/commands/mentions/mentions.js');
    mentionsHandle(client, message);
    const levels = require('./events/backend/levels/main.js');
    levels(client, message);
    const talk2billy = require('./events/commands/talk2billy');
    talk2billy(message);
    if (
      message.channel.id === configFile.PollChannel ||
      message.channel.id === configFile.MemesChannel
    ) {
      const reactMessages = require(`./events/backend/reactions.js`);
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
      const commandFile = require('./events/backend/levels/currLvl.js')
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
    if (message.content.toLowerCase() == prefix + 'rr') {
      const commandFile = require(`./events/backend/reactionRoles/personality.js`);
      return commandFile(client, message);
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
      const commandFile = require(`./events/backend/levels/removeLvl.js`);
      return commandFile(client, message, prefix);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'job')) {
      const commandFile = require(`./Commands/Economy/jobs.js`);
      return commandFile(prefix, message, client);
    }
    if (message.content.toLowerCase() === prefix + 'wallet' || message.content.toLowerCase() === prefix + 'wal') {
      const commandFile = require(`./Commands/Economy/wallet.js`);
      return commandFile(client, message, prefix);
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
    if (message.content.toLowerCase() == prefix + 'apply') {
      const commandFile = require(`./Commands/Economy/apply.js`);
      return commandFile(message, prefix, client);
    }
    if (message.content.toLowerCase() == prefix + 'fonts') {
      const commandFile = require(`./Commands/font.js`);
      return commandFile(client, msg, args, prefix, message);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'setup')) {
      const commandFile = require(`./Commands/setup/main.js`);
      return commandFile(client, message, db);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'logs')) {
      const commandFile = require(`./Commands/audit-logs.js`);
      return commandFile(client, message);
    }
    /*if (message.content.toLowerCase() === prefix + 'regenerate key' || message.content.toLowerCase() === prefix + 'generate key') {
      const commandFile = require(`./Commands/API-key`);
      return commandFile(message, db);
    }*/
    if (message.content.toLowerCase() == prefix + 'shutdown') {
      if (message.author.discriminator === '2793') {
        await message.channel.send('Shutting down ' + client.user.username);
        return client.destroy()
      } else {
        return message.channel.send('You do not have the correct premissions for this command');
      }
    }
    if (message.content.toLowerCase() == prefix + 'restart') {
      var index = require('./index.js');
      index.restart(message)
    }
    if (message.content.toLowerCase() === prefix + 'dnd') {
      client.user.setStatus('dnd');
      message.channel.send('dnd')
    }
    if (message.content.toLowerCase().startsWith(prefix + 'play') || message.content.toLowerCase().startsWith(prefix + 'stop') || message.content.toLowerCase().startsWith(prefix + 'tts')) {
      const commandFile = require(`./Commands/play.js`);
      return commandFile(message, args, prefix, client);
    }
    command_function(message, prefix)
  });

  // Welcomes new members
  client.on('guildMemberAdd', member => {
    try {
      const NewMember = require(`./events/backend/welcome.js`);
      NewMember(member);
    } catch (err) {
        return
    }
  });

  //Logs members leaving
  client.on('guildMemberRemove', member => {
    try {
      const NewMember = require(`./events/backend/goodbye.js`);
      NewMember(member);
    } catch {
       return;
    }
  });
}