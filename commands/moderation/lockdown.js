const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "lockdown",
  description: "Lockdown the server",
  category: "moderation",
  slashInfo: {
    enabled: false,
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
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: function(interaction, client) {
    // TODO: Create a lockdown command
  }
}