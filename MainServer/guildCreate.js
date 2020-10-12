const { MessageEmbed } = require('discord.js')
const db = require('quick.db');
module.exports = async (client) => {
  client.on("guildCreate", guild => {
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
    const embed = new MessageEmbed()
    embed.setTitle('Billybobbeep | Welcome')
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
    embed.setTimestamp()
    embed.setDescription(`Thank you for adding me to your server.\n\nThe default prefix is \`~\`, You can change the prefix with the command \`~prefix\`\n\nTo view the commands view \`~cmds\` and to customise the botfor your needs feel free to check out \`~setup\``)
    channel.send(embed);
  });
}