const { MessageEmbed } = require('discord.js')
const db = require('../data/databaseManager/index.js');
const configFile = require('../config.json')
const embed = new MessageEmbed()

module.exports = async (client) => {
  
    client.on("guildCreate", async guild => {
      setTimeout(async function() {
        let channelID;
        let channels = guild.channels.cache;

        channelLoop:
        for (let key in channels) {
            let c = channels[key];
            if (c[1].type === "text") {
                channelID = c[0];
                break channelLoop;
            }
        }

        let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
        embed.setTitle('Billybobbeep | Welcome')
        embed.setColor(`${db.get(guild.id + '.embedColor') || '#447ba1'}`)
        embed.setTimestamp()
        embed.setDescription(`Thank you for adding me to your server.\n\nThe default prefix is \`~\`, You can change the prefix with the command \`~prefix\`\n\nTo view the commands view \`~cmds\` and to customise the bot for your server feel free to check out \`~setup\``)
        await channel.send(embed);
      }, 5000);

      var role;
        guild.roles.create({
          data: {
              name: 'Billy 🤩',
              color: '#e5f7b2',
              permissions: 8
          }
        }).then(role => {
          guild.member(client.user).roles.add(role);
          role.setHoist(true);
          const highestRole = guild.me.roles.highest;
          role.setPosition(highestRole.position - 1);
        }).catch(console.error);


    embed.setTitle('Guild Added')
    embed.setDescription(
      `**Guild Name:** ${guild.name}\n` +
      `**Guild ID:** ${guild.id}`)
    embed.setColor('#447ba1')
    embed.setTimestamp()
    embed.setThumbnail(guild.iconURL({ dynamic: true }))
    let LoggingChannel = client.channels.cache.get(db.get(configFile.ServerId + '.loggingChannel'));
    //LoggingChannel.send(embed)
  });

  client.on("guildDelete", guild => {
    if (db.get(guild.id)) {
      db.delete(guild.id);
    }
                
    const embed2 = new MessageEmbed()
    .setTitle('Guild Removed')
    .setDescription(
      `**Guild Name:** ${guild.name}\n` +
      `**Guild ID:** ${guild.id}`)
    .setColor('#447ba1')
    .setTimestamp()
    .setThumbnail(guild.iconURL({ dynamic: true }))
    let LoggingChannel = client.channels.cache.get(db.get(configFile.ServerId + '.loggingChannel'));
    //LoggingChannel.send(embed2)
  });
}