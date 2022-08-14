const { Client, ThreadChannel, EmbedBuilder } = require("discord.js");
const { logging } = require("../../utils/functions");
const { format } = require("date-fns");
const guilds = require("../../database/models/guilds");
const ms = require("ms");

/**
 * A function to handle when a thread has been created
 * @param {ThreadChannel} thread The thread that was created
 * @param {Client} client The bots client
 */
module.exports.create = async function(thread, client) {
  // Ensure provided parameters are valid
  if (
    !thread instanceof ThreadChannel ||
    !client instanceof Client
  ) return;

  // Find the thread creators user object
  let threadCreator = await client.users.fetch(thread.ownerId);
  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: thread.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure the thread creator was found
  if (!threadCreator) return;
  // Ensure logging is enabled for this type
  if (loggingTypes?.threadUpdates === false) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setTitle("Thread Created");
  embed.setDescription([
    `**Thread Name:** ${thread.name}`,
    `**Thread ID:** ${thread.id}`,
    `**Thread Archives at:** ${format(new Date(thread.archiveTimestamp), "yyyy-MM-dd HH:mm")}`,
    `**Thread Channel:** <#${thread.id}>\n`,
    `**Thread Creator:** ${threadCreator.tag}`
  ].join("\n"));

  // Log the embed
  logging(embed, thread.guild, client, { type: "guild", messageType: "embed" });
}

/**
 * A function to handle when a thread has been deleted
 * @param {ThreadChannel} thread The thread that was deleted
 * @param {Client} client The bots client
 */
module.exports.delete = async function(thread, client) {
  // Ensure provided parameters are valid
  if (
    !thread instanceof ThreadChannel ||
    !client instanceof Client
  ) return;

  // Find the thread creators user object
  let threadCreator = await client.users.fetch(thread.ownerId);
  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: thread.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure the thread creator was found
  if (!threadCreator) return;
  // Ensure logging is enabled for this type
  if (loggingTypes?.threadUpdates === false) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setTitle("Thread Deleted");
  embed.setDescription([
    `**Thread Name:** ${thread.name}`,
    `**Thread ID:** ${thread.id}`,
    thread.archivedAt
      ? `**Reason:** Thread has been automatically archived\n`
      : "\n",
    `**Thread Creator:** ${threadCreator.tag}`
  ].join("\n"));

  // Log the embed
  logging(embed, thread.guild, client, { type: "guild", messageType: "embed" });
}

/**
 * A function to handle when a thread has been updated
 * @param {ThreadChannel} oldThread The old thread object
 * @param {ThreadChannel} newThread The new thread object
 * @param {Client} client The bots client
 */
module.exports.update = async function(oldThread, newThread, client) {
  // Ensure provided parameters are valid
  if (
    !oldThread instanceof ThreadChannel ||
    !newThread instanceof ThreadChannel ||
    !client instanceof Client
  ) return;

  // Find the thread creators user object
  let threadCreator = await client.users.fetch(newThread.ownerId);
  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: newThread.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure the thread creator was found
  if (!threadCreator) return;
  // Ensure logging is enabled for this type
  if (loggingTypes?.threadUpdates === false) return;

  // Define an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();

  // If the threads name has been changed
  if (oldThread.name !== newThread.name) {
    // Set embed data
    embed.setTitle("Thread Updated");
    embed.setDescription([
      `**New Thread Name:** ${newThread.name}`,
      `**Old Thread Name:** ${oldThread.name}`,
      `**Thread ID:** ${newThread.id}`,
      `**Thread Channel:** <#${newThread.id}>\n`,
      `**Thread Creator:** ${threadCreator.tag}`
    ].join("\n"));

    // Log the embed
    logging(embed, newThread.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the threads archive timestamp has been changed
  if (oldThread.archiveTimestamp !== newThread.archiveTimestamp) {
    // Set embed data
    embed.setTitle("Thread Updated");
    embed.setDescription([
      `**Thread Name:** ${newThread.name}`,
      `**Thread ID:** ${newThread.id}`,
      `**Old Thread Archives at:** ${format(new Date(oldThread.archiveTimestamp), "yyyy-MM-dd HH:mm")}`,
      `**New Thread Archives at:** ${format(new Date(newThread.archiveTimestamp), "yyyy-MM-dd HH:mm")}`,
      `**Thread Channel:** <#${newThread.id}>\n`,
      `**Thread Creator:** ${threadCreator.tag}`
    ].join("\n"));

    // Log the embed
    logging(embed, newThread.guild, client, { type: "guild", messageType: "embed" });
  }

  if (oldThread.rateLimitPerUser !== newThread.rateLimitPerUser) {
    // Set embed data
    embed.setTitle("Thread Updated");
    embed.setDescription([
      `**Thread Name:** ${newThread.name}`,
      `**Thread ID:** ${newThread.id}`,
      `**Old Thread Rate Limit:** ${ms(oldThread.rateLimitPerUser, { long: true })}`,
      `**New Thread Rate Limit:** ${ms(newThread.rateLimitPerUser, { long: true })}`,
      `**Thread Channel:** <#${newThread.id}>\n`,
      `**Thread Creator:** ${threadCreator.tag}`
    ].join("\n"));

    // Log the embed
    logging(embed, newThread.guild, client, { type: "guild", messageType: "embed" });
  }
}