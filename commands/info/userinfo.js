const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { format, formatDistanceToNow } = require("date-fns");

module.exports = {
  name: "userinfo",
  description: "View infromation on a user",
  category: "info",
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
    // Command options
    builder.addUserOption((option) => {
      // Set the options name
      option.setName("user");
      // The options description
      option.setDescription("The user to get information on");
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
    // Get the user from the command
    let user = interaction.options.data[0] ? interaction.options.data[0].value : interaction.user;

    // If the user is an ID, get the user object
    if (!isNaN(user))
      user = await client.users.fetch(user);

    // Get the users guild member object
    let member = await interaction.guild.members.fetch(user.id);

    // Create the embed
    const embed = new EmbedBuilder();
    // The embed title
    embed.setDescription("**Billybobbeep | User Information**");
    // Default information
    embed.setTimestamp();
    embed.setColor(user.accentColor || "#447ba1");
    // The users information
    embed.setAuthor({ name: user.tag });
    embed.setThumbnail(user.avatarURL({ dynamic: true}));
    embed.setFields([
      {
        name: "ID",
        value: user.id,
        inline: true
      }, {
        name: "Nickname",
        value: member.nickname || "None",
        inline: true
      }, {
        name: "Account Created At",
        value: `${format(new Date(user.createdTimestamp), "do MMMM yyyy")} (${formatDistanceToNow(new Date(user.createdTimestamp))} ago)`,
        inline: false
      }, {
        name: "Joined Server At",
        value: `${format(new Date(member.joinedAt), "do MMMM yyyy")} (${formatDistanceToNow(new Date(member.joinedAt))} ago)`,
        inline: true
      }
    ]);

    // Send the embed
    interaction.reply({ embeds: [embed] });
  }
}