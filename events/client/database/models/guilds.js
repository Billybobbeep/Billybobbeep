const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: String,
    prefix: { type: String, default: '~' },
    //Roles
    modRole: String,
    mutedRole: String,
    //Channels
    welcomeChannel: String,
    talkToBilly: String,
    countingChannel: String,
    loggingChannel: String,
    //Server Stats
    serverStats_totalNo: String,
    serverStats_memberNo: String,
    serverStats_botNo: String,
    serverStats_totalNoText: String,
    serverStats_memberNoText: String,
    serverStats_botNoText: String,
    //Other
    embedColor: String,
    counting_number: Number,
    lvlRoles: Array,
    autoRoles: Array
});

module.exports = mongoose.model('guilds', guildSchema);