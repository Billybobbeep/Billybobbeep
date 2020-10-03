const Discord = require(`discord.js`);
const configFile = require('../../config.json');

module.exports = async(msg, args, prefix, message) => {
        const commandEmbed = new Discord.MessageEmbed()
        .setTitle("Billybobbeep | Fun Commands")
        .setDescription(
            `${prefix}say <message>\n` +
            "*Repeats what you said.*\n" +
            `${prefix}members\n` +
            "*Quickly find how many members are in your server.*\n" +
            `${prefix}announce\n` +
            "*Gives you options to announce a message in another channel.*\n" +
            `${prefix}spoink\n` +
            "*Well I guess you will just have to use it and find out. 👁👄👁*\n" +
            `${prefix}wibbleywobbley\n` +
            "*It\'s 15 inches long. :woman_fairy::sparkles::bouquet:*\n" +
            `${prefix}ping\n` +
            "*Gives you the reaction/delay time between the bot and the server.*\n" +
            `${prefix}userinfo\n` +
            "*Provides info about a user in the server.*\n" +
            `${prefix}secret\n` +
            "*Repeats what you say in a secret message format.*\n" +
            `${prefix}rolldice\n` +
            "*Rolls a dice and gives you the number.*\n" +
            `${prefix}font\n` +
            "*Gives you a list of fonts you can turn your message into*"
            `${prefix}image\n` +
            "*Generates a random image.*\n")
        .setColor([177, 210, 240])
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.channel.send(commandEmbed)
}