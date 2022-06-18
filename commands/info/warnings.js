module.exports = {
  name: "warnings",
  description: "View a users warnings",
  catagory: "info",
  usage: "warnings [user]",
  guildOnly: true,
  /**
   * Execute the selected command
   * @param {Object} message The message that was sent
   * @param {String} prefix The servers prefix
   * @param {Client} client The bots client
   */
  async execute(message, prefix, _client) {
    const Discord = require("discord.js");
    const guildData = require("../../events/client/database/models/guilds");
    const guildMemberData = require("../../events/client/database/models/guildMembers");
    let reasons = [];

    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[1]);
    if (!user) return message.channel.send("You must provide a user");
    if (user.bot || (user.user && user.user.bot))
      return message.channel.send("Bots do not have warnings");
    let memberResult = await guildMemberData.findOne({
      guildId: message.guild.id,
      memberId: user.id,
    });
    let guildResult = await guildData.findOne({ guildId: message.guild.id });
    if (!memberResult) return noWarnings();
    let tWarnings = memberResult.warnReasons.length || 0;
    let count = 0;
    if (user.username === undefined) user = user.user;
    if (user.bot) return message.channel.send(`Bots cannot be warned`);
    if (tWarnings > 0) {
      reasons = memberResult.warnReasons;
      if (!reasons) return noWarnings();
      const embed = new Discord.MessageEmbed()
        .setDescription(`${user.username} has **${tWarnings}** warnings`)
        .setTimestamp()
        .setColor(
          guildResult.preferences
            ? guildResult.preferences.embedColor
            : "#447ba1"
        )
        .setAuthor(`${user.tag}`);
      reasons.forEach((result) => {
        if (typeof result !== "object") return;
        count++;
        let r = result.reason;
        let u = `${result.moderator.username}#${result.moderator.discriminator}`;
        embed.addField(
          `Case #${count}`,
          `**Reason:** ${r}\n**Moderator:** ${u}`
        );
      });
      message.channel.send({ embeds: [embed] });
    } else noWarnings();

    function noWarnings() {
      const embed = new Discord.MessageEmbed()
        .setDescription(`${user.username} has 0 warnings`)
        .setTimestamp()
        .setColor(
          guildResult.preferences
            ? guildResult.preferences.embedColor
            : "#447ba1"
        )
        .setAuthor(`${user.tag}`);
      message.channel.send({ embeds: [embed] });
    }
  },
};
