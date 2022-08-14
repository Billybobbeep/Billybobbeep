const mongoose = require("mongoose");

const mutedSchema = new mongoose.Schema({
  userId: { type: String },
  guildId: { type: String },
  time: {
    type: String,
    default: Date.now() + 300000 // 5 minutes
  }
});

module.exports = mongoose.model("mutedMembers", mutedSchema);