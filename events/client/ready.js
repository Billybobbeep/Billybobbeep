module.exports = (client) => {
    let activities = [`~help`, `Version ${require('../../package-lock.json').version}`]
      i = 0;
    setInterval(() => {
      client.user.setActivity(`${activities[i++ % activities.length]}`, {type: 'LISTENING'});
    }, 10000);

    require('../backend/timeOut.js')(client);
}