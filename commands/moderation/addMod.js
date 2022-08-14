const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { logging, checkMod } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

module.exports = {
  name: "addmod",
  description: "Allow a user to have moderator permissions",
  category: "mod",
  slashInfo: {
    enabled: true,
    public: true
  },
  /**
   * Get the command's slash info
   * @returns The slash information
   */
  getSlashInfo: function() {
    const builder = new SlashCommandBuilder();
    // Set basic command information
    builder.setName(this.name);
    builder.setDescription(this.description);
    // If the command can be used in DMs
    builder.setDMPermission(false);
    // Option to select user
    builder.addUserOption((option) => {
      // Set the option name
      option.setName("user");
      // Set the option description
      option.setDescription("The user to add as a moderator");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    // Add an option to provide a reason
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("reason");
      // Set the option description
      option.setDescription("The reason for adding the user as a moderator");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: async function(interaction, client) {
    // Defer the reply
    await interaction.deferReply();

    // Ensure the user is a moderator
    if (!(await checkMod(interaction)))
      return interaction.followUp({ content: "You must be a moderator to add new moderators", ephemeral: true });

    let user = (interaction.options.data).find(option => option.name === "user")?.value;
    let reason = (interaction.options.data).find(option => option.name === "reason")?.value;

    if (!user)
      return interaction.followUp({ content: "You must provide a user to add as a moderator", ephemeral: true });

    user = await client.users.fetch(user);

    if (!user)
      return interaction.followUp({ content: "The user you provided was not found", ephemeral: true });

    // Get the guild
    let guild = await guilds.findOne({ guildId: interaction.guild.id });

    if (!guild) {
      // Create a new document
      guild = new guilds({ guildId: interaction.guild.id });
      // Save the new document
      guild.save();
    }

    // Add the user to the guild
    if (!guild.preferences)
      guild.preferences = {};

    if (Array.isArray(guild.preferences.customMods) && (guild.preferences.customMods).includes(user.id))
      return interaction.followUp({ content: `${user.username} is already a moderator`, ephemeral: true });
    
    // Add the user to the list of custom moderators
    if (!guild.preferences.customMods) {
      guild.preferences.customMods = [user.id];
    } else {
      (guild.preferences.customMods).push(user.id);
    }
    
    // Mark the document as modified
    guild.markModified("preferences");
    // Save the document
    guild.save();

    // Construct an embed
    const embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    // Set embed data
    embed.setTitle("Moderator Added");
    embed.setDescription([
      `**User:** <@!${user.id}>`,
      `**User Tag:** ${user.tag}`,
      `**User ID:** ${user.id}`,
      `**Reason:** ${reason || "No reason provided"}`,
      `**Responsible Moderator:** ${interaction.user.tag}`,
    ].join("\n"));

    // Log the action
    logging(embed, interaction, client, { type: "interaction", messageType: "embed" });

    // Send a success message
    interaction.followUp({ content: `Added ${user.username} as a moderator`, ephemeral: true });
  }
}