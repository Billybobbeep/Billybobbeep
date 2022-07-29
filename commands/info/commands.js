let requesters = [];
let pages = [];

module.exports = {
  name: "commands",
  description: "View billybobbeeps commands",
  alias: ["help", "cmds"],
  slashInfo: { enabled: true, public: false },
  options: [],
  /**
   * @param {Object} message The message that was sent
   * @param {String} prefix The servers prefix
   * @param {Client} client The bots client
   */
  execute: function(message, prefix, client) {
    const Discord = require("discord.js");
    const fs = require("fs");
    const guildData = require("../../events/client/database/models/guilds");

    let channel =
      message.data && !message.author
        ? {
          send(msg) {
            console.log(msg);
            require("../../utils/functions").slashCommands.reply(
              message,
              client,
              msg
            );
          },
        }
      : message.channel;

    guildData
      .findOne({ guildId: message.guild?.id || message.guild_id })
      .then((result) => {
        function addPage(title, catagories, inline) {
          let page = new Discord.MessageEmbed()
            .setTitle("Billybobbeep | " + title)
            .setDescription(
              `Below are ${client.user.username}'s ${title.toLowerCase()}`
            );
          result.preferences && result.preferences.embedColor
            ? page.setColor(result.preferences.embedColor)
            : page.setColor("#447ba1");

          for (const folder of commandFolders) {
            const commandFiles = fs
              .readdirSync(`./commands/${folder}`)
              .filter((file) => file.endsWith(".js"));
            for (const file of commandFiles) {
              const command = require(`../../commands/${folder}/${file}`);
              catagories.forEach((catagory) => {
                if (
                  command.usage &&
                  command.catagory &&
                  command.catagory == catagory
                ) {
                  page.addField(
                    `${prefix}${command.name}`,
                    `${command.description}\n` +
                      `Usage: ${prefix}${command.usage}`,
                    inline || false
                  );
                } else if (command.catagory && command.catagory == catagory) {
                  page.addField(
                    `${prefix}${command.name}`,
                    `${command.description}`,
                    inline || false
                  );
                }
              });
            }
          }
          if (page.fields.length > 0) pages.push(page);
        }
        const commandFolders = fs
          .readdirSync("./commands")
          .filter((file) => !file.endsWith(".js"));

        addPage("Fun Commands", ["fun", "generator"]);
        addPage("Informational Commands", ["info"]);
        addPage("Economy Commands", ["economy"]);
        addPage("Moderation Commands", ["moderation"], true);
        addPage("Other Commands", ["other", "none"]);
        // addPage("Music Commands", ["music"]);

        let nextBtn = new Discord.MessageButton();
        nextBtn.setLabel("Next Page");
        nextBtn.setStyle("PRIMARY");
        nextBtn.setCustomId("commands-next");
        let backBtn = new Discord.MessageButton();
        backBtn.setLabel("Previous Page");
        backBtn.setStyle("PRIMARY");
        backBtn.setCustomId("commands-back");
        backBtn.setDisabled(true);
        let row = new Discord.MessageActionRow().addComponents(
          backBtn,
          nextBtn
        );

        channel.send({ embeds: [pages[0]], components: [row] });
        requesters.push(
          message.author ? message.author.id : message.member.user.id
        );
      });
  },
  /**
   * A function to be emitted whenever someone interacts with a button
   * @param {*} interaction The interaction
   * @param {Client} client The bots client
   */
  async buttonCallback(interaction, client) {
    /**
     * Changes whether or not a component is disabled
     * @param {*} message The message with the attached
     * @param {array} componentsToChange An array of comonents to change and their new values
     * @example changeComponents(message, [{ name: `${this.name}-example`, disabled: true }]);
     * @returns A row of components
     */
    function changeComponents(message, componentsToChange) {
      let components = [];
      componentsToChange.forEach((c) => {
        message.components.forEach((row) => {
          row.components.forEach((component) => {
            if (component.custom_id == c.name) component.disabled = c.disabled;
          });
          components.push(row);
        });
      });
      return [components[1]];
    }
    let guild = client.guilds.cache.get(interaction.guild_id);
    if (typeof guild !== "object")
      guild = await client.guilds.fetch(interaction.guild_id);
    let channel = guild.channels.cache.get(interaction.channel_id);
    if (typeof channel !== "object")
      channel = await client.channels.fetch(interaction.channel_id);
    let originalMessage = await channel.messages.fetch(interaction.message.id);
    if (!requesters.includes(interaction.member.user.id))
      return require("../../utils/functions").buttons.respond(
        interaction,
        client,
        `Only the person that executes the ${this.name} command can interact with the embed`,
        { userOnly: true }
      );
    if (!originalMessage || originalMessage.embeds.length < 1)
      return require("../../utils/functions").buttons.respond(
        interaction,
        client,
        "Something went wrong, execute the command again to fix the issue",
        { userOnly: true }
      );

    let currentPage = pages.filter(
      (page) => page.title == originalMessage.embeds[0].title
    );

    if (interaction.data.custom_id.toLowerCase() == "commands-next") {
      let embed = pages[pages.indexOf(currentPage[0]) + 1];
      if (embed) {
        originalMessage.edit({
          embeds: [embed],
          components: changeComponents(originalMessage, [
            {
              name: `${this.name}-back`,
              disabled: false,
            },
            {
              name: `${this.name}-next`,
              disabled: false,
            },
          ]),
        });
      } else
        return require("../../utils/functions").buttons.respond(
          interaction,
          client,
          "You've reached the last page",
          { userOnly: true }
        );

      if (pages.indexOf(currentPage[0]) == pages.length - 1) {
        originalMessage.edit({
          embeds: [embed],
          components: changeComponents(originalMessage, [
            {
              name: `${this.name}-next`,
              disabled: true,
            },
            {
              name: `${this.name}-back`,
              disabled: false,
            },
          ]),
        });
      }
    } else {
      let embed = pages[pages.indexOf(currentPage[0]) - 1];
      if (embed) {
        originalMessage.edit({
          embeds: [embed],
          components: changeComponents(originalMessage, [
            { name: `${this.name}-next`, disabled: false },
          ]),
        });
      } else
        return require("../../utils/functions").buttons.respond(
          interaction,
          client,
          "You're already at the first page",
          { userOnly: true }
        );

      if (pages.indexOf(currentPage[0]) == 0) {
        originalMessage.edit({
          embeds: [embed],
          components: changeComponents(originalMessage, [
            {
              name: `${this.name}-back`,
              disabled: true,
            },
            {
              name: `${this.name}-next`,
              disabled: false,
            },
          ]),
        });
      }
    }
  }
}