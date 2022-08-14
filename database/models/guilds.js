const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
  guildId: { type: String, unique: true }, // The server ID
  prefix: { type: String, default: "~" }, // The servers custom prefix

  counting_number: { type: Number }, // The current number in the counting channel

  /**
   * The server settings
   */
  preferences: {
    embedColor: { type: String, default: "#447ba1" }, // The servers embed color

    countingChannel: { type: String }, // The servers counting channel, if counting is enabled
    loggingChannel: { type: String }, // The servers logging channel to log events
    levelingChannel: { type: String }, // The servers levels channel to log levels

    modRoles: { type: Array }, // The server mod role
    customMods: { type: Array }, // Custom added server mods
    mutedRole: { type: String }, // The role that muted users recieve to prevent them from talking
    /**
     * Allows users to claim a certain role after achieving a certain level
     */
    levelRoles: [{
      level: { type: Number }, // The level required to get the role
      roleId: { type: String } // The role ID
    }],

    /**
     * The servers auto roles
     */
    autoRoles: {
      roleIds: { type: Array }, // The roles to automatically give users upon joining
      enforceRoles: { type: Boolean, default: false } // Whether to enforce the roles
    },
    /**
     * Server stats configuration
     * 
     * Dynamic string variables:
     *   {totalCount} - The total amount of members + bots in the server
     *   {botCount} - The amount of bots in the server
     *   {memberCount} - The amount of members in the server
     */
    serverStats: {
      enabled: { type: Boolean, default: false }, // Whether the server stats function is enabled
      totalMembers: {
        channelId: { type: String }, // The channel ID
        text: { type: String, default: "All Members: {totalCount}" }, // The text to display
      },
      totalBots: {
        channelId: { type: String }, // The channel ID
        text: { type: String, default: "Total Bots: {botCount}" }, // The text to display
      },
      totalUsers: {
        channelId: { type: String }, // The channel ID
        text: { type: String, default: "Total Members: {memberCount}" }, // The text to display
      }
    },
    /**
     * Welcome channel configuration
     * 
     * Dynamic string variables:
     *   {user} - The user (ping) that joined the server
     *   {user.tag} - The user's tag
     *   {user.id} - The user's ID
     *   {guild.name} - The server's name
     *   {guild.id} - The server's ID
     *   {guild.memberCount} - The server's member count
     */
    welcomeChannel: {
      enabled: { type: Boolean, default: false }, // Whether or not the welcome channel is enabled
      channelId: { type: String }, // The channel ID
      joinMessage: { type: String, default: "{user} has joined the server" }, // The welcome message
      leaveMessage: { type: String, default: "{user.tag} has left the server" }, // The leave message
    },
    /**
     * The types of things to log
     */
    loggingTypes: {
      messageDeletes: { type: Boolean, default: true }, // Whether or not to log message deletes
      messageUpdates: { type: Boolean, default: true }, // Whether or not to log message edits

      channelUpdates: { type: Boolean, default: false }, // Whether or not to log channel updates
      threadUpdates: { type: Boolean, default: false }, // Whether or not to log thread updates
      
      roleUpdates: { type: Boolean, default: true }, // Whether or not to log role updates
      nicknameUpdates: { type: Boolean, default: false }, // Whether or not to log nickname changes
      avatarUpdates: { type: Boolean, default: false }, // Whether or not to log avatar changes
      usernameUpdates: { type: Boolean, default: false }, // Whether or not to log username changes

      eventCreate: { type: Boolean, default: true }, // Whether or not to log event creation
      eventDelete: { type: Boolean, default: true }, // Whether or not to log event deletion
      eventUpdate: { type: Boolean, default: true }, // Whether or not to log event updates

      bans: { type: Boolean, default: true }, // Whether or not to log bans
    },
    /**
     * Server options
     */
    serverOptions: {
      ecoEnabled: { type: Boolean, default: true }, // Enables and disables economy commands in the server
      levelsEnabled: { type: Boolean, default: true }, // Enables and disables levelling in the server
      invitesEnabled: { type: Boolean, default: true }, // Automatically remove all third-party server invites
      cleanFilter: { type: Boolean, default: false }, // Prevent commands that may include explicit content from being executed
    }
  },
  reactionRoles: [{
    messageId: { type: String }, // The message ID
    channelId: { type: String }, // The channel ID
    id: { type: String }, // The ID of the reaction role
    reactions: [{
      buttonId: { type: String }, // The button ID
      roleId: { type: String }, // The role ID
      _id: false // Disable default IDs
    }],
    _id: false // Disable default IDs
  }],
  pendingReactionRoles: [{
    emoji: { type: String }, // The emoji linked with the role
    color: { type: String }, // The color of the button
    includeLabel: { type: Boolean, default: false }, // Whether or not to include the role name on the button
    roleId: { type: String }, // The role ID
    timestamp: { type: String, default: new Date().toString() }, // The timestamp of the reaction role
    _id: false // Disable default IDs
  }],
  logs: [{ // Dashboard logs
    user: { type: String }, // The user ID
    event: {
      title: { type: String }, // The event title
      description: { type: String } // The event description
    },
    timestamp: { type: String, default: new Date().toString() }, // The timestamp of the event
    _id: false // Disable default IDs
  }]
});

module.exports = mongoose.model("guilds", guildSchema);