const mongoose = require('mongoose');

const mutedSchema = new mongoose.Schema({
    memberId: String
});

module.exports = mongoose.model('mutedMembers', mutedSchema);