module.exports = async(client, message, Discord) => {

if (message.author.id === '731498842813366304') return;
const configFile = require('../config.json')
let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);

  const embed = new Discord.MessageEmbed()
                  .setTitle(`DM Recieved`)
                  .setDescription(`
                          **Content:** ${message}
                          **Message ID:** ${message.id}\n
                          **Author:** ${message.author}
                          **Author Tag:** ${message.author.tag}
                          **Author ID:** ${message.author.id}`)
                  .setTimestamp()
                  .setColor('#dbbf70')

  if (message.channel.type === 'dm') {
      LoggingChannel.send(embed)
      return;
    }
}