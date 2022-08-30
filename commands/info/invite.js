const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  name: "invite",
  description: "Invite the bot to your server",
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
    builder.setDMPermission(true);
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: function(interaction, client) {
    // Construct an embed
    const embed = new EmbedBuilder();
    embed.setColor("#447ba1");
    embed.setTimestamp();
    embed.addFields([
      {
        name: "Invite the bot to your server",
        value: `[https://discord.com/authorize/...](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`,
        inline: false
      }, {
        name: "View the bot on top.gg",
        value: `https://top.gg/bot/${client.user.id}`,
        inline: false
      }, {
        name: "Join the support server",
        value: `[Billybobbeep Help Center](https://discord.com/invite/AUGX9sywnP)`,
        inline: false
      }
    ]);
    // Send the embed
    interaction.reply({ embeds: [embed] });
  }
}