module.exports = {
    name: 'donate',
    description: 'Donate a user some cash.',
    alias: ['give'],
    guildOnly: true,
    execute(message, prefix, client) {
        const db = require('../../data/databaseManager/index.js');
        const ms = require('ms');

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send(`Economy have been disabled for this server.`);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
        if (!user.id) user = user.user;
        if (!user) return message.channel.send(`You have not mentioned a user.`);

        let emoji = client.emojis.cache.get(require('../../structure/config.json').blobSmile);
        if (user.id === client.user.id) return message.channel.send(`I do not need money, thanks though. ${emoji}`)
        if (user.bot) return message.channel.send(`You cannot donate to a bot.`);
        if (user.id === message.author.id) return message.channel.send(`You cannot donate to yourself.`);

        if (!args[2]) return message.channel.send(`Please specify an amount.`);
        let amt = args[2];
        if (isNaN(amt)) return message.channel.send(`Please enter a valid number to donate.`);
        if (amt > db.get(message.author.id + '.economy.balance')) return message.channel.send(`You do not have **${amt}** in your wallet.`);
        message.channel.send(`Donated **${amt}** to <@!${user.id}>.`);

        if (db.get(message.author.id + '.economy.lastDonated')) {
            let lastRun = db.get(message.author.id + '.economy.lastDonated');
            if (Date.now() < lastRun) {
                let time = ms(Date.now() - lastRun);
                time = time.replace('-', '');
                return message.channel.send(`You have to wait ${time} before donating again.`);
            }
        }

        db.subtract(message.author.id + '.economy.balance', amt);
        db.add(user.id + '.economy.balance', amt);
        db.set(message.author.id + '.economy.lastDonated', Date.now());
    }
}