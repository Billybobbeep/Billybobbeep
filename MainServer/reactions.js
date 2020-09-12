const configFile = require('../config.json')

module.exports = async(message) => {
    //Reacts to any messages sent in the poll channel
    if (message.channel.id === configFile.PollChannel) {
        message.react("☁");
        message.react("🥥");
    }
    //reacts to any messages in the theory channel
    if (message.channel.id === configFile.MemesChannel) {
        message.react("☁");
        message.react("🦋");
    }
    if (message.channel.id === configFile.JokesChannel) {
            let reactionc = [`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`]
            let reaction = reactionc[Math.floor(Math.random() * reactionc.length)]
           if (reaction === `1`) {
               message.react("🍃")
               message.react("🕊")
            }
            if (reaction === `2`) {
                message.react("👁")
                message.react("🦋")
                message.react("👁")
            }
            if (reaction === `3`) {
                message.react("🍁")
                message.react("🌙")
            }
            if (reaction === `4`) {
                message.react("🍁")
                message.react("☀")
            }
            if (reaction === `5`) {
                message.react("🍃")
                message.react("☀")
            }
            if (reaction === `6`) {
                message.react("💙")
                message.react("🦋")
            }
            if (reaction === `7`) {
                message.react("🐝")
                message.react("🌻")
            }
            if (reaction === `8`) {
                message.react("🧸")
                message.react("🐚")
            }
            if (reaction === `9`) {
                message.react("🥑")
                message.react("☁")
                message.react("🌻")
            }
            if (reaction === `10`) {
                let reactionc1 = [`1`, `2`, `3`]
                let reaction1 = reactionc1[Math.floor(Math.random() * reactionc1.length)]
                if (reaction1 === `1`) {
                    message.react("✨")
                    message.react("🌵")
                }
                if (reaction1 === `2`) {
                    message.react("🐝")
                    message.react("🍌")
                    message.react("✨")
                }
                if (reaction3 === `3`) {
                    message.react("🌻")
                    message.react("⭐")
                    message.react("🍯")
                }
            }
    }
}