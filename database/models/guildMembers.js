const mongoose = require("mongoose");

const guildMemberSchema = new mongoose.Schema({
  memberId: { type: String }, // The user's ID
  guildId: { type: String }, // The server ID

  levelling: {
    xp: { type: Number, default: 0 }, // The user's current XP
    level: { type: Number, default: 0 }, // The user's level
  },
  
  /**
   * @deprecated Use warnings instead
   */
  warnReasons: { type: Array },
  warnings: [{
    moderatorId: { type: String }, // The responsible moderator
    reason: { type: String }, // The reason for the warning
    timestamp: { type: String, default: new Date().toString() }, // The timestamp of the warning
    id: { type: Number, unique: true }, // The casse number
    _id: false // Disable default IDs
  }],
});

module.exports = mongoose.model("guildMembers", guildMemberSchema);