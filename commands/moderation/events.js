const { Client, CommandInteraction, EmbedBuilder, SlashCommandBuilder, GuildScheduledEventPrivacyLevel, GuildScheduledEventEntityType, ChannelType } = require("discord.js");
const { logging, checkMod } = require("../../utils/functions");
const { format, addDays } = require("date-fns");

module.exports = {
  name: "events",
  description: "View, create or delete events",
  category: "mod",
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
    // Add a 'get' subcommand
    builder.addSubcommand((command) => {
      // Set the subcommand's name
      command.setName("get");
      // Set the subcommand's description
      command.setDescription("Get all scheduled events");
      // Return the command
      return command;
    });
    // Add a 'create' subcommand
    builder.addSubcommand((command) => {
      return require("./subcommands/events").create(command);
    });
    // Add a 'delete' subcommand
    builder.addSubcommand((command) => {
      return require("./subcommands/events").delete(command);
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
    // Get subcommand name
    let subCommand = (interaction.options.data).find(command => ["get", "create", "delete"].includes(command.name));
    let events = interaction.guild.scheduledEvents;

    // TODO: If client doesn't have admin permissions, events cannot be found, fix problem

    if (subCommand && !["create", "delete", "get"].includes(subCommand.name))
      return interaction.reply({ content: "The subcommand provided is not valid", ephemeral: true });

    if (!(interaction.guild.members.me).permissions.has("ManageEvents"))
      return interaction.reply({ content: "Missing the `MANAGE_EVENTS` permission", ephemeral: true });

    // Defer the reply
    await interaction.deferReply();

    // Ensure the user is a moderator
    if (!(await checkMod(interaction)))
      return interaction.followUp({ content: "You must be a moderator to use this command", ephemeral: true });
      
    if (subCommand.name === "create") {
      // Define the arguments
      let name = (subCommand.options).find(option => option.name === "name")?.value;
      let startTime = (subCommand.options).find(option => option.name === "start-time")?.value;
      let channel = (subCommand.options).find(option => option.name === "channel")?.value;
      let description = (subCommand.options).find(option => option.name === "description")?.value;
      let date = (subCommand.options).find(option => option.name === "date")?.value;
      let endTime = (subCommand.options).find(option => option.name === "end-time")?.value;
      let image = (subCommand.options).find(option => option.name === "image")?.value;

      // Ensure all required arguments are provided
      if (!name || !startTime || !channel)
        return interaction.followUp({ content: "Missing required fields, execute the command again ensuring all required arguments have a valid value", ephemeral: true });

      channel = await interaction.guild.channels.fetch(channel);

      // Ensure the channel is a voice channel
      if (!channel || (channel.type !== ChannelType.GuildVoice && channel.type !== ChannelType.GuildStageVoice))
        return interaction.followUp({ content: "The channel must be either a stage or voice channel", ephemeral: true });

      // Ensure the provided date is valid
      if (date && !Date.parse(date))
        return interaction.followUp({ content: "The date provided is not valid, ensure the format is in 'mm/dd/yyyy'", ephemeral: true });
      // Ensure a date is provided and is a date object
      if (!date)
        date = new Date();
      else
        date = new Date(date);

      let time1 = startTime.split(":");
      let time2 = endTime?.split(":");

      if (time1.length < 2)
        return interaction.followUp({ content: "The start time provided is not valid, ensure the format is in 'hh:mm'", ephemeral: true });
      if (time2 && time2.length < 2)
        return interaction.followUp({ content: "The start time provided is not valid, ensure the format is in 'hh:mm'", ephemeral: true });

      if (date < Date.UTC(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getSeconds()
      )) {
        if ((subCommand.options).find(option => option.name === "date"))
          interaction.followUp({ content: "The event date must be in the future", ephemeral: true })
        else
          date = addDays(date, 1).toUTCString();
      }

      // Convert the date into a date object
      date = new Date(date);

      // Convert the date to UTC
      date = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), time1[0], time1[1], 0, 0);
      // Add the time to the date
      startTime = new Date(date)
        .setHours(time1[0], time1[1]);
      // Convert the end time to a valid date
      if (Date.parse(endTime)) {
        endTime = new Date(date)
          .setHours(time2[0], time2[1]);
      } else if (endTime) {
        endTime = new Date(date)
          .setHours(time2[0], time2[1]);
      }

      events.create({
        name,
        channel: channel.id,
        scheduledStartTime: startTime,
        scheduledEndTime: endTime ? endTime : undefined,
        description: description || undefined,
        image: image || undefined,
        privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
        entityType: channel.type === ChannelType.GuildVoice ? GuildScheduledEventEntityType.Voice : GuildScheduledEventEntityType.StageInstance,
        reason: `Responsible moderator: ${interaction.user.tag}`
      })
        .then(() => {
          // Construct an embed
          const embed = new EmbedBuilder();
          // Set default properties
          embed.setColor("#447ba1");
          embed.setTimestamp();
          // Set embed data
          embed.setTitle("Event Created");
          embed.setDescription([
            `**Event Name:** ${name}`,
            `**Event Description:** ${description || "No description provided"}`,
            `**Event Channel:** ${channel.name}`,
            `**Event Start Time:** ${format(new Date(startTime), "yyyy-MM-dd HH:mm")}`,
            `**Event End Time:** ${endTime ? format(new Date(endTime), "yyyy-MM-dd HH:mm") : "N/A"}`,
            `**Responsible Moderator:** ${interaction.user.tag}`
          ].join("\n"));

          // Log the embed
          logging(embed, interaction, client, { type: "interaction", messageType: "embed" });

          // Send a message
          interaction.followUp({ content: "Event created successfully", ephemeral: false });
        })
        .catch((e) => {interaction.followUp({ content: "Failed to create event", ephemeral: true }); console.log(e)});
    } else if (subCommand.name === "delete") {
      let eventName = (subCommand.options).find(option => option.name === "name")?.value;
      let user = (subCommand.options).find(option => option.name === "user")?.value;

      // Ensure all required arguments are provided
      if (!eventName)
        return interaction.followUp({ content: "Invalid arguments, execute the command again ensuring all required arguments have a valid value", ephemeral: true });

      // Find the event
      let scheduledEvents = await events.fetch();
      let event = scheduledEvents.find(event => (event.name).toLowerCase() === eventName.toLowerCase());

      if (user && event.creator.id !== user)
        event = scheduledEvents.find(event => (event.name).toLowerCase() === eventName.toLowerCase() && event.creator.id === user);

      if (!event)
        return interaction.followUp({ content: "No events were found with the provided name", ephemeral: true });

      // Delete the event
      events.delete(event)
        .then(() => {
          // Construct an embed
          const embed = new EmbedBuilder();
          // Set default properties
          embed.setColor("#447ba1");
          embed.setTimestamp();
          // Set embed data
          embed.setTitle("Event Deleted");
          embed.setDescription([
            `**Event Name:** ${event.name}`,
            `**Event Description:** ${event.description || "No description provided"}`,
            `**Event Channel:** <#${event.channel.id}>`,
            `**Event Start Time:** ${format(new Date(event.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}`,
            `**Event End Time:** ${event.scheduledEndTimestamp ? format(new Date(event.scheduledEndTimestamp), "yyyy-MM-dd HH:mm") : "N/A"}\n`,
            `**Responsible Moderator:** ${interaction.user.tag}`
          ].join("\n"));

          // Log the embed
          logging(embed, interaction, client, { type: "interaction", messageType: "embed" });

          // Send a message
          interaction.followUp({ content: "Event deleted successfully", ephemeral: false });
        }).catch((e) => {interaction.followUp({ content: "Failed to delete event", ephemeral: true }); console.log(e)});
    } else if (subCommand.name === "get") {
      // Fields array
      let fields = [];

      // Construct an embed
      const embed = new EmbedBuilder();
      // Set the embed title
      embed.setTitle("Scheduled Events");
      // Set the default properties
      embed.setTimestamp();
      embed.setColor("#447ba1");

      let scheduledEvents = await events.fetch();

      // Find the events and append them to an array
      scheduledEvents.forEach(event => {
        fields.push({
          name: event.name,
          value: event.scheduledEndTimestamp
            ? `${event.description || "No description provided"}\nEvent Time: **${format(new Date(event.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}** until **${format(new Date(event.scheduledEndTimestamp), "yyyy-MM-dd HH:mm")}**`
            : `${event.description || "No description provided"}\nStarts at: **${format(new Date(event.scheduledStartTimestamp), "yyyy-MM-dd HH:mm")}**`,
        });
      });

      // If there are no events, return a message
      if (fields.length < 1)
        return interaction.followUp({ content: "There are no scheduled events for this server", ephemeral: true });

      // Send the embed
      interaction.followUp({ embeds: [embed.addFields(fields)], ephemeral: false });
    }
  }
}