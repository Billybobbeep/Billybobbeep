const { GuildScheduledEvent, Client, EmbedBuilder } = require("discord.js");
const { logging } = require("../../utils/functions");
const { format } = require("date-fns");
const guilds = require("../../database/models/guilds");

/**
 * A function to handle when an event has been created
 * @param {GuildScheduledEvent} event The event created
 * @param {Client} client The bots client
 */
module.exports.create = async function(event, client) {
  // If the event is not valid, return
  if (!event instanceof GuildScheduledEvent || !client) return;
  // If the event was created by the bot, return
  if (event.creator.id === client.user.id) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: event.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure that logging is enabled for this type
  if (loggingTypes.eventCreate === false) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setTitle("Event Created");
  embed.setDescription([
    `**Event Name:** ${event.name}`,
    event.description ? ("**Event Description:** " + event.description) : "",
    `**Event ID:** ${event.id}`,
    `**Event Start Time:** ${format(new Date(event.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
    event.scheduledEndTimestamp
      ? ("**Event End Time:** " + format(new Date(event.scheduledEndTimestamp), "yyyy-MM-dd HH:mm"))
      : "",
    `**Event Channel:** <#${event.channel.id}>\n`,
    `**Event Creator:** ${event.creator.tag}`
  ].filter(x => x !== "").join("\n"));

  // Send the embed
  logging(embed, event.guild, client, { type: "guild", messageType: "embed" });
}

/**
 * A function to handle when an event has been deleted
 * @param {GuildScheduledEvent} event The event deleted
 * @param {Client} client The bots client
 */
module.exports.delete = async function(event, client) {
  // If the event is not valid, return
  if (!event instanceof GuildScheduledEvent || !client) return;
  // If the event was created by the bot, return
  if (event.creator.id === client.user.id) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: event.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure that logging is enabled for this type
  if (loggingTypes.eventDelete === false) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setTitle("Event Deleted");
  embed.setDescription([
    `**Event Name:** ${event.name}`,
    event.description ? ("**Event Description:** " + event.description) : "",
    `**Event ID:** ${event.id}`,
    `**Event Start Time:** ${format(new Date(event.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
    event.scheduledEndTimestamp
      ? ("**Event End Time:** " + format(new Date(event.scheduledEndTimestamp), "yyyy-MM-dd HH:mm"))
      : "",
    `**Event Channel:** <#${event.channel.id}>\n`,
    `**Event Creator:** ${event.creator.tag}`
  ].filter(x => x !== "").join("\n"));

  // Send the embed
  logging(embed, event.guild, client, { type: "guild", messageType: "embed" });
}

/**
 * A function to handle when an event has been updated
 * @param {GuildScheduledEvent} oldEvent The old event object
 * @param {GuildScheduledEvent} newEvent The new event object
 * @param {Client} client The bots client
 */
