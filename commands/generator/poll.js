const { Client, CommandInteraction, SlashCommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  name: "poll",
  description: "Create a poll",
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
    // Add an option to provide a message
    builder.addStringOption((option) => {
      // Set the name of the option
      option.setName("message");
      // Set the description of the option
      option.setDescription("The poll message");
      // Set the required value of the option
      option.setRequired(true);
      // Set min/max length
      option.setMinLength(3);
      option.setMaxLength(2000);
      // Return the option
      return option;
    });
    // Add an option to provide a channel
    builder.addChannelOption((option) => {
      // Set the name of the option
      option.setName("channel");
      // Set the description of the option
      option.setDescription("The channel to send the poll in");
      // Set the required value of the option
      option.setRequired(true);
      // Set the channel type of the option
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
  execute: async function(interaction, client) {
    // Find command options
    let message = (interaction.options.data).find((option) => option.name === "message")?.value;
    let channel = (interaction.options.data).find((option) => option.name === "channel")?.value;

    // Check if the message is valid
    if(!message || message.length >= 2000)
      return interaction.reply({ content: "You must provide a valid message", ephemeral: true });

    // Ensure the channel is valid
    if(!channel || !interaction.guild.channels.cache.has(channel))
      return interaction.reply({ content: "You must provide a valid channel", ephemeral: true });

    // Defer the reply
    await interaction.deferReply();
    
    // Define the error flag
    let errorExists = false;
    // Find the channel object
    channel = await interaction.guild.channels.fetch(channel);

    if (!channel || !channel.type === ChannelType.GuildText)
      return interaction.followUp({ content: "You must provide a valid channel", ephemeral: true });

    // Send the poll
    let msg = await channel.send({ content: message })
      .catch(() => {
        // Set the error flag
        errorExists = true;
        // Send the error message
        interaction.followUp({ content: "An error occurred while sending the poll", ephemeral: true });
      });

    // Ensure an error is not present
    if (errorExists) return;

    await msg.react("👍");
    await msg.react("👎");

    // Reply to the interaction
    interaction.followUp({ content: "Poll sent successfully", ephemeral: false });
  }
}