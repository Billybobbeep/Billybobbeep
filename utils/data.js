module.exports.data = function(client, callback) {
    const configFile = require('../utils/config.json');
    let totalNum = client.guilds.fetch(configFile.ServerId).members.cache.array();
    let totalOnlineNum = client.guilds.fetch(configFile.ServerId).members.cache.filter(m => m.presence.status != 'offline').array();
    let totalBotNum = client.guilds.fetch(configFile.ServerId).members.cache.filter(m => m.user.bot);
    setTimeout(function() {
        let jsonArr = {
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