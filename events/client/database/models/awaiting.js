const mongoose = require("mongoose");

const awaitingSchema = new mongoose.Schema({
    memberId: { type: String },
    date: { type: String },
    job: { type: String }
});

module.exports = mongoose.model("awaitingApplications", awaitingSchema);