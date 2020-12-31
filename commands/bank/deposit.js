module.exports = {
    name: 'deposit',
    description: 'Deposit some money into your bank account',
    alias: ['dep'],
    catagory: 'economy',
    usage: 'deposit [amount]',
    guildOnly: true,
    execute (message, prefix, client) {
        const userData = require('../../events/client/database/models/users');
        const guildData = require('../../events/client/database/models/guilds');

        guildData.findOne({ guildId: message.guild.id }).then(guildResult => {
            userData.findOne({ userId: message.author.id }).then(userResult => {
                if (guildResult.ecoEnabled) return message.channel.send('Economy commands have been disabled in your server');
                
                let args = message.content.slice(prefix.length).trim().split(/ +/g);

                if (!args[1]) return message.channel.send('You need to specify an amount');
                if (args[1] === 'a' || args[1] === 'all') {
                    if ((userResult.economy_balance ? userResult.economy_balance : 0) < 1) return message.channel.send('You do not have any cash to deposit');
                    let amt = userResult.economy_balance;
                    userData.findOneAndUpdate({ userId: message.author.id }, { $inc: { bank_balance: amt }, $subtract: { economy_balance: amt }});
                    message.channel.send(`Successfully transfered **$${amt}** to your bank account`);
                } else {
                    let amt = args[1].replace('$', '');
                    if (isNaN(amt)) return message.channel.send(`**${amt}** is not a valid amount`);
                    if ((userResult.economy_balance ? userResult.economy_balance : 0) < amt) return message.channel.send(`You do not have **$${amt}** in your wallet`);

                    userData.findOneAndUpdate({ userId: message.author.id }, { $inc: { bank_balance: amt }, $subtract: { economy_balance: amt }});
                    message.channel.send(`Successfully transfered **$${amt}** to your bank account`);
                }
            });
        });
    }
}