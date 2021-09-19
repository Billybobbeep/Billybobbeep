module.exports = {
    name: 'info',
    description: 'View billybobbeep\'s info',
    guildOnly: true,
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message, _prefix, client) {
      const { MessageEmbed, version: djsversion } = require('discord.js');
      const { version } = require('../../package.json');
      const { utc } = require('moment');
      const guildData = require('../../events/client/database/models/guilds');
      const os = require('os');
      const ms = require('ms');
  
      const core = os.cpus()[0];
      guildData.findOne({ guildId: message.guild.id }).then(result => {
        const embed = new MessageEmbed()
          .setDescription("**Billybobbeep | Bot Info**")
          .setThumbnail(client.user.displayAvatarURL())
          .setColor(result.preferences ? result.preferences.embedColor : '#447ba1')
          .setFooter(`Requested by: ${message.author.tag}`)
          .addField('General', [
            `**Name:** ${client.user.tag} (${client.user.id})`,
            `**Servers:** ${client.guilds.cache.size.toLocaleString()} `,
            `**Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
            `**Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
            `**Node.js:** ${process.version}`,
            `**Version:** v${version}`,
            `**Discord.js:** v${djsversion}`,
            '\u200b'
          ])
          .addField('System', [
            `**✰ Platform:** ${(process.platform).replace('win32', 'Windows').replace('linux', 'Linux')}`,
            `**✰ Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
          ])
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      });
    }
  }