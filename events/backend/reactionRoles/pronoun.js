const Discord = require('discord.js');
const guildData = require('../../client/database/models/guilds');

module.exports = async (message) => {
    const commandEmbed = new Discord.MessageEmbed()
      .setTitle("Pronoun Roles")
      .setDescription(
        `⚪ Him/he\n` +
        `🔴 She/her\n` +
        `⚫ Them/they`)
      .setColor(guildData.findOne({ guildId: message.guild.id }).then(result => result.embedColor))
      .setFooter(`React below to claim a role!`)
    message.channel.send(commandEmbed)
    message.delete();
}