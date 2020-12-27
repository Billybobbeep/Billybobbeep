const mongoose = require('mongoose');

const awaitingSchema = new mongoose.Schema({
    memberId: String
}, { strict: false });

module.exports = mongoose.model('awaitingApplications', awaitingSchema);