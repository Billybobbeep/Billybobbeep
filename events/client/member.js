module.exports.add = (member) => {
    require('../backend/welcome.js')(member);
    require('../backend/serverstats.js').add(client);
}
module.exports.remove = (member) => {
    require('../backend/goodbye.js')(member);
    require('../backend/serverstats.js').remove(client);
}