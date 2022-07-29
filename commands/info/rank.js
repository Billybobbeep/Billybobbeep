module.exports = {
  name: "rank",
  description: "View your rank card or someone elses in the server",
  catagory: "info",
  alias: ["cl", "currlvl", "xp"],
  guildOnly: true,
  slashInfo: { enabled: true, public: false },
  options: [
    {
      name: "user",
      description: "User to get rank of",
      type: 6,
      required: false,
    },
  ],
  /**
   * Execute the selected command
   * @param {Object} message The message that was sent
   * @param {String} prefix The servers prefix
   * @param {Client} client The bots client
   */
  execute: async function(message, prefix, client) {
    const guildMemberData = require("../../events/client/database/models/guildMembers");
    let channel = message.data
      ? {
          send(msg) {
            require("../../utils/functions").slashCommands.reply(
              message,
              client,
              msg
            );
          },
          reply(user, msg) {
            require("../../utils/functions").slashCommands.reply(
              message,
              client,
              `<@!${user.id}>, ${msg}`
            );
          },
          async sendTyping() {
            let guild = client.guilds.cache.get(message.guild_id);
            if (!guild) await client.guild.fetch(message.guild_id);
            let channel = guild.channels.cache.get(message.channel_id);
            if (!channel) return;
            channel.sendTyping();
          },
        }
      : message.channel;
    let args = !message.data
      ? message.content.slice(prefix.length).trim().split(/ +/g)
      : message.data.options;
    let user;
    if (message.data && message.guild_id) {
      if (message.data.options)
        user = client.users.cache.get(
          message.data.options.filter((x) => x.name.toLowerCase() == "user")
            .value
        );
      else user = client.users.cache.get(message.member.user.id);

      if (typeof user !== "object" && message.data.options)
        user = await client.users.fetch(
          message.data.options.filter((x) => x.name.toLowerCase() == "user")
            .value
        );
      else user = await client.users.fetch(message.member.user.id);
    }
    if (!message.data && message.guild)
      user =
        message.mentions.users.first() ||
        message.guild.members.cache.get(args[1]) ||
        message.author;
    if (!user.username) user = user.user;
    let displayName = `${user.username[0].toUpperCase()}${user.username
      .substring(1)
      .toLowerCase()}`;
    channel.sendTyping();

    guildMemberData
      .findOne({
        guildId: message.guild?.id || message.guild_id,
        memberId: user.id,
      })
      .then(async (result) => {
        if (!result) return channel.send("No data found");
        let level = result.level || 0;
        let xp = result.xp || 1;
        let xpForLevel = 150;
        if (result.activeGuild) {
          xpForLevel = level * 2 + 200;
          if (xpForLevel < 100) xpForLevel = 100;
        } else {
          xpForLevel = Math.floor(level * 2 + 150);
          if (xpForLevel < 100) xpForLevel = 100;
        }
        const canvas = require("canvas");
        let avatar = await canvas.loadImage(
          user.displayAvatarURL({ dynamic: false, format: "png" })
        );
        channel.send({
          files: [
            require("../../utils/functions").rank(
              avatar,
              displayName,
              parseInt(user.discriminator),
              xp,
              xpForLevel,
              level
            ),
          ],
        });
      });
  }
}