const { CommandInteraction, MessageComponentInteraction, Client, InteractionType } = require("discord.js");
const { REST } = require("@discordjs/rest");
// Define the API client to connect with Discord
const rest = new REST({ version: "10" }).setToken(process.env.token);

/**
 * Handle slash commands
 * @param {CommandInteraction} interaction The interaction sent by the user
 * @param {Client} client The bots client
 */
function handleInteraction(interaction, client) {
  // Get the command name
  const command = interaction.commandName;

  // Ensure the command exists and is enabled
  if (!client.commands.get(command) || !client.commands.get(command)?.slashInfo?.enabled) {
    // Delete the interaction
    rest.delete(Routes.applicationCommands(client.user.id, interaction.id));
    // Return an error message
    return interaction.reply({ content: "This command no longer exists", ephemeral: true, options: { allowedMentions: false } });
  }

  // Execute the command
  client.commands.get(command).execute(interaction, client);
}

/**
 * Handle incoming interactions
 * @param {CommandInteraction | MessageComponentInteraction} interaction The interaction sent by the user
 * @param {Client} client The bots client
 */
module.exports = function(interaction, client) {
  if (interaction.type === InteractionType.ApplicationCommand) { // If the interaction is a command
    // If the bot is in dev mode and the server is not the dev server, return
    if (require("../../utils/cache").dev.enabled && !interaction.guildId) return;
    if (
      require("../../utils/cache").dev.enabled &&
      interaction.guildId !== require("../../utils/config.json").DevServer
    ) return;

    handleInteraction(interaction, client); // Handle slash commands
  } else if (interaction.type === InteractionType.MessageComponent && interaction.customId) { // If the interaction is a message component
    // Get the command the component is linked to
    const command = client.commands.get((interaction.customId).split("::")[0]);

    if (command && command.buttonInfo?.enabled) { // If the command exists
      // Execute the button callback function
      command.buttonCallback(interaction, client);
    }
  }
}