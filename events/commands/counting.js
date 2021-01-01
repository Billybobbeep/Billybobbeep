module.exports = {
    guildOnly: true,
    execute (message, client) {
        const guildData = require('../client/database/models/guilds');
        guildData.findOne({ guildId: message.guild.id }).then(result => {
            let TE = client.emojis.cache.get('736952966447366154')
            let CE = client.emojis.cache.get('736952985330122772')
            if (!result.countingChannel) return;
            if (message.channel.id !== result.countingChannel) return;
            if (message.author.bot) return;
            if (isNaN(message.content)) return;
            if (!result.counting_number) {
                guildData.findOneAndUpdate({ guildId: message.guild.id }, { counting_number: 0 }).then(() => {
                    let curr = 0;
                    if (message.content.toString() === (curr + 1).toString()) {
                        guildData.findOneAndUpdate({ guildId: message.guild.id }, { $inc: { counting_number: 1 }}).then(() => {
                            message.react(TE);
                        });
                    } else {
                        guildData.findOneAndUpdate({ guildId: message.guild.id }, { counting_number: 0 }).then(() => {
                            message.react(CE);
                            message.reply('has ruined the chain with an incorrect number.\nThe next number is `1`');
                        });
                    }
                });
            } else {
                let curr = result.counting_number;
                if (message.content.toString() === (curr + 1).toString()) {
                    guildData.findOneAndUpdate({ guildId: message.guild.id }, { $inc: { counting_number: 1 }}).then(() => {
                        message.react(TE);
                    });
                } else {
                    guildData.findOneAndUpdate({ guildId: message.guild.id }, { counting_number: 0 }).then(() => {
                        message.react(CE);
                        message.reply('has ruined the chain with an incorrect number.\nThe next number is `1`');
                    });
                }
            }
        });
    }
}