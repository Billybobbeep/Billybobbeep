module.exports = {
  name: 'setup',
  description: 'Setup billybobbeep in your own server.',
  guildOnly: true,
  execute (message, prefix, client) {
    const { MessageEmbed } = require('discord.js');
    const db = require('../../structure/global.js').db;
    const embed = new MessageEmbed();
    var msg;

    function nonAdmin() {
      embed.setTitle('Billybobbeep | Setup Command')
      embed.setDescription(
        'The billybobbeep setup command is used to set billy up in a new server.\nRequires the `Administrator` premissions.\n\n' +
        `Commands:\n` +
        `${prefix}setup muted [role]\n` +
        `*Sets up the muted role to use mute commands.*\n` +
        `${prefix}setup mod [role]\n` +
        `*Sets up a moderators role for moderators to use moderator commands.*\n` +
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
      let args = message.content.slice(prefix.length).trim().split(/ +/g);
      if (message.content.toLowerCase().startsWith(prefix + 'setup logging')) {
        redirect = require('./loggingChannel.js');
        redirect(message, db);
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup muted')) {
        redirect = require('./mutedRole.js');
        redirect(message, db);
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup mod')) {
        redirect = require('./modRole.js');
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
      if (message.content.toLowerCase().startsWith(prefix + 'setup welcomechannel')) {
        redirect = require('./welcomeChannel.js');
        redirect(message, db);
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup auto')) {
        redirect = require('./autoRole.js');
        redirect(message, db);
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup lvls') || message.content.toLowerCase().startsWith(prefix + 'setup levels')) {
        redirect = require('./lvlEn.js');
        redirect(message, db);
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup prefix')) {
        redirect = require('./prefix.js')
        redirect(message, db, prefix, args)
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup serverstats') || args[1].toLowerCase() === 'ss') {
        redirect = require('./serverStats.js')
        redirect(message, db, prefix, args)
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup serverstatstext') || args[1].toLowerCase() === 'sst') {
        redirect = require('./serverStatsText.js')
        redirect(message, db, prefix, args)
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup talk')) {
        redirect = require('./talk2billy.js');
        redirect(message, db);
      }
      if (message.content.toLowerCase().startsWith(prefix + 'setup economy')) {
        redirect = require('./economy.js');
        redirect(message, db);
      }
    }

    async function isAdmin() {
      let args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      if (!args[1]) {
        embed.setTitle('Billybobbeep | Setup Command')
        embed.setDescription(
          'The billybobbeep setup command is used to set billy up in a new server.\n\n' +
          `To see all of the setup commands, please see the next few pages.\n\n` +
          `To see more information on any setup commnd use the command:\n\`${prefix}setup [command] help\``
        )
        embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        embed.setFooter(`TIP: Press the arrows to move between pages.`);
        msg = await message.channel.send(embed)
        await msg.react('◀');
        await msg.react('▶');
        reactions()
      } else {
        commands()
      }
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      nonAdmin()
    } else {
      isAdmin()
    }

    function reactions() {
      const filter = (reaction, user) => {
        return (
          ['▶', '◀'].includes(reaction.emoji.name) && user.id === message.author.id
        );
      }

      msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        .then((collected) => {
          const reaction = collected.first();

          if (reaction.emoji.name === '▶') {

            if (msg.embeds[0].title === 'Billybobbeep | Setup Command') {
              PageOne()
              reaction.users.remove(message.author.id)
            }
            if (msg.embeds[0].title === 'Setup | Page One') {
              PageTwo()
              reaction.users.remove(message.author.id)
            }
            if (msg.embeds[0].title === 'Setup | Page Two') {
              PageThree()
              reaction.users.remove(message.author.id)
            }
            if (msg.embeds[0].title === 'Setup | Page Three') {
              PageFour()
              reaction.users.remove(message.author.id)
            }
            wait()
          } else if (reaction.emoji.name === '◀') {

            if (msg.embeds[0].title === 'Setup | Page Two') {
              PageOne()
              reaction.users.remove(message.author.id)
            }
            if (msg.embeds[0].title === 'Setup | Page Three') {
              PageTwo()
              reaction.users.remove(message.author.id)
            }
            if (msg.embeds[0].title === 'Setup | Page Four') {
              PageThree()
              reaction.users.remove(message.author.id)
            }
            wait()
          }
        }).catch(() => {
          msg.reactions.removeAll()
        });
    }
    function wait() {
      reactions()
    }

    //Embeds
    function PageOne() {
      embed.setTitle('Setup | Page One')
      embed.setDescription(
        `${prefix}setup clean\n` + "Prevent Billy sending explicit content.\n\n" +
        `${prefix}setup embed\n` + "Changes the default color of the embeds.\n\n" +
        `${prefix}setup logging\n` + "Setup a logging channel.\n\n" +
        `${prefix}setup muted\n` + "Set up a muted role.\n\n" +
        `${prefix}setup mod [role]\n` + `Set up a moderators role for moderators to use moderator commands.\n\n` +
        `${prefix}setup prefix\n` + "Change the default prefix.")
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed.setFooter(`TIP: Press the arrows to move between pages.`);
      msg.edit(embed)
    }

    function PageTwo() {
      embed.setTitle('Setup | Page Two')
      embed.setDescription(
        `${prefix}setup lvlChannel\n` + "Set up a levelling channel.\n\n" +
        `${prefix}setup lvlRole\n` + "Sets up a level roles.\n\n" +
        `${prefix}setup welcomeChannel\n` + "Set up a channel to welcome new members & log members leaving.\n\n" +
        `${prefix}setup auto\n` + "Set up a auto role.\n\n" +
        `${prefix}setup talk\n` + "Set up a talk to billy channel.")
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed.setFooter(`TIP: Press the arrows to move between pages.`);
      msg.edit(embed)
    }

    function PageThree() {
      embed.setTitle('Setup | Page Three')
      embed.setDescription(
        `${prefix}setup levels\n` + "Turn levelling on or off.\n\n" +
        `${prefix}setup economy\n` + "Turn economic commands on or off.\n\n")
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed.setFooter(`TIP: Press the arrows to move between pages.`);
      msg.edit(embed)
    }

    function PageFour() {
      embed.setTitle('Setup | Page Four')
      embed.setDescription(
        `${prefix}setup serverstats\n` + "Set up a server stats channel.\n\n" +
        `${prefix}setup serverstatstext\n` + "Change the text for the server stats channel.\n\n")
      embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
      embed.setFooter(`TIP: Press the arrows to move between pages.`);
      msg.edit(embed)
    }
  }
}