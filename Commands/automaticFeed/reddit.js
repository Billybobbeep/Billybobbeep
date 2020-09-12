const { MessageEmbed } = require('discord.js');
const randomPuppy = require('random-puppy');
const configFile = require('../../config.json')

module.exports = async (randomColor, client, jokesChannel1) => {
  const subReddits = ["meme", "memes", "puppy", "dog", "cute", "aww", "awh", "lol", "cleanfunny", "clean", "cleanmemes"]
  const random = subReddits[Math.floor(Math.random() * subReddits.length)];
  const img = await randomPuppy(random)

  const embed = new MessageEmbed()
  .setColor(randomColor)
  .setImage(img)
  jokesChannel1.send(embed);
}
