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
    mutedRole: { type: String }, // The role that muted users receive to prevent them from talking
    /**
     * Allows users to claim a certain role after achieving a certain level
     */
    levelRoles: [{
      level: { type: Number }, // The level required to get the role
      roleId: { type: String } // The role ID
    }],

    /**
     * The servers polls
     */
    polls: {
      automaticallyPost: { type: Boolean } // Automatically post the polls that are posted in the server
    },

    /**
     * The servers auto roles
     */
    autoRoles: {
      roleIds: { type: Array }, // The roles to automatically give users upon joining
      enforceRoles: { type: Boolean, default: false }, // Whether to enforce the roles
      includeBots: { type: Boolean, default: false } // Whether to include bots in the auto-roles
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
      totalCount: {
        channelId: { type: String }, // The channel ID
        text: { type: String, default: "All Members: {totalCount}" }, // The text to display
      },
      totalBots: {
        channelId: { type: String }, // The channel ID
        text: { type: String, default: "Total Bots: {botCount}" }, // The text to display
      },
      totalMembers: {
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
    id: { type: String, required: true }, // The ID of the reaction role
    color: { type: String }, // The reaction role color
    title: { type: String }, // The title of the reaction role
    description: { type: String }, // The description of the reaction role
    position: { type: Number, default: 999 }, // The position of the embed
    archived: { type: Boolean }, // Whether the reaction role has been archived
    reactions: [{
      buttonId: { type: String }, // The button ID
      roleId: { type: String }, // The role ID
      emoji: { type: String }, // The emoji ID
      color: { type: String }, // The color of the button
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
  polls: [{
    id: { type: String }, // The poll ID
    title: { type: String }, // The poll's title
    description: { type: String }, // The poll's description
    position: { type: Number, default: 999 }, // The position of the embed
    showVoters: { type: Boolean, default: true }, // Whether to show the voters to users
    pending: { type: Boolean }, // Whether the poll has been posted
    archived: { type: Boolean }, // Whether the poll has been archived
    options: [{
      name: { type: String }, // Name of the option
      emoji: { type: String }, // The emoji associated
      voters: { type: Array } // Array of who has voted
    }]
  }],
  logs: [{ // Dashboard logs
    user: { type: String }, // The user ID
    flag: { type: String }, // The log flag
    event: {
      title: { type: String }, // The event title
      description: { type: String }, // The event description
      notes: { type: String } // Additional information for the log
    },
    timestamp: { type: String, default: new Date().toString() }, // The timestamp of the event
    expires: { type: String, default: new Date(new Date().getTime() + 8.294e+9).toString() }, // When the log expires (96 days)
    _id: false // Disable default IDs
  }]
});

module.exports = mongoose.model("guilds", guildSchema);