module.exports = {
    name: 'balance',
    description: 'Check how much money a user has',
    alias: ['bal', 'wallet'],
    catagory: 'economy',
    usage: 'balance [user]',
    guildOnly: true,
    execute (message, prefix, client) {
        const Discord = require('discord.js');
        const guildData = require('../../events/client/database/models/guilds.js');
        const userData = require('../../events/client/database/models/users.js');
        const embed = new Discord.MessageEmbed();
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (!user.id) user = user.user;
        if (user.bot) return message.channel.send('Bots do not have wallets');
        if (!isNaN(args[1])) user = user.user;
        guildData.findOne({ guildId: message.guild.id }).then(guildResult => {
            userData.findOne({ userId: user.id }).then(userResult => {
                embed.setFooter(`To bank some cash use: ${prefix}deposit [amount]`);
                embed.setColor(guildResult.embedColor);
                embed.setAuthor(user.username, user.displayAvatarURL());

                let sym = '$'
                let bankBal = userResult ? userResult.bank_balance : 0;
                let walletBal = userResult ? userResult.economy_balance : 0;

                if (walletBal.toString().startsWith('-')) sym = '-$';
                embed.addField(`Wallet:`, `${sym}${walletBal.toString().replace('-', '')}`);

                sym = '$'
                if (bankBal.toString().startsWith('-')) sym = '-$';
                embed.addField(`Bank Account:`, `${sym}${bankBal.toString().replace('-', '')}`);
                
                sym = '$'
                let networth = Number(walletBal) + Number(bankBal);
                if (networth.toString().startsWith('-')) sym = '-$';
                embed.addField(`Total Networth:`, sym + networth.toString().replace('-', ''));
                message.channel.send(embed);
            });
        });
    }
}