const { SlashCommandSubcommandBuilder, ChannelType } = require("discord.js");

module.exports = {
  /**
   * The create subcommand
   * @param {SlashCommandSubcommandBuilder} command The command object
   * @returns The completed command
   */
  create: function(command) {
    // Set the subcommand's name
    command.setName("create");
    // Set the subcommand's description
    command.setDescription("Create a new event");
    // Add an option to set the name
    command.addStringOption((option) => {
      // Set the option's name
      option.setName("name");
      // Set the option's description
      option.setDescription("The name of the event");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    // Add an option to set the start time
    command.addStringOption((option) => {
      // Set the option's name
      option.setName("start-time");
      // Set the option's description
      option.setDescription("The time the event starts");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    // Add an option to set the channel
    command.addChannelOption((option) => {
      // Set the option's name
      option.setName("channel");
      // Set the option's description
      option.setDescription("The channel the event will be hosted in");
      // If the option is required
      option.setRequired(true);
      // Set the option's channel types
      option.addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildStageVoice);
      // Return the option
      return option;
    });
    // Add an option to set the start time
    command.addStringOption((option) => {
      // Set the option's name
      option.setName("date");
      // Set the option's description
      option.setDescription("The date of the event");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    //Add an option to set the description
    command.addStringOption((option) => {
      // Set the option's name
      option.setName("description");
      // Set the option's description
      option.setDescription("The description of the event");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Add an option to set the end time
    command.addStringOption((option) => {
      // Set the option's name
      option.setName("end-time");
      // Set the option's description
      option.setDescription("The time the event ends");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Add an option to set the image
    command.addAttachmentOption((option) => {
      // Set the option's name
      option.setName("image");
      // Set the option's description
      option.setDescription("The image to use for the event");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Return the command
    return command;
  },
  /**
   * The delete subcommand
   * @param {SlashCommandSubcommandBuilder} command The command object
   * @returns The completed command
   */
  delete: function(command) {
    // Set the subcommand's name
    command.setName("delete");
    // Set the subcommand's description
    command.setDescription("Delete an existing event");
    // Add an option to provide the event name
    command.addStringOption((option) => {
      // Set the option's name
      option.setName("name");
      // Set the option's description
      option.setDescription("The name of the event");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    // Add an option to provide the creator
    command.addUserOption((option) => {
      // Set the option's name
      option.setName("creator");
      // Set the option's description
      option.setDescription("The user that created the event");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Return the command
    return command;
  }
}