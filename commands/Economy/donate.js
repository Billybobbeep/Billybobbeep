module.exports = {
    name: 'donate',
    description: 'Donate a user some cash',
    alias: ['give'],
    usage: 'donate [user] [amount]',
    catagory: 'economy',
    guildOnly: true,
    async execute(message, prefix, client) {
        const guildData = require('../../events/client/database/models/guilds.js');
        const userData = require('../../events/client/database/models/users.js');
        let guildResult = await guildData.findOne({ guildId: message.guild.id });
        let userResult = await userData.findOne({ userId: message.author.id });
        const ms = require('ms');

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (guildResult.ecoEnabled) return message.channel.send('Economy have been disabled for this server');
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
        if (!user) return message.channel.send(`You have not mentioned a user`);
        if (!user.id) user = user.user;

        let emoji = client.emojis.cache.get(require('../../utils/config.json').blobSmile);
        if (user.id === client.user.id) return message.channel.send(`I do not need money, thanks though. ${emoji}`)
        if (user.bot) return message.channel.send(`You cannot donate to a bot`);
        if (user.id === message.author.id) return message.channel.send(`You cannot donate to yourself`);

        if (!args[2]) return message.channel.send(`Please specify an amount`);
        let amt = parseInt(args[2]);
        if (isNaN(amt)) return message.channel.send(`Please enter a valid number to donate`);
        if (amt > userResult.economy_balance) return message.channel.send(`You do not have **${amt}** in your wallet`);
        if (amt < 5) return message.channel.send(`You cannot donate **$${amt}**, you must donate **$5** or above`)

        if (userResult.economy_lastDonated) {
            let lastRun = userResult.economy_lastDonated;
            if (Date.now() < (lastRun + 300000)) {
                let time = ms(Date.now() - (lastRun + 300000));
                time = time.replace('-', '');
                if (time.endsWith('ms')) time = '1s';
                if (time.endsWith('s') && time !== '1s') time = time.replace('s', ' seconds');
                if (time.endsWith('s') && time === '1s') time = time.replace('s', ' second');
                if (time.endsWith('m')) time = time.replace('m', ' minutes');
                return message.channel.send(`You have to wait **${time}** before donating again`);
            }
        }

        message.channel.send(`<@!${message.author.id}> successfully donated **$${amt}** to <@!${user.id}>`);
        userResult.economy_lastDonated = Date.now();
        userResult.economy_balance = userResult.economy_balance - amt;
        userResult.save();
        userData.findOne({ userId: user.id }).then(result => {
            result.economy_balance = result.economy_balance + amt;
            result.save();
        });
    }
}