module.exports = {
    name: 'withdraw',
    description: 'Withdraw an amount from the bank.',
    alias: ['wd'],
    catagory: 'economy',
    usage: 'withdraw [amount]',
    guildOnly: true,
    execute(message, prefix, client) {
        const db = require('quick.db');

        if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.');
        
        let args = message.content.slice(prefix.length).trim().split(/ +/g);

        if (!args[1]) return message.channel.send(`You need to specify an amount.`);
        if (args[1] === 'a' || args[1] === 'all') {
            if (db.get(message.author.id + '.bank.balance') < 1) return message.channel.send(`You do not have any cash to withdraw.`);
            let amt = db.get(message.author.id + '.bank.balance');
            db.add(message.author.id + '.economy.balance', db.get(message.author.id + '.bank.balance'));
            db.delete(message.author.id + '.bank.balance');
            message.channel.send(`Successfully withdrawed **$${amt}**.`);
        } else {
            let amt = args[1].replace('$', '');
            if (isNaN(amt)) return message.channel.send(`**${amt}** is not a valid amount.`);
            if (db.get(message.author.id + '.bank.balance') < amt || !db.get(message.author.id + '.bank.balance')) return message.channel.send(`You do not have **$${amt}** in your bank account.`);

            db.subtract(message.author.id + '.bank.balance', amt);
            db.add(message.author.id + '.economy.balance', amt);
            message.channel.send(`Successfully withdrawed **$${amt}**.`);
        }
    }
}