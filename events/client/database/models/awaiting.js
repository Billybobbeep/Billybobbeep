const mongoose = require('mongoose');

const awaitingSchema = new mongoose.Schema({
    memberId: String
});

module.exports = mongoose.model('awaitingApplications', awaitingSchema);