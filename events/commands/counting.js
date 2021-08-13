module.exports = {
    guildOnly: true,
    /**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute (message, client) {
        const guildData = require('../client/database/models/guilds');
        guildData.findOne({ guildId: message.guild.id }).then(result => {
            if (!result) return;
            let TE = client.emojis.cache.get('736952966447366154');
            let CE = client.emojis.cache.get('736952985330122772');
            if (!result.preferences.countingChannel) return;
            if (message.channel.id !== result.preferences.countingChannel) return;
            if (message.author.bot) return;
            if (isNaN(message.content)) return;
            if (!result.counting_number) {
                result.counting_number = 0;
                result.save().then(() => {
                    let curr = 0;
                    if (message.content.toString() === (curr + 1).toString()) {
                        result.counting_number = result.counting_number ? result.counting_number + 1 : 1;
                        result.save().then(() => {
                            message.react(TE);
                        });
                    } else {
                        result.counting_number = 0;
                        result.save().then(() => {
                            message.react(CE);
                            message.channel.send(`<@!${message.author ? message.author.id : message.member.user.id}>, has ruined the chain with an incorrect number.\nThe next number is \`1\``);
                        });
                    }
                });
            } else {
                let curr = result.counting_number;
                if (message.content.toString() === (curr + 1).toString()) {
                    result.counting_number = result.counting_number ? result.counting_number + 1 : 1;
                    result.save().then(() => {
                        message.react(TE);
                    });
                } else {
                    result.counting_number = 0;
                    result.save().then(() => {
                        message.react(CE);
                        message.channel.send(`<@!${message.author ? message.author.id : message.member.user.id}>, has ruined the chain with an incorrect number.\nThe next number is \`1\``);
                    });
                }
            }
        });
    }
}