const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: String,
    //General
    dmed: Boolean, //If the user has DMed the bot
    //Economy
    economy_balance: { type: Number, default: 0 }, 
    economy_work: Number,
    economy_streak: { type: Number, default: 0 },
    economy_tStreak: { type: Number, default: 0 },
    economy_daily: Number,
    economy_lastDonated: String,
    //-Jobs
    job_name: String,
    job_lastApplied: String,
    job_level: { type: Number, default: 0 },
    job_xp: { type: Number, default: 0 },
    job_timesFired: { type: Number, default: 0 },
    job_lastFired: String,
    job_awaiting: { type: Boolean, default: false },
    //-Bank
    bank_balance: { type: Number, default: 0 },
    //AFK
    isAfk: Boolean,
    afkReason: String
});

module.exports = mongoose.model('users', userSchema);