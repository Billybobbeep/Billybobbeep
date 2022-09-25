const { Message, Client, EmbedBuilder } = require("discord.js");
const { logging, checkMod } = require("../../utils/functions");
const { default: axios } = require("axios");
const guilds = require("../../database/models/guilds");

/**
 * The callback for when an invite link is found
 * @param {object} res The response from the API
 * @param {Message} message The original message
 * @param {Client} client The bots client
 */
async function inviteCallback(res, message, client) {
  // Construct an embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();
  // Set embed data
  embed.setDescription([
    `The server '${message.guild.name}' does not allow you to send external invite links.`,
    `**Detected invite link:** https://discord.gg/${res.code}`
  ].join("\n"));

  await message.author
    .send({ embeds: [embed] })
    .catch(() => {
      embed.setFooter({
        text: "The user was not notified"
      });
    });

  // Set embed data
  embed.setTitle("Invite Link Detected");
  embed.setDescription([
    `**Link:** discord.gg/${res.code}`,
    `**Invite for:** ${res.guild.name}`,
    `**Message ID:** ${message.id}`,
    `**Channel:** <#${message.channel.id}>\n`,
    `**Author:** <@!${message.author.id}>`,
    `**Author Tag:** ${message.author.tag}`,
    `**Author ID:** ${message.author.id}`,
  ].join("\n"));

  // Log the embed
  logging(embed, message.guild, client, { type: "guild", messageType: "embed" });
}

/**
 * A function to handle when invite links have been sent
 * @param {Message} message The message to check
 * @param {Client} client The bots client
 */
module.exports = async function(message, client) {
  // Return if the message is not a message or the message author is a bot
  if (!message instanceof Message || message.author?.bot) return;

  let knownInviteLinks = ["dsc.gg", "discord.gg", "discord.com/invite"];

  // Find the guild from the database
  let guild = await guilds.findOne({ guildId: message.guild.id });
  let serverOptions = guild?.preferences?.serverOptions;

  // Ensure logging is enabled for this type
  if (!serverOptions || serverOptions?.invitesEnabled === false) return;

  // Ensure the message wasn't sent from an administrator or mod
  if (message.member.permissions.has("Administrator")) return;
  if (!(await checkMod(message))) return;

  // Define a found flag
  let found = false;

  knownInviteLinks.forEach(link => {
    if ((message.content).toLowerCase().includes(link)) {
      found = true;
    }
  });

  // If the message doesn't contain a known invite link, return
  if (!found) return;

  // Delete the message
  if (message.deletable) {
    message
      .delete()
      .catch(() => null);
  }

  (message.content).split(/ +/g).forEach((word) => {
    let word1 = word.split("/");
    word1.forEach(async (word2) => {
      if (knownInviteLinks.includes(word2.toLowerCase())) {
        let res = await axios.get(`https://discord.com/api/v10/invites/${word.split("/")[1]}`);

        // If there is an error, return
        if (!res.data || res.data?.error) return;

        inviteCallback(res.data, message, client);
      }
    });
  });
}