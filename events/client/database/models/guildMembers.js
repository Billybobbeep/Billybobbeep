const mongoose = require('mongoose');

const guildMemberSchema = new mongoose.Schema({
    memberId: String,
    guildId: String
});

module.exports = mongoose.model('guildMembers', guildMemberSchema);