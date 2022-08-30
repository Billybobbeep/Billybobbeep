const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { format } = require("date-fns");

module.exports = {
  name: "info",
  description: "View billybobbeep's info",
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
    embed.setDescription(`**${client.user.username} | Bot Information**`);
    embed.addFields([
      {
        name: "**Servers:**",
        value: (client.guilds.cache.size).toString(),
        inline: true
      }, {
        name: "**Users:**",
        value: client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toString(),
        inline: true
      }, {
        name: "\u200b",
        value: "** **",
      }, {
        name: "**Creation Date:**",
        value: format(new Date(client.user.createdTimestamp), "do MMMM yyyy HH:mm:ss"),
        inline: true
      }, {
        name: "**Version:**",
        value: "v" + require("../../package.json").version,
        inline: true
      }
    ]);
    
    embed.setColor("#447ba1");
    embed.setTimestamp();
    
    // Send the embed
    interaction.reply({ embeds: [embed] });
  }
}