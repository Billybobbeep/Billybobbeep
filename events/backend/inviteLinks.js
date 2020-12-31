const guildData = require('../client/database/models/guilds');
const Discord = require('discord.js');

module.exports = async (message, client) => {
  if (!message.guild) return;
  guildData.findOne({ guildId: message.guild.id }).then(result => {
    let prefix = result.prefix || '~'
    const embed = new Discord.MessageEmbed()
    const logging = require('../../utils/functions.js').logging;
    if (message.author.bot) return;

    //Invite link detecting
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    embed.setTitle(`Billybobbeep | Invite Links`);
    embed.setTimestamp();
    embed.setColor(result.embedColor);
    let inviteLinks = result.inviteLinks || false;
    if (!inviteLinks) return;

    if (message.guild.owner.id === message.author.id) return;
    if (message.content.toLowerCase().includes('discord.gg') || message.content.toLowerCase().includes('discord.com/invite')) {
      message.delete();
      embed.setDescription(`We have detected that you have sent a discord invite link, if you would like to share your server inside of our server please contact one of the owners.\n` +
        `Detected Invite Link: **${message.content.toLowerCase()}**\n` +
        `Thanks, the ${message.guild.name} Staff Team`);
      await message.author.send(embed);

      embed.setTitle(`Invite Link Detected`);
      embed.setDescription(`**Invite Link:** ${message.content.toLowerCase()}\n` +
        `**Message ID:** ${message.id}\n\n` +
        `**Channel:** ${message.channel}\n` +
        `**Channel ID:** ${message.channel.id}\n\n` +
        `**Author:** ${message.author}\n` +
        `**Author Tag:** ${message.author.tag}\n` +
        `**Author ID:** ${message.author.id}\n`)
        
      logging(embed, message, client);
    }
  });
}