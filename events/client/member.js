module.exports.add = (member, client) => {
    require('../backend/welcome.js')(member);
    require('../backend/serverstats.js').add(member, client);
}
module.exports.remove = (member) => {
    require('../backend/goodbye.js')(member);
    require('../backend/serverstats.js').remove(member, client);
}