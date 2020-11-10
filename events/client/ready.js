module.exports = (client) => {
    let activities = [`~help`, `Version ${require('../../package-lock.json').version}`];
    //let activities = [`Billianist and proud`];
      i = 0;
    setInterval(() => {
      client.user.setActivity(`${activities[i++ % activities.length]}`, {type: 'LISTENING'});
    }, 10000);

    require('../backend/timeOut.js')(client);
}

module.exports.reconnecting = (client) => {
  let guild = client.guilds.cache.get('733442092667502613');
  let channel = guild.channels.cache.get('733595548577300542');
  let user = guild.members.cache.get(require('../../structure/config.json').SpoinkID);
  try {
    user.send(`${client.user.username} cannot connect.`);
  } catch {
    channel.send(`<@!${user.id}> Please turn your DMs on.`);
  }
}