const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const guildMembers = require("../../database/models/guildMembers");

module.exports = {
  name: "warnings",
  description: "View a user's warnings",
  category: "moderation",
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
    builder.addUserOption((option) => {
      // Option name
      option.setName("user");
      // Option description
      option.setDescription("The user to view warnings for");
      // The option is not required
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
    let fields = [];

    // Send a "thinking" message to the user
    await interaction.deferReply();

    // Get the user from the command
    let user = interaction.options.data[0] ? interaction.options.data[0].value : interaction.user;

    // If the user is an ID, get the user object
    if (!isNaN(user))
      user = await client.users.fetch(user);
      
    // Ensure the user isn't a bot
    if (user.bot)
      return interaction.followUp({ content: "Bots do not have warnings", ephemeral: true });

    let member = await guildMembers.findOne({ memberId: user.id, guildId: interaction.guild.id });

    if (!member) {
      // Add the user to the database
      new guildMembers({
        guildId: interaction.guild.id,
        memberId: user.id,
      });
      // Send a message to the user
      return interaction.followUp({ content: `${user.username} doesn't have any warnings` });
    }

    // Get the warnings
    let warnings = member.warnings || [];

    // If the user has no warnings
    if (warnings.length < 1) {
      return interaction.followUp({ content: `${user.username} doesn't have any warnings` });
    }

    // Create the embed
    let embed = new EmbedBuilder();
    // Set the title
    embed.setDescription(`${user.username} has **${warnings.length}** warnings`);
    // Default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    embed.setAuthor({
      name: user.tag,
      iconURL: user.displayAvatarURL()
    });
    // Add the warnings
    warnings = warnings.sort((a, b) => b.id - a.id);
    if (warnings.length > 10)
      warnings.length = 10;
    await warnings.forEach(async (warning) => {
      // Fetch the responsible moderator
      let mod = await interaction.guild.members.fetch(warning.moderatorId);
      // Add the warning to the fields array
      fields.push({
        name: `Case #${warning.id}`,
        value: [
          "Reason: " + warning.reason,
          "Moderator: " + mod?.user.tag || "Unknown",
        ].join("\n"),
      });
    });
    // If there are fields, add them to the embed
    if (fields.length > 0)
      embed.setFields(fields);

    // Send the warnings to the user
    interaction.followUp({ embeds: [embed] });
  }
}