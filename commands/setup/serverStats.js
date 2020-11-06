module.exports = (message, db, prefix, args) => {
    const Discord = require('discord.js');

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You need the `Administrator` premissions to run this command.')
  if (message.content.includes('help') || !args[2]) {
    const embed = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Setup Command')
    .setDescription(`With this command you can setup a server stats channel.\n\n**Usage:**\n\`${prefix}setup ${args[1]} total [channel-id]\` - Set up a total members server stat.\n\`${prefix}setup ${args[1]} member [channel-id]\` - Set up a total humans server stat.\n\`${prefix}setup ${args[1]} bot [channel-id]\` - Set up a total bot server stat.`)
    .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    return message.channel.send(embed)
  } else if (message.content.includes('reset')) {
    if (!db.get(message.guild.id + '.serverStats')) return message.channel.send(`This server does not have server stats set up.`);
    if (args[2] !== 'bot' && args[2] !== 'total'&& args[2] !== 'member' && args[2] !== 'b' && args[2] !== 't' && args[2] !== 'm') {
        message.channel.send(`Removed all server stats from the database.`);
        db.delete(message.guild.id + '.serverStats');
    } else {
        if (args[2] === 'b' || args[2] === 'bot') {
            message.channel.send(`Removed bot server stat from the database.`);
            db.delete(message.guild.id + '.serverStats.botNo');
        } else if (args[2] === 'm' || args[2] === 'member') {
            message.channel.send(`Removed member server stat from the database.`);
            db.delete(message.guild.id + '.serverStats.memberNo');
        }else if (args[2] === 't' || args[2] === 'total') {
            message.channel.send(`Removed total server stat from the database.`);
            db.delete(message.guild.id + '.serverStats.totalNo');
        }
    }
  } else {
    if (!isNaN(args[2])) return message.channel.send('You have not specified a stat type.');
    if (args[2] === 'bot' || args[2] === 'total' || args[2] === 'member' || args[2] === 'b' || args[2] === 't' || args[2] === 'm') {
    
        let channel = message.guild.channels.cache.get(args[3]);
        if (!channel) return message.channel.send(`You have not provided a channel.`);

        if ((args[2] === 't' || args[2] === 'total') && (db.set(message.guild.id + '.serverStats.totalNo', channel.id) === channel.id)) return message.channel.send(`Your total member server stat channel is already set up as ${channel}.`);
        if ((args[2] === 'm' || args[2] === 'member') && (db.set(message.guild.id + '.serverStats.memberNo', channel.id) === channel.id)) return message.channel.send(`Your member server stat channel is already set up as ${channel}.`);
        if ((args[2] === 'b' || args[2] === 'bot') && (db.set(message.guild.id + '.serverStats.botNo', channel.id) === channel.id)) return message.channel.send(`Your bot server stat channel is already set up as ${channel}.`);

        try {
          if (args[2] === 't' || args[2] === 'total') db.set(message.guild.id + '.serverStats.totalNo', channel.id);
          if (args[2] === 'b' || args[2] === 'bot') db.set(message.guild.id + '.serverStats.botNo', channel.id);
          if (args[2] === 'm' || args[2] === 'member') db.set(message.guild.id + '.serverStats.memberNo', channel.id);
        } catch {
          return message.channel.send(`An error as occured, please make sure the channel you have mentioned is in this server.`);
        }

        message.channel.send(`Your ${args[2].replace('b', 'bot').replace('m', 'member').replace('t', 'total')} stat channel has been set up as ${channel}`)
    
    } else message.channel.send('You have provided an invalid stat type.');
  }
}