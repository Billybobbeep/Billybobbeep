module.exports = (message, prefix, embedColor) => {
    const Discord = require('discord.js');
    const guildData = require('../../events/client/database/models/guilds.js');

    guildData.findOne({ guildId: message.guild.id }).then(() => {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need the `Administrator` permissions to run this command.')
    if (message.content.includes('help') || !args[2]) {
      const embed = new Discord.MessageEmbed()
      .setTitle('Billybobbeep | Setup Command')
      .setDescription(`With this command you can setup a server stats channel.\n\n**Usage:**\n\`${prefix}setup ${args[1]} total [channel-id]\` - Set up a total members server stat.\n\`${prefix}setup ${args[1]} member [channel-id]\` - Set up a total humans server stat.\n\`${prefix}setup ${args[1]} bot [channel-id]\` - Set up a total bot server stat.`)
      .setColor(`${embedColor}`)
      message.channel.send(embed);
    } else if (message.content.includes('reset')) {
      if (!result.serverStats) return message.channel.send('This server does not have server stats set up');
      if (args[2] !== 'bot' && args[2] !== 'total'&& args[2] !== 'member' && args[2] !== 'b' && args[2] !== 't' && args[2] !== 'm') {
        guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats: false }).then(() => {
          message.channel.send('Removed all server stats from the database');
        });
      } else {
        if (args[2] === 'b' || args[2] === 'bot') {
          guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_botNo: false }).then(() => {
            message.channel.send('Removed `bot` server stat from the database');
          });
        } else if (args[2] === 'm' || args[2] === 'member') {
          guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_memberNo: false }).then(() => {
            message.channel.send('Removed `member` server stat from the database');
          });
        } else if (args[2] === 't' || args[2] === 'total') {
          guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_totalNo: false }).then(() => {
            message.channel.send('Removed `total` server stat from the database');
          });
        }
      }
    } else {
      if (!isNaN(args[2])) return message.channel.send('You have not specified a stat type');
      if (args[2] === 'bot' || args[2] === 'total' || args[2] === 'member' || args[2] === 'b' || args[2] === 't' || args[2] === 'm') {
      
          let channel = message.guild.channels.cache.get(args[3]);
          if (!channel) return message.channel.send('You have not provided a channel');

          guildData.findOne({ guildId: message.guild.id }).then(result => {
            if ((args[2] === 't' || args[2] === 'total') && (result.serverStats_totalNo === channel.id)) return message.channel.send(`Your total member server stat channel is already set up as ${channel}`);
            if ((args[2] === 'm' || args[2] === 'member') && (result.serverStats_memberNo === channel.id)) return message.channel.send(`Your member server stat channel is already set up as ${channel}`);
            if ((args[2] === 'b' || args[2] === 'bot') && (result.serverStats_botNo === channel.id)) return message.channel.send(`Your bot server stat channel is already set up as ${channel}`);

            try {
              if (args[2] === 't' || args[2] === 'total') guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_totalNo: channel.id });
              if (args[2] === 'b' || args[2] === 'bot') guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_botNo: channel.id });
              if (args[2] === 'm' || args[2] === 'member') guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_memberNo: channel.id });
            } catch {
              message.channel.send(`An error as occured, please make sure the channel you have mentioned is in this server`);
            }

            message.channel.send(`Your \`${args[2].replace('t', 'total').replace('b', 'bot').replace('m', 'member')}\` stat channel has been set up as ${channel}`);
          });
      } else message.channel.send('You have provided an invalid stat type');
    }
  });
}