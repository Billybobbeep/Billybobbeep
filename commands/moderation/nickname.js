const { Client, CommandInteraction, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { checkMod } = require("../../utils/functions");

module.exports = {
  name: "nickname",
  description: "Change a users nickname",
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
    // Set the default permissions for this command
    builder.setDefaultMemberPermissions(PermissionFlagsBits.ManageNicknames);
    // Subcommand "set"
    builder.addSubcommand((command) => {
      // Basic sub-command information
      command.setName("set");
      command.setDescription("Change a users nickname");
      // Add an option to select the target user
      command.addUserOption((option) => {
        // Set the option name
        option.setName("user");
        // Set the option description
        option.setDescription("The user to change the nickname of");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Add an option to provide a new nickname
      command.addStringOption((option) => {
        // Set the option name
        option.setName("nickname");
        // Set the option description
        option.setDescription("The new nickname");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Return the command
      return command;
    });
    // Subcommand "remove"
    builder.addSubcommand((command) => {
      // Basic sub-command information
      command.setName("remove");
      command.setDescription("Remove a users nickname");
      // Add an option to select the target user
      command.addUserOption((option) => {
        // Set the option name
        option.setName("user");
        // Set the option description
        option.setDescription("The user to remove the nickname of");
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
    if (!(await checkMod(interaction)))
      return interaction.reply({ content: "You must be a moderator to change a users nickname", ephemeral: true });

    let subCommand = (interaction.options.data).find((option) => ["set", "remove"].includes(option.name));
    if (!subCommand || !["set", "remove"].includes(subCommand.name))
      return interaction.reply({ content: "Invalid arguments, ensure all required arguments have been provided", ephemeral: true });

    // Define arguments
    let user = (subCommand.options).find(option => option.name === "user")?.value;
    let nickname = (subCommand.options).find(option => option.name === "nickname")?.value;

    if (!user)
      return interaction.reply({ content: "Invalid arguments, you must provide a user", ephemeral: true });

    // Get the users member object
    let member = await interaction.guild.members.fetch(user);

    if (!member)
      return interaction.reply({ content: "Could not find the user you provided in this server", ephemeral: true });

    if (subCommand.name === "set") {
      // Set the nickname
      member
        .setNickname(nickname, `Responsible moderator: ${interaction.user.tag}`)
        .then(() => interaction.reply({ content: `${member.user.username}'s nickname is now '${nickname}'`, ephemeral: false }))
        .catch(() => interaction.reply({ content: "Could not change the nickname of the provided user, ensure the permissions are correct and try again", ephemeral: true }));
    } else if (subCommand.name === "remove") {
      // Remove the nickname
      member
        .setNickname(null, `Responsible moderator: ${interaction.user.tag}`)
        .then(() => interaction.reply({ content: `Removed ${member.user.username}'s nickname`, ephemeral: false }))
        .catch(() => interaction.reply({ content: "Could not change the nickname of the provided user, ensure the permissions are correct and try again", ephemeral: true }));
    }
  }
}