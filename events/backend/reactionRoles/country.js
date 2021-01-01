const Discord = require('discord.js');
const guildData = require('../../client/database/models/guilds');

module.exports = async (message) => {
    const commandEmbed = new Discord.MessageEmbed()
      .setTitle("Region Roles")
      .setDescription(
        `⚪ British\n` +
        `🔴 English\n` +
        `🟡 American\n` +
        `🟢 Other`)
      .setColor(guildData.findOne({ guildId: message.guild.id }).then(result => result.embedColor))
      .setFooter(`React below to claim a role!`)
    message.channel.send(commandEmbed)
    message.delete();
}