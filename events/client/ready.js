module.exports = (client) => {
    let activities = [`~help`, `Version 2.0 BETA`]
      i = 0;
    setInterval(() => {
      client.user.setActivity(`${activities[i++ % activities.length]}`, {type: 'LISTENING'});
    }, 10000);
}