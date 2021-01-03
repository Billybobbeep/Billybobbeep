const mongoose = require('mongoose');

const mutedSchema = new mongoose.Schema({
    userId: String,
    guildId: String,
    time: String
});

module.exports = mongoose.model('mutedMembers', mutedSchema);