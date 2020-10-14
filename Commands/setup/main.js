const { MessageEmbed } = require('discord.js');

module.exports = (client, message, db) => {
  let prefix = db.get(message.guild.id + '.prefix') || '~';
  const embed = new MessageEmbed()

  function nonAdmin() {
    embed.setTitle('Billybobbeep | Setup Command')
    embed.setDescription(
      'The billybobbeep setup command is used to set billy up in a new server.\nRequires the `Administrator` premissions.\n\n' +
      `Commands:\n` +
      `${prefix}setup muted [role]\n` +
      `*Sets up the muted role to use mute commands.*\n` +
      `${prefix}setup logging [channel]\n` +
      `*Sets up a logging channel.*\n` +
      `${prefix}setup level [channel]\n` +
      `*Set up a channel for level ups to dosplay in*\n` +
      `*Do not set up for level ups to display in channel the message was sent in.*\n` +
      `${prefix}prefix [new prefix]\n` +
      `*Changes the default prefix for the server.*\n` +
      `${prefix}setup embed [color]\n*Changes the default embed color*`
    )
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    embed.setTimestamp()
    embed.setFooter(`Requested by: ${message.author.tag}`);
    message.channel.send(embed)
  }

  function commands() {
    var redirect;
    if (message.content.toLowerCase().startsWith(prefix + 'setup logging')) {
      redirect = require('./loggingChannel.js');
      redirect(message, db);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'setup muted')) {
      redirect = require('./mutedRole.js');
      redirect(message, db);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'setup embed')) {
      redirect = require('./embedColor.js');
      redirect(message, db);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'setup clean')) {
      redirect = require('./cleanFilter.js');
      redirect(message, db);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'setup lvlchannel')) {
      redirect = require('./levelChannel.js');
      redirect(message, db);
    }
    if (message.content.toLowerCase().startsWith(prefix + 'setup lvlrole')) {
      redirect = require('./levelRoles.js');
      redirect(message, db);
    }
  }

  function isAdmin() {
    let args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    if (!args[1]) {
      embed.setTitle('Billybobbeep | Setup Command')
      embed.setDescription(
        'The billybobbeep setup command is used to set billy up in a new server.\n\n' +
        `Commands:\n` +
        `${prefix}setup muted [role]\n` +
        `*Sets up the muted role to use mute commands.*\n` +
        `${prefix}setup logging [channel]\n` +
        `*Sets up a logging channel.*\n` +
        `${prefix}setup level [channel]\n` +
        `*Set up a channel for level ups to dosplay in*\n` +
        `*Do not set up for level ups to display in channel the message was sent in.*\n` +
        `${prefix}prefix [new prefix]\n` +
        `*Changes the default prefix for the server.*\n` +
        `${prefix}setup embed [color]\n*Changes the default embed color*\n` +
        `${prefix}setup clean [on/off]\n*Ensures anything billy says is clean*\n` +
        `${prefix}setup lvlChannel [channel]\n*Sets up a levelling output channel*\n\n` +

        `To see more information on these commnds use the command:\n\`${prefix}setup [command] help\``
      )
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        .setTimestamp()
      embed.setFooter(`Requested by: ${message.author.tag}`);
      message.channel.send(embed)
    } else {
      commands()
    }
  }

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    nonAdmin()
  } else {
    isAdmin()
  }
}
