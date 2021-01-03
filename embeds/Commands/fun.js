const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const fs = require('fs');
const guildData = require('../../events/client/database/models/guilds');

module.exports = async(message, prefix) => {
  guildData.findOne({ guildId: message.guild.id }).then(result => {
    const PageOne = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | General Commands')
    .setFooter('TIP: Press the arrows to switch pages')
    message.guild ? PageOne.setColor(result.embedColor) : PageOne.setColor('#447ba1');

    const commandFolders = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));
    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.usage && command.catagory && command.catagory === 'general') {
          PageOne.addField(
            `${prefix}${command.name}`,
            `${command.description}\n` +
            `Usage: ${prefix}${command.usage}`,
            true
          );
        } else if (command.catagory && command.catagory === 'general') {
          PageOne.addField(
            `${prefix}${command.name}`,
            `${command.description}`,
            false
          );
        }
      }
    }

    const PageTwo = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Economy Commands')
    .setFooter('TIP: Press the arrows to switch pages')
    message.guild ? PageTwo.setColor(result.embedColor) : PageTwo.setColor('#447ba1');

    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.usage && command.catagory && command.catagory === 'economy') {
          if (command.name.toLowerCase() === 'withdraw' || command.name.toLowerCase() === 'apply') {
            PageTwo.addField(
              `${prefix}${command.name}`,
              `${command.description}\n` +
              `Usage: ${prefix}${command.usage}`,
              false
            );
          } else {
            PageTwo.addField(
              `${prefix}${command.name}`,
              `${command.description}\n` +
              `Usage: ${prefix}${command.usage}`,
              true
            );
          }
        } else if (command.catagory && command.catagory === 'economy') {
          PageTwo.addField(
            `${prefix}${command.name}`,
            `${command.description}`,
            false
          );
        }
      }
    }

    const PageThree = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Other Commands')
    .setFooter('TIP: Press the arrows to switch pages')
    message.guild ? PageThree.setColor(result.embedColor) : PageThree.setColor('#447ba1');

    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.usage && command.catagory && command.catagory === 'other') {
          PageThree.addField(
            `${prefix}${command.name}`,
            `${command.description}\n` +
            `Usage: ${prefix}${command.usage}`,
            true
          );
        } else if (command.catagory && command.catagory === 'other') {
          PageThree.addField(
            `${prefix}${command.name}`,
            `${command.description}`,
            false
          );
        } else if (command.catagory && command.catagory === 'none' && command.usage) {
          PageThree.addField(
            `${prefix}${command.name}`,
            `${command.description}\n` +
            `Usage: ${prefix}${command.usage}`,
            false
          );
        } else if (command.catagory && command.catagory === 'none') {
          PageThree.addField(
            `${prefix}${command.name}`,
            `${command.description}`,
            false
          );
        }
      }
  }

    const PageFour = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Generator Commands')
    .setFooter('TIP: Press the arrows to switch pages')
    message.guild ? PageFour.setColor(result.embedColor) : PageFour.setColor('#447ba1');

    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.usage && command.catagory && command.catagory === 'generator') {
          if (command.name.toLowerCase() === 'say') {
            PageFour.addField(
              `${prefix}${command.name}`,
              `${command.description}\n` +
              `Usage: ${prefix}${command.usage}`,
              false
            );
          } else {
            PageFour.addField(
                    `${prefix}${command.name}`,
                    `${command.description}\n` +
                    `Usage: ${prefix}${command.usage}`,
                    true
            );
          }
        } else if (command.catagory && command.catagory === 'generator') {
          PageFour.addField(
                  `${prefix}${command.name}`,
                  `${command.description}`,
                  false
          );
        }
      }
    }

    const PageFive = new Discord.MessageEmbed()
    .setTitle('Billybobbeep | Information Commands')
    .setFooter('TIP: Press the arrows to switch pages')
    message.guild ? PageFive.setColor(result.embedColor) : PageFive.setColor('#447ba1');

    for (const folder of commandFolders) {
      const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command.usage && command.catagory && command.catagory === 'info') {
          if (command.name.toLowerCase() === 'avatar') {
            PageFive.addField(
              `${prefix}${command.name}`,
              `${command.description}\n` +
              `Usage: ${prefix}${command.usage}`,
              false
            );
          } else {
            PageFive.addField(
              `${prefix}${command.name}`,
              `${command.description}\n` +
              `Usage: ${prefix}${command.usage}`,
              true
            );
          }
        } else if (command.catagory && command.catagory === 'info') {
          PageFive.addField(
            `${prefix}${command.name}`,
            `${command.description}`,
            false
          );
        }
      }
    }

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
          } else if (msg.embeds[0].title === PageFour.title) {
            msg.edit(PageFive);
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
          } else if (msg.embeds[0].title === PageFive.title) {
            msg.edit(PageFour);
            reaction.users.remove(message.author.id);
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
    reactions()
  });
}