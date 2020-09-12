const Discord = require(`discord.js`);
const configFile = require('../../../config.json');
const Spoink = configFile.SpoinkID

//Varibles when sent to me
let Subject;
let Description;
let AuthorName;
let AuthorId;
let AuthorPre;
let guildName;

module.exports = async(client, msg, args, prefix, message) => {

//Embeds
const embed1 = new Discord.MessageEmbed()
.setTitle("Billybobbeep | Questions")
.setDescription("Hello! I will now ask a few questions to sum up what catagory your question is in.\n After you have answered a few questions I will imput your answers into an easier to read formatting.\n You will then be asked to read over your report before sending it.")
.setTimestamp()
.setFooter("Please say \"continue\" to continue or \"cancel\" to cancel the prompt.")
.setColor([220, 232, 125])

const embed2 = new Discord.MessageEmbed()
.setTitle("Billybobbeep | Final Response")
.setDescription(`**Subject:** ${Subject}\n **Question:** ${Description}\n **Prefered Name:** ${AuthorPre}`)
.setTimestamp()
.setFooter(`Please say \"send\" to continue or \"cancel\" to cancel the prompt.`)
.setColor([220, 232, 125])

const embed3 = new Discord.MessageEmbed()
.setTitle(Subject)
.setDescription(`${Description}\n **Prefered Name:** ${AuthorPre}`)
.setTimestamp()
.setFooter(`Sent by: ${AuthorName}`)
.setColor([220, 232, 125])

const embed4 = new Discord.MessageEmbed()
.setTitle("Author:")
.setDescription(`**ID:** ${AuthorId}\n **Name:** ${AuthorName}\n **Prefered Name:** ${AuthorPre}\n **Server Name:** `)
.setTimestamp()
.setFooter(`Please say \"send\" to continue or \"cancel\" to cancel the prompt.`)
.setColor([220, 232, 125])

//Question Embeds
const qembed1 = new Discord.MessageEmbed()
.setTitle("Billybobbeep | Submit a question")
.setDescription(`What is the subject of your question?`)
.setFooter(`${message.author.tag}`)
.setColor([220, 232, 125])

const qembed2 = new Discord.MessageEmbed()
.setTitle("Billybobbeep | Submit a question")
.setDescription(`What is your question?`)
.setFooter(`${message.author.tag}`)
.setColor([220, 232, 125])

const qembed3 = new Discord.MessageEmbed()
.setTitle("Billybobbeep | Submit a question")
.setDescription(`What is your prefered name?`)
.setFooter(`${message.author.tag}`)
.setColor([220, 232, 125])

        let filter = m => m.author.id === message.author.id;
        let q1 = new Discord.MessageCollector(message.channel, filter, {
            max: 1
        })
        let q2 = new Discord.MessageCollector(message.channel, filter, {
            max: 1
        })
        let m = await message.channel.send(embed1);
    q1.on('collect', async (message, col) => {
        if (!msg.content === "continue" || !msg.content === "cancel") { 
            return message.channel.send("Invalid response, please run the command again.");
        }
        if (msg.content === "cancel") {
            return message.channel.send("Cancelled question prompt.")
        }
        AuthorId = message.author.id
        AuthorName = message.author.tag
        message.delete()
        m.edit(qembed1)
        const commandFile = require(`./q1.js`);
        commandFile(m, Subject, Description, AuthorName, AuthorId, AuthorPre, guildName, qembed2, qembed3, message, embed3)
        q1.stop();
    })
}