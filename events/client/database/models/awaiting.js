const mongoose = require('mongoose');

const awaitingSchema = new mongoose.Schema({
    memberId: String,
    date: String,
    job: String
});

module.exports = mongoose.model('awaitingApplications', awaitingSchema);