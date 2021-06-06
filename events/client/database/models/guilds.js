const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: { type: String },
    prefix: { type: String, default: '~' },

    counting_number: { type: Number },

    preferences: {
        inviteLinks: { type: Boolean },
        autoRoles: { type: Array },
        lvlRoles: { type: Array },
        embedColor: { type: String, default: '#447ba1' },

        serverStats_totalNo: { type: String },
        serverStats_memberNo: { type: String },
        serverStats_botNo: { type: String },
        serverStats_totalNoText: { type: String },
        serverStats_memberNoText: { type: String },
        serverStats_botNoText: { type: String },

        welcomeChannel: { type: String },
        countingChannel: { type: String },
        loggingChannel: { type: String },

        modRole: { type: String },
        mutedRole: { type: String },
    }
});

module.exports = mongoose.model('guilds', guildSchema);