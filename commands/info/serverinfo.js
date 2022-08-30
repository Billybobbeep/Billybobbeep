const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { format } = require("date-fns");

module.exports = {
  name: "serverinfo",
  description: "View information on this server",
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
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: async function(interaction, _client) {
    const roles = interaction.guild.roles.cache;
    const channels = interaction.guild.channels.cache
    const emojis = interaction.guild.emojis.cache;
    const owner = await interaction.guild.fetchOwner();

    const embed = new EmbedBuilder();
    embed.setDescription("**Billybobbeep | Server Information**");
    embed.setTimestamp();
    embed.setColor("#447ba1");
    embed.setThumbnail(interaction.guild.iconURL({ dynamic: true}));
    embed.setFields([
      {
        name: "General",
        value: [
          `**Name:** ${interaction.guild.name}`,
          `**ID:** ${interaction.guild.id}`,
          `**Owner:** ${owner.user.tag}`,
          `**Boost Tier**: ${interaction.guild.premiumTier}`,
          `**Explicit Filter:** ${interaction.guild.explicitContentFilter}`,
          `**Creation Date:** ${format(new Date(interaction.guild.createdAt), "do MMMM yyyy")}`,
        ].join("\n"),
        inline: true
      }, {
        name: "Statistics",
        value: [
          `**Role Count:** ${roles.size}`,
          `**Channel Count:** ${channels.size}`,
          `**Emoji Count:** ${emojis.size}`,
          `**Boost Count**: ${interaction.guild.premiumSubscriptionCount || 0}`,
        ].join("\n"),
        inline: true
      }, {
        name: "Members",
        value: [
          `**Member Count:** ${interaction.guild.memberCount}`,
          `**Bot Count:** ${interaction.guild.members.cache.filter(member => member.user.bot).size}`,
          `**Human Count:** ${interaction.guild.members.cache.filter(member => !member.user.bot).size}`,
        ].join("\n"),
        inline: false
      }
    ]);
    interaction.reply({ embeds: [embed] });
  }
}