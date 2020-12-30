const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: String,
    //Roles
    modRole: String,
    mutedRole: String,
    //Channels
    welcomeChannel: String,
    talkToBilly: String,
    countingChannel: String,
    loggingChannel: String,
    //Server Stats
    serverstats_totalNo: String,
    serverstats_memberNo: String,
    serverstats_botNo: String,
    serverstats_totalNoText: String,
    serverstats_memberNoText: String,
    serverstats_botNoText: String,
    //Other
    embedColor: String
}, { strict: false });

module.exports = mongoose.model('guilds', guildSchema);