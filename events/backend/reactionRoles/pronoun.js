const Discord = require('discord.js');
const guildData = require('../../client/database/models/guilds');

module.exports = message => {
  guildData.findOne({ guildId: message.guild.id }).then(result => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Pronoun Roles")
      .setDescription(
        `⚪ Him/he\n` +
        `🔴 She/her\n` +
        `⚫ Them/they`)
      .setColor(result.embedColor)
      .setFooter(`React below to claim a role!`)
    message.channel.send(embed);
    message.delete();
  });
}