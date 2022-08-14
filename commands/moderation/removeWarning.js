const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js");
const { checkMod } = require("../../utils/functions");
const members = require("../../database/models/guildMembers");

module.exports = {
  name: "warn_remove",
  description: "Remove a user's warning",
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
    // Option to select user
    builder.addUserOption((option) => {
      // The options title
      option.setName("user");
      // The options description
      option.setDescription("The user to remove the warning from");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    // Option to select warning
    builder.addNumberOption((option) => {
      // The options title
      option.setName("case");
      // The options description
      option.setDescription("The warning to remove");
      // If the option is required
      option.setRequired(true);
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
    // Send a "thinking" message to the user
    await interaction.deferReply();

    // Get the user from the command
    let user = interaction.options.data?.find(x => x.name === "user")?.value || null;
    let caseNo = interaction.options.data?.find(x => x.name === "case")?.value || null;

    if (!user || !caseNo)
      return interaction.followUp({ content: "Some required arguments were not provided", ephemeral: true });

    // If the user is an ID, get the user object
    if (!isNaN(user))
      user = await client.users.fetch(user);

    // Ensure the user isn't a bot
    if (user.bot)
      return interaction.followUp({ content: "Bots do not have warnings", ephemeral: true });

    // Ensure the user is a moderator
    if (!(await checkMod(interaction)))
      return interaction.followUp({ content: "You must be a moderator to remove user's warnings", ephemeral: true });

      // Find the member object in the database
    let member = await members.findOne({ memberId: user.id, guildId: interaction.guild.id });

    // Ensure the member object exists and has warnings
    if (!member || member.warnings?.length < 1)
      return interaction.followUp({ content: "The user has no warnings", ephemeral: true });

      // Ensure the case number is valid
    if (member.warnings.length < caseNo)
      return interaction.followUp({ content: `Could not find case ${caseNo}`, ephemeral: true });

    // Remove the warning
    let warnings = [...member.warnings]
    warnings.splice(caseNo - 1, 1);
    member.warnings = warnings;


    // Mark the data as modified
    member.markModified("warnings");
    // Save the new member object
    member.save();

    // Send a message to the user
    return interaction.followUp({ content: `Warning ${caseNo} has been removed`, ephemeral: false });
  }
}