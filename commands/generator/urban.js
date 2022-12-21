const { Client, CommandInteraction, SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { default: axios } = require("axios");
const badwords = require("badwords");

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
    // Add an option to provide a phrase
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("phrase");
      // Set the option description
      option.setDescription("The phrase to lookup");
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
    let word = (interaction.options.data).find((option) => option.name === "phrase")?.value;

    // Construct an embed
    const embed = new EmbedBuilder();
    // Set the embed data
    embed.setTitle(`Definition of **${word}**`);
    embed.setDescription(`No results found for ${word}`);
    // Set the default properties of the embed
    embed.setColor("#447ba1");

    // Defer a reply
    await interaction.deferReply();

    let definitionObj = await axios.get(`http://api.urbandictionary.com/v0/define?term=${word}`);
    let includesBadwords = false;

    if (!definitionObj || !definitionObj.data || !definitionObj.data?.list || !definitionObj.data?.list?.length)
      return interaction.followUp({ embeds: [embed] });

    definitionObj = definitionObj.data.list[0];
    let definition = definitionObj.definition;
    let split = definition.split(/ +/g);

    for await (let badword of badwords) {
      if (split.includes(badword))
        includesBadwords = true;
    }

    if (includesBadwords && !interaction.channel.nsfw)
      return interaction.followUp({ content: "This definition may include some nsfw content, please rerun this command in an nsfw channel" });
    else
      embed.setDescription((definition).replaceAll("[", "").replaceAll("]", ""));

    embed.setFooter({
      text: `Billybobbeep is not responsible for what you search | Written by: ${definitionObj.author || "Unknown"}`,
    });
    embed.addFields({
      name: "Upvotes",
      value: (definitionObj.thumbs_up || 0).toString(),
      inline: true
    }, {
      name: "Downvotes",
      value: (definitionObj.thumbs_down || 0).toString(),
      inline: true
    });

    interaction.followUp({ embeds: [embed], ephemeral: false });
  }
}