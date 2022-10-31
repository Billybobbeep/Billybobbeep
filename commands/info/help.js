const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "help",
  description: "Get a general overview of the bot",
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
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: function(interaction, client) {
    const embed = new EmbedBuilder();

    embed.setTitle("Billybobbeep | Help");
    embed.setColor("#447ba1");
    embed.setDescription([
      "To view our commands, use </commands:1016374432249430037>\n",
      "To whom it may concern, we have a [Privacy Policy](https://docs.google.com/document/d/1bIQNkYiQf1aGLqGYqyjN5dV0cOwvrpJVUnhF7PSBcoI/edit?usp=sharing) and a [Terms of Use](https://docs.google.com/document/d/1rDoLsEn7Ad27fg-px8Sxhu3V1xCWH-TKdtOkHwB8a28/edit?usp=sharing) policy publicly available"
    ].join("\n"));

    interaction.reply({ embeds: [embed], ephemeral: false });
  }
}