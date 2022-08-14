const { Message, Client, EmbedBuilder } = require("discord.js");
const { logging } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

/**
 * A function to handle deleted messages
 * @param {Message} message The deleted message
 * @param {Client} client The bots client
 */
module.exports = async function(message, client) {
  if (!message instanceof Message || message.author?.bot) return;

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: message.guild.id });
  let loggingTypes = guild?.preferences?.loggingTypes;

  // Ensure logging is enabled for this type
  if (loggingTypes?.messageDeletes === false) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setTitle("Message Deleted");
  embed.setDescription([
    `**Content:** ${message.content.length ? message.content : "*This message contained no content*"}`,
    `**Message ID:** ${message.id}`,
    `**Channel:** <#${message.channel.id}>\n`,
    `**Author:** <@!${message.author.id}>`,
    `**Author Tag:** ${message.author.tag}`,
    `**Author ID:** ${message.author.id}`,
    `**Attachments:** ${message.attachments.size > 0
      ? message.attachments.map(a => `[${a.name}](${a.proxyURL})`).join("\n")
      : ""
    }`
  ].join("\n"));

  // Log the embed
  logging(embed, message.guild, client, { type: "guild", messageType: "embed" });
}