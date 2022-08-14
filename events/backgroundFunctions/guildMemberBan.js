const { GuildBan, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { logging } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

/**
 * A function to handle when a guild member is banned
 * @param {GuildBan} ban The ban that was added
 * @param {Client} client The bots client
 */
module.exports.add = async function(ban, client) {
  let guild = ban.guild;
  let user = ban.user;

  // Ensure the ban object is valid
  if (!ban instanceof GuildBan) return;

  // Find the guild from the database
  let loggingTypes = (await guilds.findOne({ guildId: member.guild.id })).preferences?.loggingTypes;

  // If the settings state that the bot should log guild member bans
  if (!loggingTypes?.bans) return;

  console.log("ban");

  // Fetch the client
  const me = await guild.members.fetchMe();

  if (
    !me.permissions.has(PermissionFlagsBits.Administrator)
    && !me.permissions.has(PermissionFlagsBits.ViewAuditLog)
  ) { // If the bot doesn't have permission to view the audit logs
    // Construct an embed
    const embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    // Set the data
    embed.setTitle("User Banned");
    embed.setDescription([
      `**User:** ${user.tag}`,
      `**User ID:** ${user.id}`,
      `**Reason:** ${ban.reason ? ban.reason : "No reason was provided"}\n`
    ].join("\n"));

    // Log the embed
    logging(embed, guild, client, { type: "guild", messageType: "embed" });
  } else {
    // Fetch the audit logs
    let logs = await guild.fetchAuditLogs()
    // Get the ban entry
    let ban = logs.entries
      .filter(e => e.action === "MEMBER_BAN_ADD" && e.target.id === user.id) // Filter to only get the ban entries
      .sort((a, b) => b.createdAt - a.createdAt) // Sort by the time the ban was created
      .first(); // Get the most recent

    // If there is no ban entry, return
    if (!ban || !ban.target) return;
    // If the ban entry was made by the bot, return
    if (ban && ban.executor.id === client.user.id) return;

    // Construct an embed
    const embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    // Set the data
    embed.setTitle("User Banned");
    embed.setDescription([
      `**User:** ${user.tag}`,
      `**User ID:** ${user.id}`,
      `**Reason:** ${ban.reason ? ban.reason : "No reason was provided"}\n`,
      `**Moderator:** ${ban.executor ? `<@!${ban.executor.id}>` : "Unknown"}`,
      `**Moderator Tag:** ${ban.executor ? ban.executor.tag : "Unknown"}`,
      `**Moderator ID:** ${ban.executor ? ban.executor.id : "Unknown"}`
    ].join("\n"));

    // Log the embed
    logging(embed, guild, client, { type: "guild", messageType: "embed" });
  }
}

/**
 * A function to handle when a guild member is unbanned
 * @param {GuildBan} ban The ban that was removed
 * @param {Client} client The bots client
 */
module.exports.remove = async function(ban, client) {
  let guild = ban.guild;
  let user = ban.user;

  // Ensure the ban object is valid
  if (!ban instanceof GuildBan) return;

  // Find the guild from the database
  let loggingTypes = (await guilds.findOne({ guildId: guild.id })).preferences?.loggingTypes;

  // If the settings state that the bot should log guild member bans
  if (!loggingTypes?.bans) return;

  console.log("unban");

  // Fetch the client
  const me = await guild.members.fetchMe();

  if (
    !me.permissions.has(PermissionFlagsBits.Administrator)
    && !me.permissions.has(PermissionFlagsBits.ViewAuditLog)
  ) { // If the bot doesn't have permission to view the audit logs
    // Construct an embed
    const embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    // Set the data
    embed.setTitle("User Banned");
    embed.setDescription([
      `**User:** ${user.tag}`,
      `**User ID:** ${user.id}`,
      `**Reason:** ${ban.reason ? ban.reason : "No reason was provided"}\n`
    ].join("\n"));

    // Log the embed
    logging(embed, guild, client, { type: "guild", messageType: "embed" });
  } else {
    // Fetch the audit logs
    let logs = await guild.fetchAuditLogs()
    // Get the ban entry
    let ban = logs.entries
      .filter(e => e.action === "MEMBER_BAN_REMOVE" && e.target.id === user.id) // Filter to only get the ban entries
      .sort((a, b) => b.createdAt - a.createdAt) // Sort by the time the ban was created
      .first(); // Get the most recent

    // If there is no ban entry, return
    if (!ban || !ban.target) return;
    // If the ban entry was made by the bot, return
    if (ban && ban.executor.id === client.user.id) return;

    // Construct an embed
    const embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    // Set the data
    embed.setTitle("User Banned");
    embed.setDescription([
      `**User:** ${user.tag}`,
      `**User ID:** ${user.id}`,
      `**Reason:** ${ban.reason ? ban.reason : "No reason was provided"}\n`,
      `**Moderator:** ${ban.executor ? `<@!${ban.executor.id}>` : "Unknown"}`,
      `**Moderator Tag:** ${ban.executor ? ban.executor.tag : "Unknown"}`,
      `**Moderator ID:** ${ban.executor ? ban.executor.id : "Unknown"}`
    ].join("\n"));

    // Log the embed
    logging(embed, guild, client, { type: "guild", messageType: "embed" });
  }
}