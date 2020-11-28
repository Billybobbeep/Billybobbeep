module.exports = {
    name: 'donate',
    description: 'Donate a user some cash.',
    alias: ['give'],
    usage: 'donate [user] [amount]',
    catagory: 'economy',
    guildOnly: true,
    execute(message, prefix, client) {
        const db = require('../../structure/global.js').db;
        const ms = require('ms');

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send(`Economy have been disabled for this server.`);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
        if (!user) return message.channel.send(`You have not mentioned a user.`);
        if (!user.id) user = user.user;

        let emoji = client.emojis.cache.get(require('../../structure/config.json').blobSmile);
        if (user.id === client.user.id) return message.channel.send(`I do not need money, thanks though. ${emoji}`)
        if (user.bot) return message.channel.send(`You cannot donate to a bot.`);
        if (user.id === message.author.id) return message.channel.send(`You cannot donate to yourself.`);

        if (!args[2]) return message.channel.send(`Please specify an amount.`);
        let amt = Number(args[2]);
        if (isNaN(amt)) return message.channel.send(`Please enter a valid number to donate.`);
        if (amt > db.get(message.author.id + '.economy.balance')) return message.channel.send(`You do not have **${amt}** in your wallet.`);

        if (db.get(message.author.id + '.economy.lastDonated')) {
            let lastRun = db.get(message.author.id + '.economy.lastDonated');
            if (Date.now() < (lastRun + 300000)) {
                let time = ms(Date.now() - (lastRun + 300000));
                time = time.replace('-', '');
                if (time.endsWith('ms')) time = '1s';
                if (time.endsWith('s') && time !== '1s') time = time.replace('s', ' seconds');
                if (time.endsWith('s') && time === '1s') time = time.replace('s', ' second');
                if (time.endsWith('m')) time = time.replace('m', ' minutes');
                return message.channel.send(`You have to wait **${time}** before donating again.`);
            }
        }

        db.set(message.author.id + '.economy.lastDonated', Date.now());
        message.channel.send(`<@!${message.author.id}> successfully donated **$${amt}** to <@!${user.id}>.`);
        db.subtract(message.author.id + '.economy.balance', amt);
        db.add(user.id + '.economy.balance', amt);
    }
}