const { Client, CommandInteraction, MessageComponentInteraction, ButtonStyle, EmbedBuilder, ButtonBuilder, SlashCommandBuilder, ActionRowBuilder, CommandInteractionOptionResolver } = require("discord.js");
const { readdirSync } = require("fs");
let requesters = [];

/**
 * Add a page to the embed
 * @param {EmbedBuilder} embed The embed to add the page to
 * @param {string} title The embed title
 * @param {any[]} catagories An array of command catagories to include
 * @param {Boolean} inline Whether the fields should be inline
 * @returns {EmbedBuilder} The page
 */
function addPage(title, catagories, inline) {
  const embed = new EmbedBuilder();
  // Array of fields to add to the embed
  let fields = [];
  // Set the title of the page
  embed.setTitle(`Billybobbeep | ${title}`);
  // Default properties of the embed
  embed.setColor("#447ba1");
  embed.setTimestamp();

  const commandFolders = readdirSync("./commands") // Get the command folder
    .filter((file) => !file.includes(".")); // Filter out files

  // Loop through the subfolders of the commands folder
  for (const folder of commandFolders) {
    // Get the commands in the subfolder
    const commands = readdirSync(`./commands/${folder}`) // Get the subfolder
      .filter((file) => file.endsWith(".js")); // Filter JavaScript files

    // Loop through the commands in the subfolder
    for (const file of commands) {
      // Get the command
      let command = require(`../../commands/${folder}/${file}`);

      // Prevent "circular dependancies" error
      if (file === "commands.js") {
        command = {
          name: "commands",
          description: "View supported commands",
          category: "info"
        }
      }

      // Return if the command isn't enabled
      if (command.template === true || !command.slashInfo?.enabled) continue;
      // If the command is not public and dev mode isn't enabled
      if (!require("../../utils/cache").dev.enabled && !command.slashInfo?.public) continue;
      // If the command category matches the category to add
      if (catagories.includes(command.category)) {
        // Add the command to the fields array
        fields.push({
          name: `${command.name}`,
          value: `${command.description}`,
          inline: inline || false
        });
      }
    }
  }

  if (fields.length > 0)
    return embed.addFields(fields);
  else
    return null;
}

// Get the pages to add to the embed
let pages = [
  addPage("Informational Commands", ["info"], null, 1),
  addPage("Fun Commands", ["fun", "generator"], null, 2),
  addPage("Moderation Commands", ["mod", "moderation"], null, 3),
  addPage("Other Commands", ["other"], null, 4),
]