module.exports.update = async function(oldEvent, newEvent, client) {
  // If the event is not valid, return
  if (
    !oldEvent instanceof GuildScheduledEvent ||
    !newEvent instanceof GuildScheduledEvent ||
    !client
  ) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: newEvent.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure that logging is enabled for this type
  if (loggingTypes.eventUpdate === false) return;

  // Define the embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();

  // If the events name has been changed
  if (oldEvent.name !== newEvent.name) {
    // Set the embed data
    embed.setTitle("Event Updated");
    embed.setDescription([
      `**Old Event Name:** ${oldEvent.name}`,
      `**New Event Name:** ${newEvent.name}`,
      `**Event ID:** ${newEvent.id}`,
      `**Event Channel:** <#${newEvent.channel.id}>`,
      `**Event Start Time:** ${format(new Date(newEvent.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
      newEvent.scheduledEndTimestamp
        ? ("**Event End Time:** " + format(new Date(newEvent.scheduledEndTimestamp), "yyyy-MM-dd HH:mm") + "\n")
        : "\n",
      `**Event Creator:** ${newEvent.creator.tag}`
    ].filter(x => x !== "").join("\n"));

    // Send the embed
    logging(embed, newEvent.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the events description has been changed
  if (oldEvent.description !== newEvent.description) {
    // Set the embed data
    embed.setTitle("Event Updated");
    embed.setDescription([
      `**Event Name:** ${newEvent.name}`,
      `**Old Event Description:** ${oldEvent.description || "*No description*"}`,
      `**New Event Description:** ${newEvent.description || "*No description*"}`,
      `**Event ID:** ${newEvent.id}`,
      `**Event Channel:** <#${newEvent.channel.id}>`,
      `**Event Start Time:** ${format(new Date(newEvent.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
      newEvent.scheduledEndTimestamp
        ? ("**Event End Time:** " + format(new Date(newEvent.scheduledEndTimestamp), "yyyy-MM-dd HH:mm") + "\n")
        : "\n",
      `**Event Creator:** ${newEvent.creator.tag}`
    ].filter(x => x !== "").join("\n"));

    // Send the embed
    logging(embed, newEvent.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the events channel has been changed
  if (oldEvent.channel.id === newEvent.channel.id) {
    // Set the embed data
    embed.setTitle("Event Updated");
    embed.setDescription([
      `**Event Name:** ${newEvent.name}`,
      `**Event Description:** ${newEvent.description || "*No description*"}`,
      `**Event ID:** ${newEvent.id}`,
      `**Event Start Time:** ${format(new Date(newEvent.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
      `**Old Event Channel:** <#${oldEvent.channel.id}>`,
      `**New Event Channel:** <#${newEvent.channel.id}>`,
      `**Event End Time:** ${format(new Date(newEvent.scheduledEndTimestamp), "yyyy-MM-dd HH:mm")}`,
      `**Event Creator:** ${newEvent.creator.tag}`
    ].filter(x => x !== "").join("\n"));

    // Send the embed
    logging(embed, newEvent.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the events start time has been changed
  if (oldEvent.scheduledStartTimestamp !== newEvent.scheduledStartTimestamp) {
    // Set the embed data
    embed.setTitle("Event Updated");
    embed.setDescription([
      `**Event Name:** ${newEvent.name}`,
      `**Event Description:** ${newEvent.description || "*No description*"}`,
      `**Event ID:** ${newEvent.id}`,
      `**Old Event Start Time:** ${format(new Date(oldEvent.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
      `**New Event Start Time:** ${format(new Date(newEvent.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
      `**Event Channel:** <#${newEvent.channel.id}>`,
      `**Event End Time:** ${format(new Date(newEvent.scheduledEndTimestamp), "yyyy-MM-dd HH:mm")}`,
      `**Event Creator:** ${newEvent.creator.tag}`
    ].filter(x => x !== "").join("\n"));

    // Send the embed
    logging(embed, newEvent.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the events end time has been changed
  if (oldEvent.scheduledEndTimestamp !== newEvent.scheduledEndTimestamp) {
    // Set the embed data
    embed.setTitle("Event Updated");
    embed.setDescription([
      `**Event Name:** ${newEvent.name}`,
      `**Event Description:** ${newEvent.description || "*No description*"}`,
      `**Event ID:** ${newEvent.id}`,
      `**Event Start Time:** ${format(new Date(newEvent.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
      oldEvent.scheduledEndTimestamp
        ? `**Old Event End Time:** ${format(new Date(oldEvent.scheduledEndTimestamp), "yyyy-MM-dd HH:mm")}`
        : "**Old Event End Time:** None",
      newEvent.scheduledEndTimestamp
        ? `**New Event End Time:** ${format(new Date(newEvent.scheduledEndTimestamp), "yyyy-MM-dd HH:mm")}`
        : "**New Event End Time:** None",
      `**Event Channel:** <#${newEvent.channel.id}>\n`,
      `**Event Creator:** ${newEvent.creator.tag}`
    ].filter(x => x !== "").join("\n"));

    // Send the embed
    logging(embed, newEvent.guild, client, { type: "guild", messageType: "embed" });
  }
}