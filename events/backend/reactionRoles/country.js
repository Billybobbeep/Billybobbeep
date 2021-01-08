const Discord = require('discord.js');
const guildData = require('../../client/database/models/guilds');

module.exports = message => {
  guildData.findOne({ guildId: message.guild.id }).then(result => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Region Roles")
      .setDescription(
        `⚪ British\n` +
        `🔴 English\n` +
        `🟡 American\n` +
        `🟢 Other`)
      .setColor(result.embedColor)
      .setFooter(`React below to claim a role!`)
    message.channel.send(embed);
    message.delete();
  });
}