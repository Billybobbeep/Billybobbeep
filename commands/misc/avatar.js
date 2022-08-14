const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Get the avatar of a user",
  category: "info",
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
    // Add an option to provide a user
    builder.addUserOption((option) => {
      // Set the option name
      option.setName("user");
      // Set the option description
      option.setDescription("The user to get the avatar of");
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
  execute: async function(interaction, _client) {
    // Find the command options
    let user = (interaction.options.data).find((option) => option.name === "user")?.value;

    if (!user)
      user = interaction.user.id;

    let userObj = await interaction.guild.members.fetch(user);

    if (!userObj)
      userObj = interaction.user;

    // Send the avatar
    interaction.reply({ content: userObj.displayAvatarURL() });
  }
}