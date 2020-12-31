module.exports = {
    name: 'withdraw',
    description: 'Withdraw an amount from the bank',
    alias: ['wd'],
    catagory: 'economy',
    usage: 'withdraw [amount]',
    guildOnly: true,
    execute(message, prefix, client) {
        const userData = require('../../events/client/database/models/users');
        const guildData = require('../../events/client/database/models/guilds');

        guildData.findOne({ guildId: message.guild.id }).then(guildResult => {
            userData.findOne({ userId: message.author.id }).then(userResult => {
                if (guildResult.ecoEnabled) return message.channel.send('Economy commands have been disabled in your server');
        
                let args = message.content.slice(prefix.length).trim().split(/ +/g);

                if (!args[1]) return message.channel.send('You need to specify an amount');
                if (args[1] === 'a' || args[1] === 'all') {
                    if (db.get(message.author.id + '.bank.balance') < 1) return message.channel.send('You do not have any cash to withdraw');
                    let amt = db.get(message.author.id + '.bank.balance');
                    userData.findOneAndUpdate({ userId: message.author.id }, { $subtract: { bank_balance: amt }, $inc: { economy_balance: amt }});
                    message.channel.send(`Successfully withdrawed **$${amt}**`);
                } else {
                    let amt = args[1].replace('$', '');
                    if (isNaN(amt)) return message.channel.send(`**${amt}** is not a valid amount`);
                    if ((userResult.economy_balance ? userResult.economy_balance : 0) < amt) return message.channel.send(`You do not have **$${amt}** in your bank account`);

                    userData.findOneAndUpdate({ userId: message.author.id }, { $subtract: { bank_balance: amt }, $inc: { economy_balance: amt }});
                    message.channel.send(`Successfully withdrawed **$${amt}**`);
                }
            });
        });
    }
}