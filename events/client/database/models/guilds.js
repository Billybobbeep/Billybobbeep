const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildId: { type: String }, // The server ID
    prefix: { type: String, default: '~' }, // The servers custom prefix

    counting_number: { type: Number }, // The current number in the counting channel

    preferences: {
        autoRoles: { type: Array }, // The roles to automatically give users upon joining
        lvlRoles: { type: Array }, // Allows users to claim a certain role after achieving a certain level
        embedColor: { type: String, default: '#447ba1' }, // The servers embed color

        // Server Stats, voice channel ID's
        serverStats_totalNo: { type: String },
        serverStats_memberNo: { type: String },
        serverStats_botNo: { type: String },
        serverStats_totalNoText: { type: String },
        serverStats_memberNoText: { type: String },
        serverStats_botNoText: { type: String },

        welcomeChannel: { type: String }, // The servers welcome channel, welcomes and dismisses users
        countingChannel: { type: String }, // The servers counting channel, if counting is enabled
        loggingChannel: { type: String }, // The servers logging channel to log events

        modRole: { type: String }, // The server mod role
        mutedRole: { type: String }, // The role that muted users recieve to prevent them from talking

        ecoEnabled: { type: Boolean }, // Enables and disables economy commands in the server
        levelsEnabled: { type: Boolean }, // Enables and disables levelling in the server
        inviteLinks: { type: Boolean }, // Automatically remove all third-party server invites
        cleanFilter: { type: Boolean } // Prevent commands that may include explicit content from being executed
    },
    logs: [{
        user: {
            id: { type: String }
        },
        event: { type: String },
        date: { type: String }
    }]
});

module.exports = mongoose.model('guilds', guildSchema);