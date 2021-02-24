module.exports = (client) => {
  let activities = [`~help`, `to v${(require('../../package.json').version)[0]}${(require('../../package.json').version)[1]}${(require('../../package.json').version)[2]}`];
  i = 0;
  setInterval(() => {
    client.user.setActivity(`${activities[i++ % activities.length]}`, {type: 'LISTENING'});
  }, 10000);
  console.log(`Total Guilds: ${client.guilds.cache.size}\nTotal Members: ${client.users.cache.size}`)
  require('../backend/timeOut.js')(client);
}