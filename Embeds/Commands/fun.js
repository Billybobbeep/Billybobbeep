const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const db = require('../../data/databaseManager/index.js');
module.exports = async(message, prefix) => {
  const PageOne = new Discord.MessageEmbed()
  .setTitle('Billybobbeep | General Commands')
  .setDescription(
      `${prefix}members\n` +
      '*Quickly find how many members are in your server.*\n\n' +
      `${prefix}spoink\n` +
      '*Well I guess you will just have to use it and find out. 👁👄👁*\n\n' +
      `${prefix}wibbleywobbley\n` +
      '*It\'s 15 inches long. :woman_fairy::sparkles::bouquet:*\n\n' +
      `${prefix}ping\n` +
      '*Gives you the reaction/delay time between the bot and the server.*\n\n' +
      `${prefix}userinfo\n` +
      '*Provides info about a user in the server.*\n\n' +
      `${prefix}rolldice\n` +
      '*Rolls a dice and gives you the number.*')
  .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  .setFooter('TIP: Press the arrows to switch pages')

  const PageTwo = new Discord.MessageEmbed()
  .setTitle('Billybobbeep | Economy Commands')
  .setDescription(
    `${prefix}daily\n` +
    '*Collect your daily bonus.*\n\n' +
    `${prefix}work\n` +
    '*Go to work to earn money.*\n\n' +
    `${prefix}jobs\n` +
    '*View the list of available jobs.*\n\n' +
    `${prefix}apply [job name]\n` +
    '*Apply for a job.*\n' +
    `${prefix}donate [user] [ammount]\n` +
    'Donate money to another user.\n' +
    `${prefix}balance [user]\n` +
    'View a users balance.\n' +
    `${prefix}resetstats\n` +
    'Reset a users stats.\n' +
    `${prefix}quit\n` +
    'Quit your current job.\n')
  .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  .setFooter('TIP: Press the arrows to switch pages')

  const PageThree = new Discord.MessageEmbed()
  .setTitle('Billybobbeep | Message Commands')
  .setDescription(
    `${prefix}say [message]\n` +
    '*Repeats what you just said.*\n\n' +
    `${prefix}announce\n` +
    '*Provides you with options to announce a message in another channel.*\n\n' +
    `${prefix}secret\n` +
    '*Repeats what you say in a secret message format.*')
  .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  .setFooter('TIP: Press the arrows to switch pages')

  const PageFour = new Discord.MessageEmbed()
  .setTitle('Billybobbeep | Generator Commands')
  .setDescription(
    `${prefix}font\n` +
    '*Gives you a list of fonts you can turn your message into.*\n\n' +
    `${prefix}image\n` +
    '*Generates a random image.*\n\n' +
    `${prefix}generate key\n` +
    '*Request a key for the billybobbeep API services.*\n\n' +
    `${prefix}regenerate key\n` +
    '*Request a new API key.*')
  .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  .setFooter('TIP: Press the arrows to switch pages')

  let msg = await message.channel.send(PageOne)
  
  await msg.react('◀')
  await msg.react('▶')

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
        if (msg.embeds[0].title === PageOne.title) {
          msg.edit(PageTwo);
          reaction.users.remove(message.author.id);
        } else if (msg.embeds[0].title === PageTwo.title) {
          msg.edit(PageThree);
          reaction.users.remove(message.author.id);
        } else if (msg.embeds[0].title === PageThree.title) {
          msg.edit(PageFour);
          reaction.users.remove(message.author.id);
        }
        wait()
      } else {
        if (msg.embeds[0].title === PageTwo.title) {
          msg.edit(PageOne);
          reaction.users.remove(message.author.id);
        } else if (msg.embeds[0].title === PageThree.title) {
          msg.edit(PageTwo);
          reaction.users.remove(message.author.id);
        } else if (msg.embeds[0].title === PageFour.title) {
          msg.edit(PageThree);
          reaction.users.remove(message.author.id);
        }
        wait()
      }
    }).catch((collected) => {
      msg.reactions.removeAll()
    });
  }
  function wait() {
    reactions()
  }
  reactions()
}