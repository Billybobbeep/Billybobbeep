module.exports = (message, prefix, embedColor) => {
    const Discord = require('discord.js');
    const guildData = require('../../events/client/database/models/guilds.js');

    guildData.findOne({ guildId: message.guild.id }).then(result => {
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You need the `Administrator` permissions to run this command')
      if (message.content.includes('help') || !args[2]) {
        const embed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Setup Command')
        .setDescription(`With this command you can setup a server stats channel text.\n\n**Usage:**\n\`${prefix}setup ${args[1]} total [text]\` - Set up a total members server stat text.\n\`${prefix}setup ${args[1]} member [text]\` - Set up a total humans server stat text.\n\`${prefix}setup ${args[1]} bot [text]\` - Set up a total bot server stat text.`)
        .setColor(`${embedColor}`)
        message.channel.send(embed);
      } else if (message.content.includes('reset')) {
        if (!result.serverStats) return message.channel.send('This server does not have server stats set up');
        if (args[2] !== 'bot' && args[2] !== 'total'&& args[2] !== 'member' && args[2] !== 'b' && args[2] !== 't' && args[2] !== 'm') {
            guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_botNoText: false }).then(() => {
              guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_memberNoText: false }).then(() => {
                guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_totalNoText: false }).then(() => {
                  message.channel.send('Removed all server stats from the database');
                });
              });
            });
        } else {
            if (args[2] === 'b' || args[2] === 'bot') {
                guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_botNoText: false }).then(() => {
                  message.channel.send('Removed bot server stat from the database');
                });
            } else if (args[2] === 'm' || args[2] === 'member') {
                guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_memberNoText: false }).then(() => {
                  message.channel.send('Removed member server stat from the database');
                });
            } else if (args[2] === 't' || args[2] === 'total') {
                guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_totalNoText: false }).then(() => {
                  message.channel.send('Removed total server stat from the database');
                });
            }
        }
      } else {
        if (!isNaN(args[2])) return message.channel.send('You have not specified a stat type.');
        if (args[2] === 'bot' || args[2] === 'total' || args[2] === 'member' || args[2] === 'b' || args[2] === 't' || args[2] === 'm') {
        
            var text = args.slice(3).join(' ');

            try {
              if (args[2] === 't' || args[2] === 'total') guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_totalNoText: text });
              if (args[2] === 'b' || args[2] === 'bot') guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_botNoText: text });
              if (args[2] === 'm' || args[2] === 'member') guildData.findOneAndUpdate({ guildId: message.guild.id }, { serverStats_memberNoText: text });
            } catch {
              return message.channel.send('An error has occured');
            }

            message.channel.send(`Your ${args[2].replace('t', 'total').replace('b', 'bot').replace('m', 'member')} stat channel text has been set up as ${text}`);
        
        } else message.channel.send('You have provided an invalid stat type.');
      }
    });
}