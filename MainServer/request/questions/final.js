const Discord = require(`discord.js`);
const configFile = require('../../../config.json');
const Spoink = configFile.SpoinkID

const confirmEmbed = new Discord.MessageEmbed()
.setTitle("Billybobbeep | Final Response")
.setDescription(`**Subject:** ${Subject}\n **Question:** ${Description}\n **Prefered Name:** ${AuthorPre}`)
.setTimestamp()
.setFooter(`Please say \"send\" to continue or \"cancel\" to cancel the prompt.`)
.setColor([220, 232, 125])

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
        m.edit(confirmEmbed)
        q1.stop();
    })
}