module.exports = {
    name: 'withdraw',
    description: 'Withdraw an amount from the bank.',
    alias: ['wd'],
    execute(message, prefix, client) {
        const db = require('../../data/databaseManager/index.js');

        if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.');
        
        let args = message.content.slice(prefix.length).trim().split(/ +/g);

        if (!args[1]) return message.channel.send(`You need to specify an amount.`);
        if (args[1] !== 'a' || args[1] !== 'all') {
            let amt = args[1].replace('$', '');
            if (isNaN(amt)) return message.channel.send(`${amt} is not a valid amount.`);
            if (db.get(message.author.id + '.bank.balance') < amt || !db.get(message.author.id + '.bank.balance')) return message.channel.send(`You do not have **${amt}** in your bank account.`);

            db.subtract(message.author.id + '.bank.balance', amt);
            db.add(message.author.id + '.economy.balance', amt);
            message.channel.send(`Successfully withdrawed **${amt}**.`);
        } else {
            if (db.get(message.author.id + '.bank.balance') < 1) return message.channel.send(`You do not have any cash to withdraw.`);
            let amt = db.get(message.author.id + '.economy.balance');
            db.add(message.author.id + '.economy.balance', db.get(message.author.id + '.bank.balance'));
            db.subtract(message.author.id + '.bank.balance', amt);
            message.channel.send(`Successfully withdrawed all of your cash.`);
        }
    }
}