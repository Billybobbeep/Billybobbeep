const {
  NewsChannel,
  TextChannel,
  StageChannel,
  VoiceChannel,
  EmbedBuilder,
  Client
} = require("discord.js");
const { logging } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

let channelTypes = {
  0: "Text",
  1: "DM",
  2: "Voice",
  3: "Group DM",
  4: "Category",
  5: "News",
  10: "News Thread",
  11: "Public Thread",
  12: "Private Thread",
  13: "Stage",
  14: "Directory",
  15: "Forum",
}

/**
 * A function to handle when a channel has been created
 * @param {NewsChannel | TextChannel | StageChannel | VoiceChannel} channel The new channel
 * @param {Client} client The bots client
 */
module.exports.create = async function(channel, client) {
  // Ensure provided parameters are valid
  if (
    (
      !channel instanceof NewsChannel &&
      !channel instanceof TextChannel &&
      !channel instanceof StageChannel &&
      !channel instanceof VoiceChannel
    ) ||
    !client instanceof Client
  ) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: channel.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure logging is enabled for this type
  if (loggingTypes?.channelUpdates === false) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setTitle("Channel Created");
  embed.setDescription([
    `**Channel Name:** ${channel.name}`,
    `**Channel ID:** ${channel.id}`,
    `**Channel Type:** ${channelTypes[channel.type]}`
  ].join("\n"));

  // Log the embed
  logging(embed, channel.guild, client, { type: "guild", messageType: "embed" });
}

/**
 * A function to handle when a channel has been deleted
 * @param {NewsChannel | TextChannel | StageChannel | VoiceChannel} channel The deleted channel
 * @param {Client} client The bots client
 */
module.exports.delete = async function(channel, client) {
  // Ensure provided parameters are valid
  if (
    (
      !channel instanceof NewsChannel &&
      !channel instanceof TextChannel &&
      !channel instanceof StageChannel &&
      !channel instanceof VoiceChannel
    ) ||
    !client instanceof Client
  ) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: channel.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure logging is enabled for this type
  if (loggingTypes?.channelUpdates === false) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setTitle("Channel Deleted");
  embed.setDescription([
    `**Channel Name:** ${channel.name}`,
    `**Channel ID:** ${channel.id}`,
    `**Channel Type:** ${channelTypes[channel.type]}`
  ].join("\n"));

  // Log the embed
  logging(embed, channel.guild, client, { type: "guild", messageType: "embed" });
}

/**
 * A function to handle when a channel has been updated
 * @param {NewsChannel | TextChannel | StageChannel | VoiceChannel} oldChannel The old channel
 * @param {NewsChannel | TextChannel | StageChannel | VoiceChannel} newChannel The new channel
 * @param {Client} client The bots client
 */
module.exports.update = async function(oldChannel, newChannel, client) {
  // Ensure provided parameters are valid
  if (
    (
      !newChannel instanceof NewsChannel &&
      !newChannel instanceof TextChannel &&
      !newChannel instanceof StageChannel &&
      !newChannel instanceof VoiceChannel
    ) || (
      !oldChannel instanceof NewsChannel &&
      !oldChannel instanceof TextChannel &&
      !oldChannel instanceof StageChannel &&
      !oldChannel instanceof VoiceChannel
    ) ||
    !client instanceof Client
  ) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: newChannel.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure logging is enabled for this type
  if (loggingTypes?.channelUpdates === false) return;

  // Define an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();

  // If the channel name has changed
  if (oldChannel.name !== newChannel.name) {
    // Set embed data
    embed.setTitle("Channel Updated");
    embed.setDescription([
      `**Old Channel Name:** ${oldChannel.name}`,
      `**New Channel Name:** ${newChannel.name}`,
      `**Channel ID:** ${newChannel.id}`,
      `**Channel Type:** ${channelTypes[newChannel.type]}`
    ].join("\n"));

    // Log the embed
    logging(embed, newChannel.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the channel type has changed
  if (oldChannel.type !== newChannel.type) {
    // Set embed data
    embed.setTitle("Channel Updated");
    embed.setDescription([
      `**Channel Name:** ${newChannel.name}`,
      `**Channel ID:** ${newChannel.id}`,
      `**Old Channel Type:** ${oldChannel.type}`,
      `**New Channel Type:** ${channelTypes[newChannel.type]}`
    ].join("\n"));

    // Log the embed
    logging(embed, newChannel.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the channel topic has changed
  if (oldChannel.topic !== newChannel.topic) {
    // Set embed data
    embed.setTitle("Channel Updated");
    embed.setDescription([
      `**Channel Name:** ${newChannel.name}`,
      `**Channel ID:** ${newChannel.id}`,
      `**Old Channel Topic:** ${oldChannel.topic || "None"}`,
      `**New Channel Topic:** ${newChannel.topic || "None"}`
    ].join("\n"));

    // Log the embed
    logging(embed, newChannel.guild, client, { type: "guild", messageType: "embed" });
  }
}