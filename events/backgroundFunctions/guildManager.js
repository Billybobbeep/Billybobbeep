const { Guild, Client, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { logging } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");
const guildMembers = require("../../database/models/guildMembers");

/**
 * A function to handle when a guild gets added
 * @param {Guild} guild The guild added
 * @param {Client} client The bots client
 */
module.exports.create = async function(guild, client) {
  // Ensure the guild parameter exists
  if (!guild instanceof Guild || !guild.name) return;

  // Add the server to the database
  new guilds({ guildId: guild.id })
    .save()
    .catch(() => console.log("Error adding guild to database"));

  // Fetch the bots member object for the guild
  let me = await guild.members.fetchMe();
  
  if (me && me.permissions.has(PermissionFlagsBits.ManageRoles)) { // If the bot has the manage roles permission
    // Create the default role
    let role = await guild.roles.create({
      name: "Billy 🤩", // The name of the role
      color: "#e5f7b2", // Yellow
      reason: "Default role for Billybobbeep", // The reason for the role creation
      position: me.roles.highest.position - 1 // Set the position to directly below the bots highest role
    }).catch(() => null);
    // Add the role to the bot
    me.roles
      .add(role)
      .catch(() => null);
  }

  // Construct an embed
  const embed = new EmbedBuilder();
  embed.setTitle("Guild Added");
  embed.setDescription(
    `**Guild Name:** ${guild.name}\n` + `**Guild ID:** ${guild.id}`
  );
  embed.setColor("#447ba1");
  embed.setTimestamp();
  embed.setThumbnail(guild.iconURL({ dynamic: true }));
  embed.setFooter({
    text: `Total Guilds: ${client.guilds.cache.size}`
  });
  // Log the embed
  logging(embed, "942042511793328138", client, { type: "channel", messageType: "embed" });

  // Post the slash commands to the server
  require("../client/ready").setupSlashCommands(guild, client);
}
/**
 * A function to handle when a guild gets removed
 * @param {Guild} guild The guild removed
 * @param {Client} client The bots client
 */
module.exports.delete = async function(guild, client) {
  // Ensure the guild parameter exists
  if (!guild instanceof Guild || !guild.name) return;

  // Construct an embed
  const embed = new EmbedBuilder();
  embed.setTitle("Guild Removed");
  embed.setDescription(
    `**Guild Name:** ${guild.name}\n` + `**Guild ID:** ${guild.id}`
  );
  embed.setColor("#447ba1");
  embed.setTimestamp();
  embed.setThumbnail(guild.iconURL({ dynamic: true }));
  embed.setFooter({
    text: `Total Guilds: ${client.guilds.cache.size}`
  });
  // Log the embed
  logging(embed, "942042511793328138", client, { type: "channel", messageType: "embed" });

  // Remove the guild from the database
  await guilds.deleteOne({ guildId: guild.id });
  // Remove any guild members saved from the database
  await guildMembers.deleteMany({ guildId: guild.id });
}