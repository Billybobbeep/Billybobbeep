const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
        if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to run this command.")
        if (isNaN(args[0])) return message.channel.send("You have entered an invalid number.")
        if (args[0] > 100) return message.channel.send("Please enter a number below 100.")
        if (args[0] < 2) return message.channel.send("Please enter a number more than 1.")
        
        message.delete()
        message.channel.bulkDelete(args[0])
        .then(messages => 
            message.channel.send(`Deleted ${messages.size}/${args[0]} messages.`))
        .then(d => 
            d.delete({timeout: 3000}))
        .catch(() => message.channel.send("Something went wrong, please ensure the messages are not over 2 weeks old."));

      let LoggingChannel = client.channels.cache.get(db.get(message.guild.id + '.loggingChannel'));

let pinned;
if (message.pinned) {
    pinned = true
} else {
    pinned = false
}

        const embed = new Discord.MessageEmbed()
        .setTitle(`Purged Messages`)
        .setDescription(`**Channel:** ${message.channel}
                        **Messages Purged:** ${args[0]}\n
                        **Moderator:** ${message.author}
                        **Moderator Tag:** ${message.author.tag}
                        **Moderator ID:** ${message.author.id}\n
                        **Command:** true
                        **Pinned:** ${pinned}`)
        .setTimestamp()
        .setColor("#a9d9b7")
        if (LoggingChannel) {
          try {
            LoggingChannel.send(embed)
          } catch {
            console.log(`${message.guild.name} has an invalid logging channel ID`)
          }
        }
    }