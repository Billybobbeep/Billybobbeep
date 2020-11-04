module.exports.data = function(callback) {
    const configFile = require('../structure/config.json');
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