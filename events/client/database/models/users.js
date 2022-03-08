const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: { type: String }, // The users Discord user ID
    dmed: { type: Boolean }, //If the user has DMed the bot
    // Economy
    economy_balance: { type: Number, default: 0 }, 
    economy_work: { type: Number },
    economy_streak: { type: Number, default: 0 },
    economy_tStreak: { type: Number, default: 0 },
    economy_daily: { Number },
    economy_lastDonated: { type: String},
    //- Jobs
    job_name: { type: String },
    job_lastApplied: { type: String },
    job_level: { type: Number, default: 0 },
    job_xp: { type: Number, default: 0 },
    job_timesFired: { type: Number, default: 0 },
    job_lastFired: { type: String },
    job_awaiting: { type: Boolean, default: false },
    //- Bank
    bank_balance: { type: Number, default: 0 },
    // AFK
    isAfk: { type: Boolean },
    afkReason: { type: String },
    // Website
    cache: { type: Object }
});

module.exports = mongoose.model("users", userSchema);