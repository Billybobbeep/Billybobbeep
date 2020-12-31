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
    economy_lastDonated: Number,
    //-Jobs
    job_name: String,
    job_lastApplied: Number,
    job_level: Number,
    job_xp: Number,
    //-Bank
    bank_balance: Number
}, { strict: false });

module.exports = mongoose.model('users', userSchema);