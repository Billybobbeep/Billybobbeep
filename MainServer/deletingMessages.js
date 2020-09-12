const configFile = require('../config.json')

module.exports = async(message) => {
    if(message.author.bot) return;

        if (message.channel.id === configFile.RolesChannel) {
            if (message.author.id === "697194959119319130") return;
            if (!message.author.bot) {
                message.delete();
                message.author.send(`You cannot talk in <#${configFile.RolesChannel}>.`)
            }
        }

    if (message.channel.id === configFile.WelcomeChannel) {
        if (!message.author.bot) {
            message.delete();
            message.author.send(`You cannot talk in <#${configFile.WelcomeChannel}>.`)
        }
    }

    if (message.channel.id === configFile.RulesChannel) {
        if (message.author.id === configFile.SpoinkID || message.author.id === configFile.WibWobID) return;
        if (!message.author.bot) {
            message.delete();
            message.author.send(`You cannot talk in <#${configFile.RulesChannel}>.`)
        }
    }
}