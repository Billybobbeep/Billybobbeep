module.exports.add = (member, client) => { // Executed when a user joins a guild
    // Call functions
    require('../backend/welcome.js')(member);
    require('../backend/serverstats.js')(member, client);
}
module.exports.remove = (member, client) => { // Executed when a user leaves a guild
    // Call functions
    require('../backend/goodbye.js')(member);
    require('../backend/serverstats.js')(member, client);
}