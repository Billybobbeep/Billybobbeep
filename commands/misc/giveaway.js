const { MessageEmbed } = require('discord.js');
const ms = require('ms');
const db = require('../../data/databaseManager/index.js');

module.exports = {
  name: 'giveaway',
  description: 'Start a giveaway.',
  guildOnly: true,
  async execute (message, prefix, client) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    if (!args[0]) return message.channel.send(`Please specify a time.`);
    if (
      !args[0].endsWith('d') &&
      !args[0].endsWith('h') &&
      !args[0].endsWith('m')
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
    let prize = args.slice(2).join(' ');
    if (!prize) return message.channel.send(`Please specify a time.`);
    message.channel.send(`*Giveaway created in ${channel}.*`);
    let Embed = new MessageEmbed()
      .setTitle(`${prize}`)
      .setDescription(
        `**Host:** ${message.author.tag}\n` + `**Prize:** ${prize}`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

    let m = await channel.send(Embed);
    m.react('🎉');
    setTimeout(() => {
      if (m.reactions.cache.get('🎉').count <= 1) {
        message.channel.send(`Reactions: ${m.reactions.cache.get('🎉').count}`);
        return message.channel.send(`Not enough people reacted for me to start draw a winner!`);
      }

      let winner = m.reactions.cache
        .get('🎉')
        .users.cache.filter((u) => !u.bot)
        .random();
      channel.send(`${winner} has won the giveaway!`);
      m.reactions.removeAll();
      let WinningEmbed = new MessageEmbed()
      .setTitle(`${prize}`)
      .setDescription(
        `**Host:** ${message.author.tag}\n` + `**Prize:** ${prize}\n` + `**Winner:** ${winner.tag}\n` + `\n` + `*This giveaway has now ended.*`
      )
      .setTimestamp(Date.now() + ms(args[0]))
      .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
      m.edit(WinningEmbed)
    }, ms(args[0]));
  }
}