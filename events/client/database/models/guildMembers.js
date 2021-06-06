const mongoose = require('mongoose');

const guildMemberSchema = new mongoose.Schema({
    memberId: String,
    guildId: String,
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    warnReasons: Array,
});

module.exports = mongoose.model('guildMembers', guildMemberSchema);