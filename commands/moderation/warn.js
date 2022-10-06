const { Client, CommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const members = require("../../database/models/guildMembers");
const guilds = require("../../database/models/guilds");
const { logging, checkMod } = require("../../utils/functions");

module.exports = {
  name: "warn",
  description: "Warn a user",
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
    // Set the commands options
    builder.addUserOption((option) => {
      // The option name
      option.setName("user");
      // The option description
      option.setDescription("The user to warn");
      // If the option is required
      option.setRequired(true);
      // Return the option
      return option;
    });
    builder.addStringOption(option => {
      // The option name
      option.setName("reason");
      // The option description
      option.setDescription("The reason for the warning");
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
    // Send a "thinking" message to the user
    await interaction.deferReply();

    // Define the user and reason
    let user = interaction.options.data.find(option => option.name === "user").value;
    let reason = interaction.options.data.find(option => option.name === "reason")?.value;

    // Ensure the user value was provided
    if (!user)
      return interaction.followUp({ content: "Invalid arguments, you must provide a user to warn", ephemeral: true });

    // Fetch the user object
    user = await client.users.fetch(user);

    if (!user)
      return interaction.followUp({ content: "Cannot find the provided user", ephemeral: true });

    // If the user is a bot, return an error
    if (user.bot)
      return interaction.followUp({ content: "Bots do not have warnings", ephemeral: true });
    // Prevent the user from warning themselves
    if (user.id === interaction.user.id)
      return interaction.followUp({ content: "You cannot warn yourself", ephemeral: true });

    // Get data from the database
    let guild = await guilds.findOne({ guildId: interaction.guild.id });
    let member = await members.findOne({ memberId: user.id, guildId: interaction.guild.id });

    // If the member object doesn't exist, create it
    if (!member) {
      member = new members({
        guildId: interaction.guild.id,
        memberId: user.id,
      }).save();
    }
    // If the guild object doesn't exist, create it
    if (!guild) {
      // Create a new document
      guild = new guilds({
        guildId: interaction.guild.id,
      });
      // Save the new document
      guild.save();
    }

    // Ensure the user is a moderator
    if (!(await checkMod(interaction, guild)))
      return interaction.followUp({ content: "You must be a moderator to warn users", ephemeral: true });

    // Get the guild member object
    let guildMemberObj = await interaction.guild.members.fetch(user.id);

    // Cannot warn people with a higher role than yourself
    if ((guildMemberObj.roles.highest.rawPosition || 0) > (interaction.guild.members.cache.get(interaction.user.id).roles.highest.rawPosition || 0))
      return interaction.followUp({ content: "You cannot warn users with a higher role than yourself", ephemeral: true });

    // Add the warning to the member object
    if (member.warnings && member.warnings.length > 0) {
      member.warnings.push({
        moderatorId: interaction.user.id,
        reason: reason || "No reason provided",
        timestamp: new Date(),
        id: member.warnings.length
      });
    } else {
      member.warnings = [{
        moderatorId: interaction.user.id,
        reason: reason || "No reason provided",
        timestamp: new Date(),
        id: 1
      }];
    }

    // Mark the document as modified
    member.markModified("warnings");
    // Save the member object
    member.save();

    // Construct the embeds
    const logEmbed = new EmbedBuilder();
    logEmbed.setTitle("User Warned");
    logEmbed.setColor("#447ba1");
    logEmbed.setFields([
      {
        name: "User",
        value: user.tag
      }, {
        name: "Responsible Moderator",
        value: interaction.user.tag
      }, {
        name: "Reason",
        value: reason || "No reason provided"
      }, {
        name: "Total Warnings",
        value: (member.warnings.length).toString()
      }
    ]);
    const userEmbed = new EmbedBuilder();
    userEmbed.setTitle("You have been warned");
    userEmbed.setColor("#447ba1");
    userEmbed.setFields([
      {
        name: "Responsible Moderator",
        value: interaction.user.tag,
        inline: false
      }, {
        name: "Reason",
        value: reason || "No reason provided",
        inline: false
      }, {
        name: "Server",
        value: interaction.guild.name,
        inline: false
      }
    ]);

    // Send the embeds
    user
      .send({ embeds: [userEmbed] })
      .catch(() => logEmbed.setFooter({ text: "User not notified" }));
    logging(logEmbed, interaction, client, { type: "interaction", messageType: "embed" });

    // Send a message to the user
    return interaction.followUp({ content: `${user.username} has been warned` });
  }
}