const { Client, CommandInteraction, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "getid",
  description: "Get the ID of ",
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
    // Add a 'role' subcommand
    builder.addSubcommand((command) => {
      // The name of the subcommand
      command.setName("role");
      // The description of the subcommand
      command.setDescription("Get an ID of a specific role");
      // The option to specify a role
      command.addRoleOption((option) => {
        // The name of the option
        option.setName("role");
        // The description of the option
        option.setDescription("The role to get the ID of");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Return the command
      return command;
    });
    // Add a 'channel' subcommand
    builder.addSubcommand((command) => {
      // The name of the subcommand
      command.setName("channel");
      // The description of the subcommand
      command.setDescription("Get an ID of a specific channel");
      // The option to specify a channel
      command.addChannelOption((option) => {
        // The name of the option
        option.setName("channel");
        // The description of the option
        option.setDescription("The channel to get the ID of");
        // If the option is required
        option.setRequired(false);
        // Return the option
        return option;
      });
      // Return the command
      return command;
    });
    // Add a 'user' subcommand
    builder.addSubcommand((command) => {
      // The name of the subcommand
      command.setName("user");
      // The description of the subcommand
      command.setDescription("Get an ID of a specific user");
      // The option to specify a user
      command.addUserOption((option) => {
        // The name of the option
        option.setName("user");
        // The description of the option
        option.setDescription("The user to get the ID of");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Return the command
      return command;
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
    // Find the subcommand
    let subcommand = (interaction.options.data).find(command => ["role", "channel", "user"].includes(command.name));

    if (!subcommand)
      return interaction.reply({ content: "A valid subcommand must be provided", ephemeral: true });

    let options = subcommand.options;

    // Find the role option
    let role = options.find(option => option.name === "role")?.value;
    // Find the channel option
    let channel = options.find(option => option.name === "channel")?.value;
    // Find the user option
    let user = options.find(option => option.name === "user")?.value;

    if (subcommand.name === "role") {
      // Ensure the option was provided
      if (!role)
        return interaction.reply({ content: "A valid role must be provided", ephemeral: true });
      // Find the role
      role = await interaction.guild.roles.fetch(role);
      // Ensure the option was provided
      if (!role)
        return interaction.reply({ content: "A valid role must be provided", ephemeral: true });
      // Reply to the user
      interaction.reply({ content: `The ID of the role \`${role.name}\` is ${role.id}` });
    } else if (subcommand.name === "channel") {
      // Ensure the option was provided
      if (!channel)
        channel = interaction.channel.id;
      // Find the channel
      channel = await interaction.guild.channels.fetch(channel);
      // Ensure the option was provided
      if (!channel)
        return interaction.reply({ content: "A valid channel must be provided", ephemeral: true });
      // Reply to the user
      interaction.reply({ content: `The ID of the channel \`${channel.name}\` is ${channel.id}` });
    } else if (subcommand.name === "user") {
      // Ensure the option was provided
      if (!user)
        return interaction.reply({ content: "A valid user must be provided", ephemeral: true });
      // Find the user
      user = await client.users.fetch(user);
      // Ensure the option was provided
      if (!user)
        return interaction.reply({ content: "A valid user must be provided", ephemeral: true });
      // Reply to the user
      interaction.reply({ content: `The ID of the user \`${user.username}\` is ${user.id}` });
    }
  }
}