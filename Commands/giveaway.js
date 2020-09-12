const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const configFile = require('../config.json');
let inProgress = false

module.exports = async(client, msg, args, prefix, message) => {
  if (inProgress === true) return message.channel.send("There is already a giveaway running.")
    if (!args[0]) return message.channel.send(`Please specify a time.`);
    if (
      !args[0].endsWith("d") &&
      !args[0].endsWith("h") &&
      !args[0].endsWith("m")
    )
      return message.channel.send(
        `You did not use the correct formatting for the time.`
      );
    if (isNaN(args[0][0])) return message.channel.send(`You did not specify a valid time.`);
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        `I could not find that channel in the server.`
      );
    let prize = args.slice(2).join(" ");
    if (!prize) return message.channel.send(`Please specify a time.`);
    message.channel.send(`*Giveaway created in ${channel}.*`);
    let Embed = new MessageEmbed()
      .setTitle(`${prize}`)
      .setDescription(
        `**Host:** ${message.author.tag}\n` + `**Prize:** ${prize}`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor([ 144, 224, 135]);

    let m = await channel.send(Embed);
    m.react("🎉");
    inProgress = true
    setTimeout(() => {
      if (m.reactions.cache.get("🎉").count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get("🎉").count}`);
        return message.channel.send(
          `Not enough people reacted for me to start draw a winner!`
        );
        inProgress = false
      }

      let winner = m.reactions.cache
        .get("🎉")
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(
        `${winner} has won the giveaway!`
      );
      inProgress = false
      m.reactions.removeAll();
      let WinningEmbed = new MessageEmbed()
      .setTitle(`${prize}`)
      .setDescription(
        `**Host:** ${message.author.tag}\n` + `**Prize:** ${prize}\n` + `**Winner:** ${winner.tag}\n` + `\n` + `*This giveaway has now ended.*`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor([ 144, 224, 135]);
      m.edit(WinningEmbed)
    }, ms(args[0]));
}