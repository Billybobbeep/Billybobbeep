const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildId: { type: String }, // The server ID
    prefix: { type: String, default: "~" }, // The servers custom prefix

    counting_number: { type: Number }, // The current number in the counting channel

    preferences: {
        autoRoles: { type: Array }, // The roles to automatically give users upon joining
        lvlRoles: { type: Array }, // Allows users to claim a certain role after achieving a certain level
        embedColor: { type: String, default: "#447ba1" }, // The servers embed color

        // Server Stats, voice channel ID's  & fonts
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
        cleanFilter: { type: Boolean }, // Prevent commands that may include explicit content from being executed,

        antiSpam: { // Anti-spam settings
            mentions: { // Mention spam settings
                enabled: { type: Boolean, default: false }, // If billy should check for mention spamming
                max: { type: Number, default: 3 }, // Max mentions per message
                includeEveryone: { type: Boolean, default: false } // Include the @everyone ping as spam
            },
            ignoredChannels: { type: Array }, // Channels to ignore spam in
            ignoredRoles: { type: Array }, // Roles to ignore
            ignoredMembers: { type: Array }, // Members to ignore
            duplicatesInterval: { type: Number, default: 2000 }, // Duplicate messages interval
            messageInterval: { type: Number, default: 1000 }, // Message interval
            muteSettings: {
                enabled: { type: Boolean, default: false }, // If billy can mute spammers
                thresold: { type: Number, default: 4 }, // No. of messages for a mute to take place
                time: { type: Number, default: 1800000 } // Time to mute the spammer for - default = 30m
            },
            warnSettings: {
                enabled: { type: Boolean, default: true }, // If billy can warn spammers
                threshold: { type: Number, default: 4 }, // No. of messages for a warn to take place
                first: { type: Boolean, default: true } // Warn the spammer before muting
            }
        }
    },
    logs: [{ // Dashboard logs
        user: { type: Object }, // The user
        event: { type: String }, // The event
        timestamp: { type: String } // The timestamp of the event
    }]
});

module.exports = mongoose.model("guilds", guildSchema);