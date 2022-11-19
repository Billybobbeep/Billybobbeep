const { Client, CommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { logging, checkMod } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

module.exports = {
  name: "purge",
  description: "Delete messages in bulk",
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
    // Add an option to provide a count
    builder.addIntegerOption((option) => {
      // Basic option information
      option.setName("count");
      option.setDescription("The number of messages to delete");
      // If the option is required
      option.setRequired(true);
      // Min & max values
      option.setMinValue(1);
      option.setMaxValue(100);
      // Return the option
      return option;
    });
    // Add an option to provide a reason
    builder.addStringOption((option) => {
      // Basic option information
      option.setName("reason");
      option.setDescription("The reason for deleting messages");
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
    // Fetch the guild from the database
    const guild = await guilds.findOne({ guildId: interaction.guildId });

    // Ensure the user is a moderator
    if (!(await checkMod(interaction, guild)))
      return interaction.followUp({ content: "You must be a moderator to warn users", ephemeral: true });

    // Define error flag
    let errorExists = false;

    // Define options
    let count = interaction.options.data.find(option => option.name === "count")?.value;
    let reason = interaction.options.data.find(option => option.name === "reason")?.value;

    if (!count || count > 100 || count < 1)
      return interaction.reply({ content: "You must provide a valid count", ephemeral: true });

    interaction.channel.bulkDelete(count).catch(() => errorExists = true);

    if (errorExists)
      return interaction.reply({ content: "Unable to delete messages, ensure the meessages aren't over 2 weeks old", ephemeral: true });

    const embed = new EmbedBuilder();
    embed.setTitle("Messages Purged");
    embed.setColor("#447ba1");
    embed.setDescription([
      `**Count:** ${count}`,
      `**Reason:** ${reason || "No reason provided"}`,
      `**Responsible Moderator:** ${interaction.user.tag}`,
    ].join("\n"));

    logging(embed, interaction, client, { messageType: "embed", type: "interaction" });

    interaction.reply({ content: `Deleted ${count} messages`, ephemeral: true });
  }
}