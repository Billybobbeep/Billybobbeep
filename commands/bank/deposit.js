module.exports = {
    name: 'deposit',
    description: 'Deposit some money into your bank account',
    alias: ['dep'],
    catagory: 'economy',
    usage: 'deposit [amount]',
    guildOnly: true,
    options: [{ name: 'amount', description: 'The amount you\'d like to deposit', type: 3, required: true }],
    execute(message, prefix, client) {
        const userData = require('../../events/client/database/models/users');
        const guildData = require('../../events/client/database/models/guilds');

        if (!message.data) {
            guildData.findOne({ guildId: message.guild.id }).then(guildResult => {
                if (guildResult.ecoEnabled) return message.channel.send('Economy commands have been disabled in your server');
                userData.findOne({ userId: message.author.id }).then(userResult => {
                    let args = message.content.slice(prefix.length).trim().split(/ +/g);

                    if (!args[1]) return message.channel.send('You need to specify an amount');
                    if (args[1] === 'a' || args[1] === 'all') {
                        if ((userResult.economy_balance ? userResult.economy_balance : 0) < 1) return message.channel.send('You do not have any cash to deposit');
                        let amt = userResult.economy_balance;
                        userResult.bank_balance = userResult.bank_balance + amt;
                        userResult.economy_balance = userResult.economy_balance - amt;
                        userResult.save();
                        message.channel.send(`Successfully transfered **$${amt}** to your bank account`);
                    } else {
                        let amt = args[1].replace('$', '');
                        if (isNaN(amt)) return message.channel.send(`**${amt}** is not a valid amount`);
                        if ((userResult.economy_balance ? userResult.economy_balance : 0) < amt) return message.channel.send(`You do not have **$${amt}** in your wallet`);

                        userResult.bank_balance = parseInt(userResult.bank_balance) + parseInt(amt);
                        userResult.economy_balance = parseInt(userResult.economy_balance) - parseInt(amt);
                        userResult.save();
                        message.channel.send(`Successfully transfered **$${amt}** to your bank account`);
                    }
                });
            });
        } else {
            guildData.findOne({ guildId: message.guild_id }).then(guildResult => {
                if (guildResult.ecoEnabled) return require('../../utils/functions').slashCommands.reply(message, client, 'Economy commands have been disabled in your server');
                userData.findOne({ userId: message.member.user.id }).then(userResult => {
                    let args = message.data.options
                    if (!args[0] || !args[0].value) return require('../../utils/functions').slashCommands.reply(message, client, 'You need to specify an amount');
                    if (args[0].value == 'a' || args[0].value == 'all') {
                        if ((userResult.economy_balance ? userResult.economy_balance : 0) < 1) return require('../../utils/functions').slashCommands.reply(message, client, 'You do not have any cash to deposit');
                        let amt = userResult.economy_balance;
                        userResult.bank_balance = userResult.bank_balance + amt;
                        userResult.economy_balance = userResult.economy_balance - amt;
                        userResult.save();
                        require('../../utils/functions').slashCommands.reply(message, client, `Successfully transfered **$${amt}** to your bank account`);
                    } else {
                        let amt = args[0].value.replace('$', '');
                        if (isNaN(amt)) return require('../../utils/functions').slashCommands.reply(message, `**${amt}** is not a valid amount`);
                        if ((userResult.economy_balance ? userResult.economy_balance : 0) < amt) return require('../../utils/functions').slashCommands.reply(message, client, `You do not have **$${amt}** in your wallet`);

                        userResult.bank_balance = parseInt(userResult.bank_balance) + parseInt(amt);
                        userResult.economy_balance = parseInt(userResult.economy_balance) - parseInt(amt);
                        userResult.save();
                        require('../../utils/functions').slashCommands.reply(message, client, `Successfully transfered **$${amt}** to your bank account`);
                    }
                });
            });
        }
    }
}