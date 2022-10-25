const { Client, CommandInteraction, MessageComponentInteraction, ChannelType, ButtonStyle, EmbedBuilder, ButtonBuilder, ActionRowBuilder, SlashCommandBuilder } = require("discord.js");
const { checkMod, makeid } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");

module.exports = {
  name: "reaction-roles",
  description: "Create or delete reaction roles",
  category: "moderation",
  slashInfo: {
    enabled: true,
    public: true
  },
  buttonInfo: {
    enabled: true
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
    // Add an 'add-reaction' subcommand
    builder.addSubcommand((command) => {
      // Set the name
      command.setName("add-reaction");
      // Set the description
      command.setDescription("Add a reaction role to the embed");
      // Add the option to select a role
      command.addRoleOption((option) => {
        // Set the name
        option.setName("role");
        // Set the description
        option.setDescription("The role to add to the embed");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Add the option to select an emoji
      command.addStringOption((option) => {
        // Set the name
        option.setName("emoji");
        // Set the description
        option.setDescription("The emoji for the button");
        // If the option is required
        option.setRequired(false);
        // Set min/max values
        option.setMinLength(1);
        option.setMaxLength(2);
        // Return the option
        return option;
      });
      // Add the option to select a button color
      command.addStringOption((option) => {
        // Set the name
        option.setName("color");
        // Set the description
        option.setDescription("The color of the button");
        // If the option is required
        option.setRequired(false);
        // Add choices
        option.addChoices({
          name: "blue",
          value: "blue"
        }, {
          name: "grey",
          value: "grey"
        }, {
          name: "green",
          value: "green"
        }, {
          name: "red",
          value: "red"
        });
        // Return the option
        return option;
      });
      // Return the command
      return command;
    });
    // Add a 'remove-reaction' subcommand
    builder.addSubcommand((command) => {
      // Set the name
      command.setName("remove-reaction");
      // Set the description
      command.setDescription("Remove a reaction role from the embed");
      // Add the option to select a role
      command.addRoleOption((option) => {
        // Set the name
        option.setName("role");
        // Set the description
        option.setDescription("The role to remove from the embed");
        // If the option is required
        option.setRequired(true);
        // Return the option
        return option;
      });
      // Return the command
      return command;
    });
    // Add a 'get-reactions' subcommand
    builder.addSubcommand((command) => {
      // Set the name
      command.setName("get-reactions");
      // Set the description
      command.setDescription("Returns an embed of the roles that are pending for an embed");
      // Return the command
      return command;
    });
    // Add a 'create' subcommand
    builder.addSubcommand((command) => {
      // Set the name
      command.setName("create");
      // Set the description
      command.setDescription("Create a reaction role");
      // Add the option to select a channel
      command.addChannelOption((option) => {
        // Set the name
        option.setName("channel");
        // Set the description
        option.setDescription("The channel to create the new message in");
        // If the option is required
        option.setRequired(true);
        // Set the type of channel
        option.addChannelTypes(ChannelType.GuildText);
        // Return the option
        return option;
      });
      // Add the option to customise the embed title
      command.addStringOption((option) => {
        // Set the name
        option.setName("title");
        // Set the description
        option.setDescription("Set the title of the embed");
        // If the option is required
        option.setRequired(false);
        // Return the option
        return option;
      });
      // Add the option to include role names on the button
      command.addStringOption((option) => {
        // Set the name
        option.setName("include-labels");
        // Set the description
        option.setDescription("Include the role names on the button");
        // If the option is required
        option.setRequired(false);
        // Set the choices
        option.setChoices({
          name: "yes",
          value: "yes"
        }, {
          name: "no",
          value: "no"
        });
        // Return the option
        return option;
      });
      // Return the command
      return command;
    });
    // Add a 'delete' subcommand
    builder.addSubcommand((command) => {
      // Set the name
      command.setName("delete");
      // Set the description
      command.setDescription("Delete a reaction role");
      // Add the option to provide a message ID
      command.addStringOption((option) => {
        // Set the name
        option.setName("message-id");
        // Set the description
        option.setDescription("The message ID of the reaction role embed");
        // If the option is required
        option.setRequired(false);
        // Return the option
        return option;
      });
      // Add the option to provide an embed ID
      command.addStringOption((option) => {
        // Set the name
        option.setName("embed-id");
        // Set the description
        option.setDescription("The embed ID of the reaction role embed");
        // If the option is required
        option.setRequired(false);
        // Return the option
        return option;
      });
      // Return the command
      return command;
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
    // Ensure the parameters are valid
    if (
      !interaction instanceof CommandInteraction ||
      !client instanceof Client
    ) return;

    // Construct an embed
    const embed = new EmbedBuilder();
    // Set default properties
    embed.setColor("#447ba1");
    embed.setTimestamp();

    // Define the subcommand
    let subcommand = (interaction.options.data).find(command => ["create", "add-reaction", "remove-reaction", "get-reactions", "delete"].includes(command.name));

    // Ensure the subcommand is valid
    if (!subcommand)
      return interaction.reply({ content: "Invalid arguments, ensure all required arguments have been provided", ephemeral: true });

    if (subcommand.name === "add-reaction") {
      // Define the options
      let role = subcommand.options.find(option => option.name === "role")?.value;
      let emoji = subcommand.options.find(option => option.name === "emoji")?.value;
      let color = subcommand.options.find(option => option.name === "color")?.value;

      // Ensure the required options are valid
      if (!role)
        return interaction.reply({ content: "Invalid arguments, ensure all required arguments have been provided", ephemeral: true });

      // Ensure the role is valid
      if (!interaction.guild.roles.cache.has(role))
        return interaction.reply({ content: "Invalid role, ensure the role exists", ephemeral: true });

      // Defer the reply
      await interaction.deferReply();

      // Find the guild in the database
      let guild = await guilds.findOne({ guildId: interaction.guild.id });

      // Ensure the user is a moderator
      if (!(await checkMod(interaction, guild)))
        return interaction.followUp({ content: "You must be a moderator to use this command", ephemeral: true });

      // Ensure the guild object exists
      if (!guild) {
        // Create the guild object
        guild = new guilds({
          guildId: interaction.guild.id
        });
        // Save the guild object
        guild.save();
      }

      // Ensure the role isn't already pending
      if (guild.pendingReactionRoles.find(role => role.roleId === role))
        return interaction.followUp({ content: `This role is already pending to be inserted into an embed, use the </${this.name} create:1031229933332213846> command to send the embed to a channel`, ephemeral: true });

      // Add the role to the pending list
      let pendingRoles = guild.pendingReactionRoles || [];

      let data = {
        roleId: role
      }

      // If an emoji was provided, add it to the data
      if (emoji)
        data.emoji = emoji;
      if (color && ["blue", "grey", "green", "red"].includes(color))
        data.color = color;

      // Add the role to the pending list
      pendingRoles.push(data);

      // Update the guild object
      guild.pendingReactionRoles = pendingRoles;

      // Mark the document as modified
      guild.markModified("pendingReactionRoles");
      // Save the guild object
      guild.save();

      // Reply with a success message
      interaction.followUp({ content: "The role has been added to the pending list", ephemeral: false });
    } else if (subcommand.name === "remove-reaction") {
      // Define the options
      let role = subcommand.options.find(option => option.name === "role")?.value;

      // Ensure the required options are valid
      if (!role)
        return interaction.reply({ content: "Invalid arguments, ensure all required arguments have been provided", ephemeral: true });

      // Defer the reply
      await interaction.deferReply();

      // Find the guild in the database
      let guild = await guilds.findOne({ guildId: interaction.guild.id });

      // Ensure the user is a moderator
      if (!(await checkMod(interaction, guild)))
        return interaction.followUp({ content: "You must be a moderator to use this command", ephemeral: true });

      // Ensure the guild object exists
      if (!guild) {
        // Create the guild object
        guild = new guilds({
          guildId: interaction.guild.id
        });
        // Save the guild object
        guild.save();

        return interaction.followUp({ content: "There are no pending roles in this server", ephemeral: true });
      }

      // Ensure the role isn't already pending
      if (!guild.pendingReactionRoles.find(role => role.roleId === role))
        return interaction.followUp({ content: "This role is not in the ", ephemeral: true });

      // Add the role to the pending list
      let pendingRoles = guild.pendingReactionRoles || [];

      // Remove the role from the pending list
      pendingRoles.splice(pendingRoles.findIndex(role => role.roleId === role), 1);

      // Update the guild object
      guild.pendingReactionRoles = pendingRoles;

      // Mark the document as modified
      guild.markModified("pendingReactionRoles");
      // Save the guild object
      guild.save();

      // Reply with a success message
      interaction.followUp({ content: "The role has been removed to the pending list", ephemeral: false });
    } else if (subcommand.name === "get-reactions") {
      // Defer the reply
      await interaction.deferReply();

      // Find the guild in the database
      let guild = await guilds.findOne({ guildId: interaction.guild.id });

      // Ensure the user is a moderator
      if (!(await checkMod(interaction, guild)))
        return interaction.followUp({ content: "You must be a moderator to use this command", ephemeral: true });

      // Ensure the guild object exists
      if (!guild) {
        // Create the guild object
        guild = new guilds({
          guildId: interaction.guild.id
        });
        // Save the guild object
        guild.save();

        return interaction.followUp({ content: "There are no pending roles for this server", ephemeral: true });
      }

      if (!guild.pendingReactionRoles || guild.pendingReactionRoles.length === 0)
        return interaction.followUp({ content: "There are no pending roles for this server", ephemeral: true });

      // Construct an embed
      const embed = new EmbedBuilder();
      // Set default properties
      embed.setColor("#447ba1");
      embed.setTimestamp();

      let desc = [];

      (guild.pendingReactionRoles).forEach((role) => {
        desc.push(`${role.emoji ? `${role.emoji} ` : ""}${interaction.guild.roles.cache.get(role.roleId).name}`);
      });

      // Set embed data
      embed.setTitle("Pending Reactions");
      embed.setDescription(desc.join("\n"));

      // Reply with a success message
      interaction.followUp({ embeds: [embed], ephemeral: false });
    } else if (subcommand.name === "create") {
      // Define the options
      let channel = subcommand.options.find(option => option.name === "channel")?.value;
      let title = subcommand.options.find(option => option.name === "title")?.value;
      let includeLabels = subcommand.options.find(option => option.name === "include-labels")?.value;

      // Ensure the required options are valid
      if (!channel)
        return interaction.reply({ content: "Invalid arguments, ensure all required arguments have been provided", ephemeral: true });

      // Ensure the includeLabels option is valid
      if (includeLabels && !["yes", "no"].includes(includeLabels.toLowerCase()))
        return interaction.reply({ content: "Invalid arguments, the include-labels option must be either `yes` or `no`", ephemeral: true });

      // Defer the reply
      await interaction.deferReply();

      // Find the guild in the database
      let guild = await guilds.findOne({ guildId: interaction.guild.id });

      // Ensure the user is a moderator
      if (!(await checkMod(interaction, guild)))
        return interaction.followUp({ content: "You must be a moderator to use this command", ephemeral: true });

      // Ensure the guild object exists
      if (!guild) {
        // Create the guild object
        guild = new guilds({
          guildId: interaction.guild.id
        });
        // Save the guild object
        guild.save();
      }

      // Find the channel object
      channel = await interaction.guild.channels.fetch(channel);

      // Ensure the channel object exists
      if (!channel)
        return interaction.followUp({ content: "Invalid channel, ensure the channel exists", ephemeral: true });

      // Ensure there are pending roles
      if (guild.pendingReactionRoles.length < 1)
        return interaction.followUp({ content: `There are no pending roles, ensure you have used the </${this.name} add-reaction:1031229933332213846> before finalization`, ephemeral: true });

      // Define the action row builder for the buttons
      let actionRow = new ActionRowBuilder();
      // Define an array to store button IDs with the role IDs
      let buttons = [];
      // The ID of the reaction role embed
      let reactionId = makeid(8);

      // Construct the embed
      const embed = new EmbedBuilder();
      // Set default properties
      embed.setColor("#447ba1");
      embed.setTimestamp();
      // Set the embed title
      embed.setTitle(title || "Reaction Role");
      embed.setFooter({
        text: `ID: ${reactionId}`
      });

      // Loop through each pending reaction role
      guild.pendingReactionRoles.forEach((obj) => {
        embed.addFields({
          name: `${obj.emoji ? `${obj.emoji} ` : ""}${interaction.guild.roles.cache.get(obj.roleId)?.name || "New Role"}`,
          value: "\u200b",
          inline: false
        });

        actionRow.addComponents(function() {
          // Define the button builder
          let button = new ButtonBuilder();
          // Define the button ID
          let id = `${interaction.guild.id}-${makeid(18)}`;
          // Find the role name
          let roleName = interaction.guild.roles.cache.get(obj.roleId)?.name || "New Role";
          // Add the button ID to the array
          buttons.push({ buttonId: id, roleId: obj.roleId });
          // Set the button style
          button.setStyle((function() {
            switch (obj.color) {
              case "blue":
                return ButtonStyle.Primary;
              case "green":
                return ButtonStyle.Success;
              case "grey":
                return ButtonStyle.Secondary;
              case "red":
                return ButtonStyle.Danger;
              default:
                return ButtonStyle.Primary;
            }
          })());
          // Set the button emoji
          obj.emoji? button.setEmoji(obj.emoji) : null;
          // Set the button label
          (obj.includeLabel || includeLabels) && (roleName.length >= 3) ? button.setLabel(roleName) : null
          // Set the button ID
          button.setCustomId(`reaction-roles::${id}`);
          // Return the button
          return button;
        }());
      });

      // Add the new reaction role to the database
      let reactionRoles = guild.reactionRoles || [];

      // Send the embed to the correct channel
      let msg = await channel.send({ embeds: [embed], components: [actionRow] });

      reactionRoles.push({
        messageId: msg.id,
        channelId: channel.id,
        id: reactionId,
        reactions: buttons
      });

      guild.reactionRoles = reactionRoles;

      // Clear the pending roles array
      guild.pendingReactionRoles = [];
      // Mark the document as modified
      guild.markModified("pendingReactionRoles");
      guild.markModified("reactionRoles");
      // Save the guild object
      guild.save();

      // Reply with a success message
      interaction.followUp({ content: "The reaction role has been created", ephemeral: false });
    } else if (subcommand.name === "delete") {
      let messageId = subcommand.options.find(option => option.name === "message-id")?.value;
      let embedId = subcommand.options.find(option => option.name === "embed-id")?.value;

      // Ensure the required options are valid
      if (!messageId && !embedId)
        return interaction.reply({ content: "You must provide either a message ID or an embed ID", ephemeral: true });

      // Defer the reply
      await interaction.deferReply();

      // Find the guild in the database
      let guild = await guilds.findOne({ guildId: interaction.guild.id });

      // Ensure the user is a moderator
      if (!(await checkMod(interaction, guild)))
        return interaction.followUp({ content: "You must be a moderator to use this command", ephemeral: true });

      // Ensure the guild object exists
      if (!guild) {
        // Create the guild object
        guild = new guilds({
          guildId: interaction.guild.id
        });
        // Save the guild object
        guild.save();

        return interaction.followUp({ content: "Reaction roles have not been setup for this server", ephemeral: true });
      }

      if (messageId) {
        // Find the message object
        let message = await interaction.channel.messages.fetch(messageId);

        // Ensure the message object exists
        if (!message)
          return interaction.followUp({ content: "Could not find the message ID provided, ensure it is correct and try again", ephemeral: true });

        if (message.author.id !== client.user.id)
          return interaction.followUp({ content: "The message provided is not a valid reaction role message", ephemeral: true });

        // Delete the message
        message.delete();
        // Remove the reaction role from the database
        guild.reactionRoles = guild.reactionRoles.filter(obj => obj.messageId !== messageId);

        // Mark the document as modified
        guild.markModified("reactionRoles");
        // Save the guild object
        guild.save();

        // Reply with a success message
        interaction.followUp({ content: "The message has been deleted", ephemeral: false });
      } else if (embedId) {
        // Find the reaction role in the database
        let reactionRoleObj = guild.reactionRoles.find(obj => obj.id === embedId);
        // Define error flag
        let errorExists = false;

        // Ensure the reaction role object exists
        if (!reactionRoleObj)
          return interaction.followUp({ content: "Could not find the reaction role ID provided, ensure it is correct and try again", ephemeral: true });

        // Find the message
        let channel = await interaction.guild.channels
          .fetch(reactionRoleObj.channelId)
          .catch(() => {
            // Set the error flag
            errorExists = true;
            // Send an error message
            interaction.followUp({ content: "Could not find the embed provided", ephemeral: true });
          });
        let message = await channel.messages
          .fetch(reactionRoleObj.messageId)
          .catch(() => {
            // Set the error flag
            errorExists = true;
            // Send an error message
            interaction.followUp({ content: "Could not find the embed provided", ephemeral: true });
          });

        // Ensure an error is not present
        if (errorExists) return;

        // Delete the message
        if (message)
          message.delete();

        // Remove the reaction role from the database
        guild.reactionRoles = guild.reactionRoles.filter(obj => obj.id !== embedId);

        // Mark the document as modified
        guild.markModified("reactionRoles");
        // Save the guild object
        guild.save();

        // Reply with a success message
        interaction.followUp({ content: "The reaction role has been deleted", ephemeral: false });
      }
    }
  },
  /**
   * Handle button clicks on the embed
   * @param {MessageComponentInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  buttonCallback: async function(interaction, client) {
    // Ensure all parameters are valid
    if (
      !interaction instanceof MessageComponentInteraction ||
      !client instanceof Client
    ) return;

    // Find the guild in the database
    let guildObj = await guilds.findOne({ guildId: interaction.guild.id });
    let member = await interaction.guild.members.fetch(interaction.user.id);

    // Create a new guild object in the database if one doesn't already exist
    if (!guildObj) {
      guildObj = new guilds({
        guildId: interaction.guild.id,
      });
      guildObj.save();
    }

    // Ensure reaction roles have been setup in the server
    if (!guildObj.reactionRoles || !Array.isArray(guildObj.reactionRoles)) return;

    // Ensure the message is in the list of reaction roles
    if (!(guildObj.reactionRoles).some(r => r.messageId === interaction.message.id)) return;

    let reactionRoles = (guildObj.reactionRoles).find(r => r.messageId === interaction.message.id);
    let validInteraction = (reactionRoles.reactions).find(r => r.buttonId === (interaction.customId).split("::")[1]);

    // Ensure the interaction is valid
    if (!validInteraction) return;

    // If the member already has the role, remove it otherwise add it
    if (member.roles.cache.has(validInteraction.roleId))
      member.roles.remove(validInteraction.roleId, "Reaction role");
    else
      member.roles.add(validInteraction.roleId, "Reaction role");

    interaction.reply({ content: "Your roles have been updated", ephemeral: true });
  }
}