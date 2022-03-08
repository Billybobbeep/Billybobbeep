const mongoose = require("mongoose");

const guildMemberSchema = new mongoose.Schema({
    memberId: { type: String },
    guildId: { type: String },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
    warnReasons: { type: Array },
});

module.exports = mongoose.model("guildMembers", guildMemberSchema);