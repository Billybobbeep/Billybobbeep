module.exports = {
    name: 'deposit',
    description: 'Deposit some money into your bank account.',
    alias: ['dep'],
    catagory: 'economy',
    usage: 'deposit [amount]',
    guildOnly: true,
    execute (message, prefix, client) {
        const db = require('quick.db');

        if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.');
        
        let args = message.content.slice(prefix.length).trim().split(/ +/g);

        if (!args[1]) return message.channel.send(`You need to specify an amount.`);
        if (args[1] === 'a' || args[1] === 'all') {
            if (db.get(message.author.id + '.economy.balance') < 1) return message.channel.send(`You do not have any cash to deposit.`);
            let amt = db.get(message.author.id + '.economy.balance');
            db.add(message.author.id + '.bank.balance', db.get(message.author.id + '.economy.balance'));
            db.subtract(message.author.id + '.economy.balance', amt);
            message.channel.send(`Successfully transfered **$${amt}** to your bank account.`);
        } else {
            let amt = args[1].replace('$', '');
            if (isNaN(amt)) return message.channel.send(`**${amt}** is not a valid amount.`);
            if (db.get(message.author.id + '.economy.balance') < amt || !db.get(message.author.id + '.economy.balance')) return message.channel.send(`You do not have **$${amt}** in your wallet.`);

            db.subtract(message.author.id + '.economy.balance', amt);
            db.add(message.author.id + '.bank.balance', amt);
            message.channel.send(`Successfully transfered **$${amt}** to your bank account.`);
        }
    }
}