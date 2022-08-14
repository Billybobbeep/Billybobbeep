const { Client, CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { checkMod } = require("../../utils/functions");

module.exports = {
  name: "role",
  description: "Update a user's roles",
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

    // Add a sub-command to update all users at once
    builder.addSubcommand((command) => {
      // Basic sub-command information
      command.setName("all");
      command.setDescription("Update all users roles");
      // The sub-command options
      command.addStringOption((option) => {
        // Set the option name
        option.setName("action");
        // Set the option description
        option.setDescription("The action to perform");
        // The choices to pick from
        option.addChoices({
          name: "add",
          value: "add"
        }, {
          name: "remove",
          value: "remove"
        });
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      command.addRoleOption((option) => {
        // Set the option name
        option.setName("role");
        // Set the option description
        option.setDescription("The role to add or remove");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      command.addBooleanOption((option) => {
        // Set the option name
        option.setName("include-bots");
        // Set the option description
        option.setDescription("Include bots in the update");
        // If the option is required
        option.setRequired(false);
        // Return the option
        return option;
      });

      // Return the command
      return command;
    });
    // Add a sub-command to update a specific user
    builder.addSubcommand((command) => {
      // Basic sub-command information
      command.setName("single");
      command.setDescription("Update a single user's roles");
      // Option to select the action
      command.addStringOption((option) => {
        // Set the option name
        option.setName("action");
        // Set the option description
        option.setDescription("The action to perform");
        // The choices to pick from
        option.addChoices({
          name: "add",
          value: "add"
        }, {
          name: "remove",
          value: "remove"
        });
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Option to select user
      command.addUserOption((option) => {
        // The option name
        option.setName("user");
        // The option description
        option.setDescription("The user to update the roles");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Option to select role
      command.addRoleOption((option) => {
        // Set the option name
        option.setName("role");
        // Set the option description
        option.setDescription("The role to add or remove");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });

      //Return the command
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
    // Find the subcommand name
    let subCommand = (interaction.options.data).find(option => ["single", "all"].includes(option.name));
    if (!subCommand || !["single", "all"].includes(subCommand.name))
      return interaction.reply({ content: "Invalid arguments, ensure all required arguments have been provided", ephemeral: true });

    // Ensure the bot has the required permissions
    let me = await interaction.guild.members.fetchMe();
    if (!me.permissions.has(PermissionFlagsBits.Administrator) && !me.permissions.has(PermissionFlagsBits.ManageRoles))
      return permissionCallback(interaction, client, "MANAGE_ROLES");

    // Define the arguments
    let action = (subCommand.options).find(option => option.name === "action")?.value;
    let role = (subCommand.options).find(option => option.name === "role")?.value;
    let user = (subCommand.options).find(option => option.name === "user")?.value;
    let includeBots = (subCommand.options).find(option => option.name === "include-bots")?.value;

    // Ensure all required arguments have been provided
    if (!action || !["add", "remove"].includes(action))
      return interaction.reply({ content: "Invalid arguments, please provide an action", ephemeral: true });
    if (!role)
      return interaction.reply({ content: "Invalid arguments, please provide a role", ephemeral: true });
    if (!user && subCommand.name === "single")
      return interaction.reply({ content: "Invalid arguments, please provide a user", ephemeral: true });

    // Defer a reply to the user
    await interaction.deferReply();

    // Ensure the user is a moderator
    if (!(await checkMod(interaction)))
      return interaction.followUp({ content: "You must be a moderator to update a users roles", ephemeral: true });

    // Find the role
    role = await interaction.guild.roles.fetch(role);
    if (!role)
      return interaction.followUp({ content: "I could not find the role provided, try again later", ephemeral: true });

    if (subCommand.name === "single") {
      // Find the user
      user = await interaction.guild.members.fetch(user);
      if (!user)
        return interaction.followUp({ content: "Could not find the user you provided", ephemeral: true });

      // Update the user's roles
      if (action === "add") {
        user.roles
          .add(role, `Responsible moderator: ${interaction.user.tag}`)
          .then(() => interaction.followUp({ content: `${user.user.tag} has been updated`, ephemeral: true }))
          .catch(() => interaction.followUp({ content: "I don't have permission to update this users roles", ephemeral: true }));
      } else {
        user.roles
          .remove(role, `Responsible moderator: ${interaction.user.tag}`)
          .then(() => interaction.followUp({ content: `${user.user.tag} has been updated`, ephemeral: true }))
          .catch(() => interaction.followUp({ content: "I don't have permission to update this users roles", ephemeral: true }));
      }
    } else if (subCommand.name === "all") {
      // Find & filter all users in the server
      let users = (interaction.guild.members.cache).filter(m => {
        // If the update includes bots, return true
        if (includeBots) return true;
        // If the update does not include bots and the user is a bot, return false
        if (!m.user.bot) return false;
      });
      // Update all users roles
      if (action === "add") {
        users.forEach(m => {
          m.roles
            .add(role, `Adding all users to role '${role.name}' - Responsible moderator: ${interaction.user.tag}`)
            .catch(() => interaction.followUp({ content: "I don't have permission to update this users roles", ephemeral: true }))
        });
      } else {
        users.forEach(m => {
          m.roles
          .remove(role, `Removing all users from role '${role.name}' - Responsible moderator: ${interaction.user.tag}`)
          .catch(() => interaction.followUp({ content: "I don't have permission to update this users roles", ephemeral: true }))
        });
      }

      interaction.followUp({ content: "All users have been updated", ephemeral: true });
    }
  }
}