const { Client, Message, Guild, CommandInteraction, PermissionResolvable, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const { Schema } = require("mongoose");
const { default: axios } = require("axios");
const { REST } = require("@discordjs/rest");
const guilds = require("../database/models/guilds");
// Define the API client to connect with Discord
const rest = new REST({ version: "10" }).setToken(process.env.token);

module.exports = {
  /**
   * 
   * @param {string | EmbedBuilder} message The message to send
   * @param {CommandInteraction | string} interaction The interaction that was sent or the channel to send the message to
   * @param {Client} client The bots client
   * @param {object} options The options to send the message with
   */
  logging: async function(message, interaction, client, options) {
    let channel;
    if (options.type === "channel") {
      // Fetch the defined logging channel
      channel = await client.channels
        .fetch(interaction)
        .catch(() => null);
    } else if (options.type === "guild" && typeof interaction === "string") {
      // Find the server
      let guildObj = await client.guilds
        .fetch(interaction)
        .catch(() => null);
      // Find the server in the database
      let guild = await guilds.findOne({ guildId: guildObj.id });

      // Return if the server is not found
      if (!guildObj) return;

      // Fetch the defined logging channel
      channel = await guildObj.channels
        .fetch(guild?.preferences?.loggingChannel)
        .catch(() => null);
    } else if (options.type === "guild" && interaction instanceof Guild) {
      // Find the server
      let guildObj = interaction;
      // Find the server in the database
      let guild = await guilds.findOne({ guildId: guildObj.id });

      // Fetch the defined logging channel
      channel = await guildObj.channels
        .fetch(guild?.preferences?.loggingChannel)
        .catch(() => null);
    } else if (options.type === "interaction") {
      // Find the server in the database
      let guild = await guilds.findOne({ guildId: interaction.guild.id });

      // Fetch the defined logging channel
      channel = await interaction.guild.channels
        .fetch(guild?.preferences?.loggingChannel)
        .catch(() => null);
    } else {
      throw new Error("A valid type must be specified, recieved " + options.type);
    }

    if (channel.type !== ChannelType.GuildText) return;

    let webhook = null;
    let webhooks = await channel?.fetchWebhooks().catch(() => null);

    if (webhooks?.size >= 1) {
      let wh = webhooks.find(x => x.channelId === channel.id && x.owner.id === client.user.id);
      if (wh)
        webhook = wh;
    }

    if (!webhook) {
      webhook = await channel.createWebhook({
        name: client.user.username,
        avatar: "https://i.imgur.com/p0SwlNs.png",
        channel: channel.id,
        reason: "Logging webhook"
      }).catch(() => null);
    }

    // Send the message to the channel
    if (webhook && options.messageType === "embed") {
      webhook
        .send({ embeds: [message] })
        .catch(() => null);
    } else if (webhook && options.messageType === "text") {
      webhook
        .send({ content: message})
        .catch(() => null);
    } else if (webhook && typeof message === "object") {
      webhook
        .send(message)
        .catch(() => null);
    }
  },
  /**
   * Return an embed to send to the user if the server hasn't finished setting up
   * @param {string} message The embed description
   * @param {string} param The parameter that is missing
   * @returns {EmbedBuilder} The embed object
   */
  missingPreferences: function(message, param) {
    return new EmbedBuilder()
      .setTitle("Missing Data")
      .setDescription(message || "You have not setup your preferences yet, be sure to configure them before using this command")
      .setDescription(message || `You are missing the \`${param}\` preference, be sure to configure it to enable this command`)
      .setColor("#447ba1");
  },
  /**
   * Check if a user is a server moderator
   * @param {CommandInteraction | Message} interaction The interaction that was sent
   * @param {Schema} guildObj The guild database object
   * @returns {boolean} If the user has the required permissions
   */
  checkMod: async function(interaction, guildObj) {
    // Ensure the guildObj parameter exists
    if (!guildObj)
      guildObj = await guilds.findOne({ guildId: interaction.guild.id });

    let guildMemberObj = await interaction.guild.members.fetch(interaction instanceof CommandInteraction ? interaction.user?.id : interaction.author.id);

    // Check if the user is a moderator
    if (guildMemberObj.permissions.has(PermissionFlagsBits.Administrator) || guildMemberObj.permissions.has(PermissionFlagsBits.ManageMessages))
      return true;
    else if (guildObj.preferences?.modRoles && (guildMemberObj.roles.cache).find(r => [guildObj.preferences.modRoles].includes(r.id)))
      return true;
    else if (guildObj.preferences?.customMods && (guildObj.preferences.customMods).find(m => m.id === (interaction instanceof CommandInteraction ? interaction.user?.id : interaction.author.id)))
      return true;

    // If the user is not a moderator, return false
    return false;
  },

  /**
   * Update the permissions to use a command
   * @param {Client} client The bots client
   * @param {Array} commandsArr An array of commands
   */
  updateInteractionPermissions: function(client, commandsArr) {
    // TODO: Finish function
    
    if (!client)
      throw new TypeError(`A valid client must be provided, recieved ${typeof interactionId}`);
    if (!Array.isArray(commandsArr))
      throw new TypeError(`A valid commandsArr must be provided, recieved ${typeof commandsArr}`);

    commandsArr.forEach(async (command) => {
      // Ensure the command is of correct type
      if (typeof command !== "object" || !Array.isArray(command.permissions))
        return;

      // Fetch the commands
      let commands = await rest.get(
        Routes.applicationCommands(client.user.id)
      );
        
      // Find the permissions for the command
      let permissions = [...command.permissions];
      permissions.forEach((permission) => {
        // If there is no permission, return
        if ((!permission.roleId && !permission.userId && !permission.channelId) || !permission.guildId)
          return;

        let url = `https://discord.com/api/v10/applications/${client.user.id}/guilds/${permission.guildId}/commands/${"commandId"}/permissions`;
      });
    });
  },

  /**
   * Create a random string of letters and numbers
   * @param {Number} length The length of the random string
   * @returns A random string
   */
  makeid: function(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;

    for (let i=0; i<(length || 10); i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },
  /**
   * Correclty capitalise a string
   * @param {String} string The string to correct
   * @returns The corrected string
   */
   correctCapitalisation: function(string) {
    string = string.split(/ +/g); // Split the string by spaces
    for (var i = 0; i < string.length; i++) { // Loop through the new array
      string[i] = string[i].toLowerCase(); // Change the string to lowercase
      string[i] = string[i][0].toUpperCase() + string[i].substring(1, string[i].length); // Capitalise the first letter of the word
    }
    return string.join(" "); // Join the array with spaces
  },

  guildPermsMessage: {
    /**
     * Check if the client has permission to use a command
     * @param {Message} message The message object
     * @param {Client} client The bots client
     * @param {Array<PermissionResolvable> | PermissionResolvable} type The type of permission to check
     */
    clientPermissions: async function(message, client, type) {
      // Ensure valid parameters have been provided
      if (!message?.guild || !client?.user) return Promise.resolve(false);
      if (!type) throw new TypeError("Missing required parameter 'type'");

      const me = await (message.guild).members.fetch(client.user.id);

      // Return whether the client has the required permissions
      if (Array.isArray(type))
        return type.every(t => me.permissions.has(t)) || false;
      else
        return me.permissions.has(type);
    },

    /**
     * Send a message to the user asking them to provide required permissions
     * @param {Message} message The message object
     * @param {Client} client The bots client
     * @param {Array<PermissionResolvable> | PermissionResolvable} permission The missing permission
     */
    permissionCallback: function(message, client, permission) {
      // Ensure valid parameters have been provided
      if (!client?.user || !message?.channel) return;
      if (!permission) throw new TypeError("Permission type must be provided");

      const embed = new EmbedBuilder();

      embed.setTitle("Missing Permissions");

      if (Array.isArray(permission)) {
        embed.setDescription(`You do not have the required permissions to use this command.\nRequired permissions: ${permission.join(", ")}`);
        embed.addFields([{
          name: "Don't know how?",
          value: `Go to **Server Settings**, **Roles** then find the role **${client.user.username}** and make sure all of the following permissions are enabled **${permission.join("**, ")}**`,
          inline: false
        }]);
      } else {
        embed.setDescription(`This command requires the \`${permission}\` permission to work correctly`);
        embed.addFields([{
          name: "Don't know how?",
          value: `Go to **Server Settings**, **Roles** then find the role **${client.user.username}** and make sure **${permission}** is enabled`,
          inline: false
        }]);
      }

      embed.setColor("#447ba1");
      message.channel.send({ embeds: [embed] });
    }
  },

  guildPermsInteraction: {
    /**
     * Check if the client has permission to use a command
     * @param {CommandInteraction} interaction The message object
     * @param {Client} client The bots client
     * @param {Array<PermissionResolvable> | PermissionResolvable} type The type of permission to check
     */
    clientPermissions: async function(interaction, client, type) {
      // Ensure valid parameters have been provided
      if (!interaction?.guildId || !client?.user) return Promise.resolve(false);
      if (!type) throw new TypeError("Missing required parameter 'type'");

      const guild = await client.guilds.fetch(interaction.guildId);
      const me = await guild.members.fetch(client.user.id);

      // Return whether the client has the required permissions
      if (Array.isArray(type))
        return type.every(t => me.permissions.has(t)) || false;
      else
        return me.permissions.has(type);
    },

    /**
     * Send a message to the user asking them to provide required permissions
     * @param {CommandInteraction} interaction The message object
     * @param {Client} client The bots client
     * @param {Array<PermissionResolvable> | PermissionResolvable} permission The missing permission
     * @param {boolean} ephemeral Whether the message should be ephemeral
     */
    permissionCallback: function(interaction, client, permission, ephemeral) {
      // Ensure valid parameters have been provided
      if (!client?.user || !interaction?.guildId) return;
      if (!permission) throw new TypeError("Permission type must be provided");

      const embed = new EmbedBuilder();

      embed.setTitle("Missing Permissions");

      if (Array.isArray(permission)) {
        embed.setDescription(`You do not have the required permissions to use this command.\nRequired permissions: ${permission.join(", ")}`);
        embed.addFields([{
          name: "Don't know how?",
          value: `Go to **Server Settings**, **Roles** then find the role **${client.user.username}** and make sure all of the following permissions are enabled **${permission.join("**, ")}**`,
          inline: false
        }]);
      } else {
        embed.setDescription(`This command requires the \`${permission}\` permission to work correctly`);
        embed.addFields([{
          name: "Don't know how?",
          value: `Go to **Server Settings**, **Roles** then find the role **${client.user.username}** and make sure **${permission}** is enabled`,
          inline: false
        }]);
      }

      embed.setColor("#447ba1");
      interaction.reply({ embeds: [embed], ephemeral: ephemeral || false });
    }
  }
}