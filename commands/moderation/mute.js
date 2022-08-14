const { Client, CommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { logging, checkMod } = require("../../utils/functions");
const { permissionCallback } = require("../../utils/functions").guildPermsInteraction;
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Prevent a user from interacting in the server for a certain amount of time",
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
    // Option to select user
    builder.addUserOption((option) => {
      // Set the option name
      option.setName("user");
      // Set the option description
      option.setDescription("The user to mute");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    // Option to select duration
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("duration");
      // Set the option description
      option.setDescription("The duration of the mute");
      // If the option is required
      option.setRequired(false);
      // Return the option
      return option;
    });
    // Option to provide reason
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("reason");
      // Set the option description
      option.setDescription("The reason for the mute");
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
    // Define options
    let user = (interaction.options.data).find(option => option.name === "user")?.value;
    let duration = (interaction.options.data).find(option => option.name === "duration")?.value;
    let reason = (interaction.options.data).find(option => option.name === "reason")?.value;

    // Ensure the user is a moderator
    if (!(await checkMod(interaction)))
      return interaction.followUp({ content: "You must be a moderator to mute users", ephemeral: true });

    // Ensure the bot has the required permissions
    let me = await interaction.guild.members.fetchMe();
    if (!me.permissions.has(PermissionFlagsBits.Administrator) && !me.permissions.has(PermissionFlagsBits.ModerateMembers))
      return permissionCallback(interaction, client, "MODERATE_MEMBERS");

    // If the user is not defined
    if (!user)
      return interaction.reply({ content: "Invalid arguments, ensure you have provided a user to mute", ephemeral: true });
    // Ensure the duration is valid
    if (duration) {
      if ((isNaN(duration) ? ms(duration) : duration) < 60000) // If the duration is less than a minute
        return interaction.reply({ content: "The duration must be at least 1 minute long", ephemeral: true });
      if ((isNaN(duration) ? ms(duration) : duration) > 6.048e+8) // If the duration is over a week
        return interaction.reply({ content: "The duration can only be up to 1 week", ephemeral: true });
    }

    // Defer the reply
    await interaction.deferReply();

    // Find the user
    user = await client.users.fetch(user);

    // Double check the user exists
    if (!user)
      return interaction.followUp({ content: "Could not find provided user", ephemeral: true });

    // Find the user's guild member object
    let member = await interaction.guild.members.fetch(user?.id);

    // Ensure the member exists
    if (!member)
      return interaction.followUp({ content: "Could not find provided user", ephemeral: true });

    // Ensure the user defined is not themselves
    if (user.id === interaction.user.id)
      return interaction.followUp({ content: "You cannot mute yourself", ephemeral: true });

    // Ensure the user is not a bot
    if (user?.bot)
      return interaction.followUp({ content: "You cannot mute bots", ephemeral: true });
  
    // Rewrite the duration to be in ms
    if (duration)
      duration = ms(duration, { long: true });

    // If an error exists
    let errorExists = false;
    // Ensure the duration is in text format
    if (!isNaN(duration))
      duration = ms(duration, { long: true });

    // Timeout the member
    await member.timeout(
      duration ? (isNaN(duration) ? ms(duration) : duration) : 300000,
      `Muted for ${duration} with reason: ${reason || "No reason provided"} - Responsible Moderator: ${interaction.user.tag}`
    ).catch(() => {
      // Reply to the user
      interaction.followUp({ content: "Something went wrong whilst processing your request, ensure the permissions are correct and try again", ephemeral: true });
      // Set the error exists flag
      errorExists = true;
    });

    // Return if an error exists
    if (errorExists)
      return;

    // Construct an embed
    const embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    // Set the embed data
    embed.setTitle("User Muted");
    embed.setDescription([
      `**User**: <@!${user.id}>`,
      `**User Tag**: ${user.tag}`,
      `**User ID**: ${user.id}`,
      `**Duration**: ${duration ? duration : "5 Minutes"}`,
      `**Reason**: ${reason || "No reason provided"}`,
      `**Responsible Moderator**: ${interaction.user.tag}`
    ].join("\n"));

    interaction.followUp({ content: "Successfully muted " + user.username });
    logging(embed, interaction, client, { type: "interaction", messageType: "embed" })
  }
}