const Discord = require("discord.js");
const guildData = require("../../events/client/database/models/guilds.js");
const logging = require("../../utils/functions").logging;

module.exports = {
    name: "announce",
    description: "Announce a message in a different channel",
    guildOnly: true,
    catagory: "moderation",
    usage: "announce",
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute (message, _prefix, client) {
        if (!message.guild) return;
        guildData.findOne({ guildId: message.guild.id }).then(result => {
            const embed = new Discord.MessageEmbed()
            embed.setTitle(`Announcement Sent`)
            embed.setTimestamp()
            embed.setColor(result.preferences ? result.preferences.embedColor : "#447ba1")
            let filter = m => m.author.id === message.author.id;
            let q1 = new Discord.MessageCollector(message.channel, filter, {
                max: 1
            })
            message.channel.send({ content: "What channel would you like to share your announcement in?" });

            q1.on("collect", async (message, col) => {
                let channel = message.mentions.channels.first();
                if (!channel) return message.channel.send("I cannot find the channel you have provided")
                message.channel.send("What is the message you would like to annouce?")
                q1.stop();
                let q2 = new Discord.MessageCollector(message.channel, filter, {
                    max: 1
                });
                q2.on("collect", async (message, col) => {
                    channel.send({ content: message.content });
                    await message.react("✔");
                    embed.setDescription(
                        `**Message:** ${message.content}\n` +
                        `**Message ID:** ${message.id}\n` +
                        `**Channel:** ${channel}\n\n` +
                        `**Moderator:** ${message.author}\n` +
                        `**Moderator Tag:** ${message.author.tag}\n` +
                        `**Moderator ID:** ${message.author.id}\n`
                    )
                    logging(embed, message, client);
                    q2.stop();
                });
            });
        });
    }
}