module.exports = {
  name: "commands",
  description: "View supported commands",
  category: "info",
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
    builder.setDMPermission(true);
    // Command options
    builder.addIntegerOption((option) => {
      // Set the options name
      option.setName("page-no");
      // The options description
      option.setDescription("The page number to view");
      // Set if the option is required
      option.setRequired(false);
      // Set min/max values for the option
      option.setMinValue(1);
      option.setMaxValue(pages.length);
      // Return the option
      return option;
    })
    // Return the information in JSON format
    return builder.toJSON();
  },
  /**
   * Execute the selected command
   * @param {CommandInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  execute: function(interaction, _client) {
    // Define the buttons
    let nextBtn = new ButtonBuilder();
    nextBtn.setLabel("Next Page");
    nextBtn.setStyle(ButtonStyle.Primary);
    nextBtn.setCustomId("commands::next");

    let backBtn = new ButtonBuilder();
    backBtn.setLabel("Previous Page");
    backBtn.setStyle(ButtonStyle.Primary);
    backBtn.setDisabled(true);
    backBtn.setCustomId("commands::back");

    // Define the action row
    let btnRow = new ActionRowBuilder().addComponents(backBtn, nextBtn);

    // Ensure the page is not null
    pages.forEach((page, index) => {
      if (!page)
        pages.splice(index, 1);
    });
    if (pages[pages.length - 1] === null)
      pages.pop();

    // Number the pages
    pages.forEach((page, index) => {
      page?.setFooter({
        text: `Page ${index + 1}/${pages.length}`
      });
    });

    // If the page is null, return with an error
    if (pages.length === 0 || pages[0] === null)
      return interaction.reply({ content: "Something went wrong, please try again later", ephemeral: true });

    if (interaction.options.data[0]) {
      // Send the requested page
      interaction.reply({ embeds: [pages[parseInt(interaction.options.data[0].value) - 1]] });
    } else {
      // Send the first page of the embed
      if (pages.length > 1) {
        interaction.reply({ embeds: [pages[0]], components: [btnRow] })
          .then(async () => {
            // Add the user to the requesters array
            let x = await interaction.fetchReply();
            requesters.push({ userId: interaction.user.id, messageId: x.id });

            setTimeout(() => {
              // Remove the requester from the array
              requesters = requesters.filter(x => x.userId !== interaction.user.id && x.messageId !== x.id);
              // Disable the buttons on the embed
              x.edit({ embeds: [pages[0]], components: [(new ActionRowBuilder().addComponents(backBtn.setDisabled(true), nextBtn.setDisabled(true)))] })
            }, 180000); // 3 minutes
          });
      } else {
        // Send the embed with no components as there is only one page
        interaction.reply({ embeds: [pages[0]] });
      }
    }
  },
  /**
   * Handle button clicks on the embed
   * @param {MessageComponentInteraction} interaction The interaction that was sent
   * @param {Client} client The bots client
   */
  buttonCallback: async function(interaction, _client) {
    // Ensure the parameter is valid
    if (!interaction instanceof MessageComponentInteraction) return;

    let originalMessage = interaction.message;

    // Find out if a requester exists
    let requesterExists = !!requesters.find((obj) => {
      let id1 = parseInt(obj.messageId);
      let id2 = parseInt(interaction.message.id);

      return obj.userId === interaction.user.id && id1 === id2;
    });

    // Define the buttons
    let nextBtn = new ButtonBuilder();
    nextBtn.setLabel("Next Page");
    nextBtn.setStyle(ButtonStyle.Primary);
    nextBtn.setCustomId("commands::next");
    let backBtn = new ButtonBuilder();
    backBtn.setLabel("Previous Page");
    backBtn.setStyle(ButtonStyle.Primary);
    backBtn.setCustomId("commands::back");

    let currentPage = pages.indexOf(pages.find((page) => page && page.data.title === originalMessage.embeds[0].data.title));

    if (!currentPage && currentPage !== 0)
      return interaction.reply({ content: "This embed is expired, execute the command `/commands` again", ephemeral: true });

    if (requesterExists && interaction.customId.includes("next")) {
      // Ensure the next page is not null
      if (currentPage === pages.length - 1)
        return interaction.reply({ content: "You have already reached the last page", ephemeral: true });
      // If its the last page, disable the next button
      if (currentPage + 1 === pages.length - 1)
        nextBtn.setDisabled(true);

      // Enable the back button
      backBtn.setDisabled(false);

      // Prevent discord displaying an error message to the user
      interaction.deferUpdate();
      
      // Edit the orginal message with the next page
      (interaction.message).edit({ embeds: [pages[currentPage + 1]], components: [new ActionRowBuilder().addComponents(backBtn, nextBtn)] })
        .then(async () => {
          // Remove the requester from the array
          requesters = requesters.filter(x => x.userId !== interaction.user.id && x.messageId !== interaction.message.id);

          // Add the user to the requesters array
          let x = await interaction.fetchReply();
          requesters.push({ userId: interaction.user.id, messageId: x.id });

          setTimeout(() => {
            // Remove the requester from the array
            requesters = requesters.filter(x => x.userId !== interaction.user.id && x.messageId !== x.id);
            // Disable the buttons on the embed
            x.edit({ embeds: [pages[currentPage + 1]], components: [(new ActionRowBuilder().addComponents(backBtn.setDisabled(true), nextBtn.setDisabled(true)))] });
          }, 180000); // 3 minutes
        });
    } else if (requesterExists && interaction.customId.includes("back")) {
      // Ensure the previous page is not null
      if (currentPage === 0)
        return interaction.reply({ content: "You have already reached the first page", ephemeral: true });
      // If its the first page, disable the back button
      if (currentPage - 1 === 0)
        backBtn.setDisabled(true);

      // Prevent discord displaying an error message to the user
      interaction.deferUpdate();

      // Edit the orginal message with the previous page
      (interaction.message).edit({ embeds: [pages[currentPage - 1]], components: [new ActionRowBuilder().addComponents(backBtn, nextBtn)] })
        .then(async () => {
          // Add the user to the requesters array
          let x = await interaction.fetchReply();

          // Remove the requester from the array
          requesters = requesters.filter(x => x.userId !== interaction.user.id && x.messageId !== interaction.message.id);

          requesters.push({ userId: interaction.user.id, messageId: x.id });

          setTimeout(() => {
            // Remove the requester from the array
            requesters = requesters.filter(x => x.userId !== interaction.user.id && x.messageId !== x.id);
            // Disable the buttons on the embed
            x.edit({ embeds: [pages[currentPage - 1]], components: [(new ActionRowBuilder().addComponents(backBtn.setDisabled(true), nextBtn.setDisabled(true)))] });
          }, 180000); // 3 minutes
        });
    } else {
      // Inform the user that they cannot click the button
      interaction.reply({ content: "Only the person that executes the command can interact with the embed", ephemeral: true });
    }
  }
}