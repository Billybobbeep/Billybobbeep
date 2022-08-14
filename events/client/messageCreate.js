const { Message, Client, PermissionsBitField, ChannelType } = require("discord.js");
const { CommandCatagories } = require("../../utils/types");
const { guildPermsMessage } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

/**
 * Redirect the message to the correct event handler
 * @param {Message} message The message sent by the user
 * @param {Client} client The bots client
 */
function redirect(message, client) {
  if (message.guild) { // If the message is in a guild
    const me = (message.guild).members.cache.get(client.user.id); // Get the bots member object
    if (me.permissions.has(PermissionsBitField.Flags.Administrator || PermissionsBitField.Flags.SendMessages)) { // If the bot can send messages
      // Check if the message contains an invite link
      require("../backgroundFunctions/inviteLinkDetection")(message, client);
      // Count the message towards gained XP
      require("../features/levelling")(message, client);
      // If the message mentions the bot, send a helpful message
      if (message.mentions.client) {
        require("../features/mention")(message, client);
      }
      // If the message mentions a user, see if they are marked as AFK via the bot
      if (message.mentions.users.size > 0) {
        require("../features/afkHandling")(message, client);
      }
    }
  }
}

/**
 * Handle bot commands
 * @param {Message} message The message sent by the user
 * @param {Client} client The bots client
 */
async function handleMessage(message, client) {
  // Check if the message was in an unsupported channel
  if (
    !message.guild ||
    (
      (message.channel).type !== ChannelType.GuildText &&
      (message.channel).type !== ChannelType.GuildPublicThread &&
      (message.channel).type !== ChannelType.GuildPrivateThread
    )
  ) return;

  // Search for the guild in the database
  let guild = await guilds.findOne({ id: message.guild.id });

  // If the guild object doesn't exist, create it
  if (!guild) {
    // Create a new document
    guild = new guilds({
      guildId: interaction.guild.id,
    });
    // Save the new document
    guild.save();
  }

  // Define required variaables
  let prefix = guild.prefix || "~";
  let args = (message.content)
    .slice(prefix.length || 1) // Remove the prefix
    .trim() // Remove any unnecessary whitespaces
    .split(/ +/g); // Split the message into an array of words
  let command = args.shift().toLowerCase(); // Get the first word of the message

  // Ensure the message begins with the prefix
  if (!message.content.startsWith(prefix)) return;
  //  Ensure the command exists
  if (!client.commands.get(command)) return;

  // Get the command object
  let commandObj = client.commands.get(command);

  // Ensure the command is enabled
  if (!(commandObj.enabled || true)) return;
  
  // If the command is for moderators, ensure the client has the required permissions
  if (commandObj.category === CommandCatagories.MODERATION && commandObj.permissions) {
    // Check if the client has the required permissions
    if (!guildPermsMessage.clientPermissions(message, client, [...commandObj.permissions])) {
      // Send a message to the user explaining why the command was not executed
      return guildPermsMessage.permissionCallback(message, client, [...commandObj.permissions]);
    }
  }

  message.reply({ content: `This command should be used as a slash command, use \`/${commandObj.name}\`` })
}

/**
 * Handle incoming messages
 * @param {Message} message The message sent by the user
 * @param {Client} client The bots client
 */
module.exports = function(message, client) {
  if (message?.author.bot) return; // If the message was sent by a bot, ignore it

  // If the bot is in dev mode and the server is not the dev server, return
  if (require("../../utils/cache").dev.enabled && !message.guild) return;
  if (
    require("../../utils/cache").dev.enabled &&
    message.guild.id !== require("../../utils/config.json").DevServer
  ) return;

  redirect(message, client); // Redirect the message to the correct event handler
  handleMessage(message, client); // Handle bot commands
}