const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { correctCapitalisation } = require("../../utils/functions");

module.exports = {
  name: "vote",
  description: "Vote for the bot",
  category: "",
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
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: function(interaction, client) {
    // Construct an embed
    const embed = new EmbedBuilder();
    // Set the embed data
    embed.setTitle(`Vote for ${correctCapitalisation(client.user.username)}`);
    embed.setDescription(`[See here](https://top.gg/bot/${client.user.id}/vote) to vote for Billybobbeep on [top.gg](https://top.gg)`);
    // Set the default properties of the embed
    embed.setColor("#447ba1");
    embed.setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
}