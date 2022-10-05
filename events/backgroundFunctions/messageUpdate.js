const { Message, Client, EmbedBuilder } = require("discord.js");
const { logging } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

/**
 * A function to handle updated messages
 * @param {Message} oldMessage The old message
 * @param {Message} newMessage The new message
 * @param {Client} client The bots client
 */
module.exports = async function(oldMessage, newMessage, client) {
  // Ensure both message objects are provided and valid
  if (
    !newMessage instanceof Message ||
    !oldMessage instanceof Message ||
    newMessage.author?.bot
    ) return;
  // Ensure the message has been updated
  if ((oldMessage.content)?.toLowerCase() === (newMessage.content)?.toLowerCase()) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: newMessage.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  if (!loggingTypes?.messageUpdates) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set the data
  embed.setTitle("Message Edited");
  embed.setDescription([
    `**Old Content:** ${oldMessage.content.length > 0 && !(/^\s*$/).test(oldMessage.content) ? oldMessage.content : "*This message provided no content*"}`,
    `**New Content:** ${newMessage.content.length > 0 && !(/^\s*$/).test(newMessage.content) ? newMessage.content : "*This message provided no content*"}`,
    `**Message ID:** ${newMessage.id}`,
    `**Channel:** <#${newMessage.channel.id}>\n`,
    `**Author:** <@!${newMessage.author.id}>`,
    `**Author Tag:** ${newMessage.author.tag}`,
    `**Author ID:** ${newMessage.author.id}`
  ].join("\n"));

  // Log the embed
  logging(embed, newMessage.guild, client, { type: "guild", messageType: "embed" });
}