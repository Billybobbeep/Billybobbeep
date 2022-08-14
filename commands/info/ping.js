const { Client, CommandInteraction, SlashCommandBuilder} = require("discord.js");

module.exports = {
  name: "ping",
  description: "View the reaction times",
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
    builder.setDMPermission(true);
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: function(interaction, client) {
    if (parseInt(client.ws.ping) > 500) {
      interaction.reply({
        content: `**Pong** in ${client.ws.ping}ms\n\n⚠ It appears I have a slow connection, please be patient`
      });
    } else {
      interaction.reply({
        content: `**Pong** in ${client.ws.ping}ms`
      });
    }
  }
}