const Discord = require(`discord.js`);
const configFile = require('../../config.json');
const db = require('quick.db');
module.exports = async(msg, args, prefix, message) => {
  const PageOne = new Discord.MessageEmbed()
  .setTitle("Billybobbeep | Fun Commands")
  .setDescription(
      `${prefix}say [message]\n` +
      "*Repeats what you said.*\n" +
      `${prefix}members\n` +
      "*Quickly find how many members are in your server.*\n" +
      `${prefix}announce\n` +
      "*Gives you options to announce a message in another channel.*\n" +
      `${prefix}spoink\n` +
      "*Well I guess you will just have to use it and find out. 👁👄👁*\n" +
      `${prefix}wibbleywobbley\n` +
      "*It\'s 15 inches long. :woman_fairy::sparkles::bouquet:*\n" +
      `${prefix}ping\n` +
      "*Gives you the reaction/delay time between the bot and the server.*\n" +
      `${prefix}userinfo\n` +
      "*Provides info about a user in the server.*\n" +
      `${prefix}secret\n` +
      "*Repeats what you say in a secret message format.*\n" +
      `${prefix}rolldice\n` +
      "*Rolls a dice and gives you the number.*\n" +
      `${prefix}font\n` +
      "*Gives you a list of fonts you can turn your message into*\n" +
      `${prefix}image\n` +
      "*Generates a random image.*\n\n" +
      "TIP: Press the arrows to switch pages")
  .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  .setFooter(`Requested by: ${message.author.tag}`)
  .setTimestamp()

  const PageTwo = new Discord.MessageEmbed()
  .setTitle("Billybobbeep | Fun Commands")
  .setDescription(
      "TIP: Press the arrows to switch pages")
  .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
  .setFooter(`Requested by: ${message.author.tag}`)
  .setTimestamp()

  let mainMessage = await message.channel.send(PageOne)
  
  await mainMessage.react('◀')
  await mainMessage.react('▶')

  function reactions() {
    const filter = (reaction, user) => {
      return (
      ['▶', '◀'].includes(reaction.emoji.name) && user.id === message.author.id
      );
    }

    mainMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === '▶') {
        mainMessage.edit(PageTwo);
        reaction.users.remove(message.author.id)
        wait()
      } else {
        mainMessage.edit(PageOne);
        reaction.users.remove(message.author.id)
        wait()
      }
    }).catch((collected) => {
      mainMessage.reactons.remove()
    });
  }
  function wait() {
    reactions()
  }
  reactions()
}