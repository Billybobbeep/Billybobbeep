const Discord = require(`discord.js`);
const configFile = require('../../../config.json');
const Spoink = configFile.SpoinkID

module.exports = async(m, Subject, Description, AuthorName, AuthorId, AuthorPre, guildName, qembed2, qembed3, message, embed3) => {
        let filter = m => m.author.id === message.author.id;
        let q1 = new Discord.MessageCollector(message.channel, filter, {
            max: 1
        })
        let q2 = new Discord.MessageCollector(message.channel, filter, {
            max: 1
        })
    q1.on('collect', async (message, col) => {
        let msg = message.content.toLowerCase();
        if (msg.content === "cancel") {
            return message.channel.send("Cancelled question prompt.")
        } else {
            Description = msg.content
            return Description
        }
        message.delete()
        m.edit(qembed3)
        const commandFile = require(`./q3.js`);
        commandFile(m, Subject, Description, AuthorName, AuthorId, AuthorPre, guildName, qembed2, qembed3, message, embed3)
        q1.stop();
    })
}