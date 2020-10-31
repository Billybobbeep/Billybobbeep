const configFile = require('../structure/config.json')

module.exports = async (message) => {
  //Reacts to any messages sent in the poll channel
  if (message.channel.id === configFile.PollChannel) {
    message.react("☁");
    message.react("🥥");
  }
  //reacts to any messages in the theory channel
  if (message.channel.id === configFile.MemesChannel) {
    message.react("☁");
    message.react("🦋");
  }
}