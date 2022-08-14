const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { logging, checkMod } = require("../../utils/functions");

module.exports = {
  name: "kick",
  description: "Kick a user from the server",
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
    // Add an option to select the target user
    builder.addUserOption((option) => {
      // Set the option name
      option.setName("user");
      // Set the option description
      option.setDescription("The user to kick");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    })
    // Add an option to provide a reason
    builder.addStringOption((option) => {
      // Set the option name
      option.setName("reason");
      // Set the option description
      option.setDescription("The reason for the kick");
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
    // Defer the reply
    await interaction.deferReply();

    if (!(await checkMod(interaction)))
      return interaction.followUp({ content: "You must be a moderator to change a users nickname", ephemeral: true });

    // Get the target user
    let user = (interaction.options.data).find((option) => option.name === "user")?.value;
    let reason = (interaction.options.data).find((option) => option.name === "reason")?.value;

    // If the user is not found
    if (!user)
      return interaction.followUp({ content: "Invalid arguments, you must provide a user to kick", ephemeral: true });

    // Fetch the user's guild member object
    let member = await interaction.guild.members.fetch(user);

    // If the member is not found
    if (!member)
      return interaction.followUp({ content: "Could not find the user provided", ephemeral: true });

    // If the user is the client
    if (member.user.id === client.user.id)
      return interaction.followUp({ content: "I cannot kick myself", ephemeral: true });

    // Cannot kick people with a higher role than yourself
    if ((member.roles.highest.rawPosition || 0) <= (interaction.guild.members.cache.get(interaction.user.id).roles.highest.rawPosition || 0))
      return interaction.followUp({ content: "You cannot kick users with a higher role than yourself", ephemeral: true });

    // If the user is not kickable
    if (!member.kickable)
      return interaction.followUp({ content: "I cannot kick this user", ephemeral: true });

    // Define the error flag
    let errorExists = false;

    // Kick the user
    member
      .kick(reason || "No reason provided")
      .then(() => interaction.followUp({ content: `Kicked ${member.user.username}`, ephemeral: true }))
      .catch(() => {
        // Set the error flag
        errorExists = true;
        // Reply with an error
        interaction.followUp({ content: "Could not kick the user", ephemeral: true });
      });

    // If there was an error, return
    if (errorExists)
      return;

    // Construct an embed
    let embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();
    // Set the title
    embed.setTitle("Member Kicked");
    // Set the description
    embed.setDescription([
      `**User:** <@!${member.user.id}>`,
      `**User Tag:** ${member.user.tag}`,
      `**User ID:** ${member.user.id}`,
      `**Reason:** ${reason || "No reason provided"}`,
      `**Respensible Moderator:** ${interaction.user.tag}`,
    ]);
    // Log the event
    logging(embed, interaction, client, { type: "interaction", messageType: "embed" });
  }
}