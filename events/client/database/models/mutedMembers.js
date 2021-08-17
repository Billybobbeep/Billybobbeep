const mongoose = require('mongoose');

const mutedSchema = new mongoose.Schema({
    userId: { type: String },
    guildId: { type: String },
    time: { type: String }
});

module.exports = mongoose.model('mutedMembers', mutedSchema);