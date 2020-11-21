module.exports = {
  name: 'info',
  description: 'View billybobbeep\'s info.',
  execute(message, prefix, client) {
    const { MessageEmbed, version: djsversion } = require('discord.js');
    const { version } = require('../package.json');
    const { utc } = require('moment');
    const os = require('os');
    const ms = require('ms');
    const db = require('../../structure/global.js').db;;

    const core = os.cpus()[0];
    const embed = new MessageEmbed()
      .setDescription("**Billybobbeep | Bot Info**")
      .setThumbnail(client.user.displayAvatarURL())
      .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      .setFooter(`Requested by: ${message.author.tag}`)
      .addField('General', [
        `**✰ Name:** ${client.user.tag} (${client.user.id})`,
        `**✰ Servers:** ${client.guilds.cache.size.toLocaleString()} `,
        `**✰ Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
        `**✰ Channels:** ${client.channels.cache.size.toLocaleString()}`,
        `**✰ Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
        `**✰ Node.js:** ${process.version}`,
        `**✰ Version:** v${version}`,
        `**✰ Discord.js:** v${djsversion}`,
        '\u200b'
      ])
      .addField('System', [
        `**✰ Platform:** ${process.platform}`,
        `**✰ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
        `**✰ CPU:**`,
        `\u3000 Cores: ${os.cpus().length}`,
        `\u3000 Model: ${core.model}`,
        `\u3000 Speed: ${core.speed}MHz`,
        //`**❯ Memory:**`,
        //`\u3000 Total: ${client.utils.formatBytes(process.memoryUsage().heapTotal)}`,
        //`\u3000 Used: ${client.utils.formatBytes(process.memoryUsage().heapUsed)}`
      ])
      .setTimestamp();
    message.channel.send(embed);
  }
}