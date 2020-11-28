const Discord = require('discord.js');
const db = require('../../structure/global.js').db;

module.exports = async (message) => {
    const commandEmbed = new Discord.MessageEmbed()
      .setTitle("Region Roles")
      .setDescription(
        `⚪ British\n` +
        `🔴 English\n` +
        `🟡 American\n` +
        `🟢 Other`)
      .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      .setFooter(`React below to claim a role!`)
    message.channel.send(commandEmbed)
    message.delete();
}