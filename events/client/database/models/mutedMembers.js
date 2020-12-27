const mongoose = require('mongoose');

const mutedSchema = new mongoose.Schema({
    memberId: String,
}, { strict: false });

module.exports = mongoose.model('mutedMembers', mutedSchema);