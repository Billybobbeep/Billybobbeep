const { Client, CommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");

module.exports = {
  name: "urban",
  description: "Lookup a word on Urban Dictionary",
  category: "generator",
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
    // Add an option to provide a word
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("word");
      // Set the option description
      option.setDescription("The word to lookup");
      // If the option is required
      option.setRequired(true);
      // Set the minimum and maximum length requirements
      option.setMinLength(3);
      option.setMaxLength(256);
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
    // Find command options
    let word = (interaction.options.data).find((option) => option.name === "word")?.value;

    // Construct an embed
    const embed = new EmbedBuilder();
    // Set the embed data
    embed.setTitle(`Definition of **${word}**`);
    embed.setDescription(`No results found for ${word}`);
    // Set the default properties of the embed
    embed.setColor("#447ba1");

    // Defer a reply
    await interaction.deferReply();

    let definition = await axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`);

    if (!definition || !definition.data || !definition.data.list || !definition.data.list.length)
      return interaction.reply({ embeds: [embed] });

    definition = definition.data.list[0];

    embed.setDescription((definition.definition).replaceAll("[", "").replaceAll("]", ""));
    embed.setFooter({
      text: `Billybobbeep is not responsible for what you search | Written by: ${definition.author || "Unknown"}`,
    });
    embed.addFields({
      name: "Upvotes",
      value: (definition.thumbs_up || 0).toString(),
      inline: true
    }, {
      name: "Downvotes",
      value: (definition.thumbs_down || 0).toString(),
      inline: true
    });

    interaction.followUp({ embeds: [embed], ephemeral: false });
  }
}