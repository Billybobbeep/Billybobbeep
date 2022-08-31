const { Client, CommandInteraction, ChannelType, EmbedBuilder, AttachmentBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Create an embed",
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
    // Add an option to s et a title
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("title");
      // Set the option description
      option.setDescription("The title of the embed");
      // If the option is required
      option.setRequired(false);
      // Set the minimum and maximum length requirements
      option.setMinLength(3);
      option.setMaxLength(256);
      // Return the option
      return option;
    });
    // Add an option to set a description
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("description");
      // Set the option description
      option.setDescription("The description of the embed");
      // If the option is required
      option.setRequired(false);
      // Set the minimum and maximum length requirements
      option.setMinLength(3);
      option.setMaxLength(4096);
      // Return the option
      return option;
    });
    // Add an option to set a footer
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("footer");
      // Set the option description
      option.setDescription("The footer of the embed");
      // If the option is required
      option.setRequired(false);
      // Set the minimum and maximum length requirements
      option.setMinLength(3);
      option.setMaxLength(2048);
      // Return the option
      return option;
    });
    // Add an option to set a color
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("color");
      // Set the option description
      option.setDescription("The color of the embed");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Add an option to set a thumbnail
    builder.addAttachmentOption((option) => {
      // Set the option name
      option.setName("thumbnail");
      // Set the option description
      option.setDescription("The thumbnail of the embed");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Add an option to provide a channel to send the embed in
    builder.addChannelOption((option) => {
      // Set the option name
      option.setName("channel");
      // Set the option description
      option.setDescription("The channel to send the embed in");
      // If the option is required
      option.setRequired(false);
      // Set the channel types
      option.addChannelTypes(ChannelType.GuildText);
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
    let title = (interaction.options.data).find((option) => option.name === "title")?.value;
    let description = (interaction.options.data).find((option) => option.name === "description")?.value;
    let thumbnail = (interaction.options.data).find((option) => option.name === "thumbnail")?.attachment;
    let footer = (interaction.options.data).find((option) => option.name === "footer")?.value;
    let color = (interaction.options.data).find((option) => option.name === "color")?.value;
    let channel = (interaction.options.data).find((option) => option.name === "channel")?.value;

    // Ensure the opptions are valid
    if (title && title.length < 3)
      return interaction.reply({ content: "The title must be at least 3 characters long", ephemeral: true });
    if (title && title.length > 256)
      return interaction.reply({ content: "The title must be less than 256 characters long", ephemeral: true });
    if (description && description.length > 4096)
      return interaction.reply({ content: "The description must be less than 4096 characters long", ephemeral: true });
    if (footer && footer.length < 3)
      return interaction.reply({ content: "The footer must be at least 3 characters long", ephemeral: true });
    if (footer && footer.length > 100)
      return interaction.reply({ content: "The footer must be less than 100 characters long", ephemeral: true });
    if (color && !/^#[0-9A-F]{6}$/i.test(color))
      return interaction.reply({ content: "The color must be in hex formatting", ephemeral: true });

    // Ensure at least one option is set
    if (!title && !description && !thumbnail)
      return interaction.reply({ content: "You must provide either a title or description", ephemeral: true });

    if (!channel)
      channel = interaction.channel.id;

    channel = await interaction.guild.channels.fetch(channel);

    if (!channel || channel.type !== ChannelType.GuildText)
      return interaction.reply({ content: "You must provide a valid channel", ephemeral: true });

    // Construct an embed
    let embed = new EmbedBuilder();
    // Set the title
    if (title)
      embed.setTitle(title);
    // Set the description
    if (description)
      embed.setDescription(description);
    // Set the thumbnail
    if (thumbnail)
      embed.setThumbnail(thumbnail.url);
    // Set the footer
    if (footer)
      embed.setFooter({ text: footer });
    // Set the color
    if (color)
      embed.setColor(color || "#447ba1");
    else
      embed.setColor("#447ba1");

    // Define an error flag
    let errorExists = false;

    // Send the embed
    await channel
      .send({ embeds: [embed] })
      .catch(() => {
        // Set the error flag
        errorExists = true;
        // Send the error message
        interaction.reply({ content: "Something went wrong, ensure you have not provided over 6000 characters for the embed and the bot has permission to send messages in this channel", ephemeral: true });
      });

    // Ensure an error is not present
    if (errorExists) return;

    // Reply to the user
    interaction.reply({ content: "The embed has been created", ephemeral: false });
  }
}