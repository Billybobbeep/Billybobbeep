module.exports = {
    name: 'balance',
    description: 'Check how much money a user has.',
    alias: ['bal', 'wallet'],
    catagory: 'economy',
    usage: 'balance [user]',
    guildOnly: true,
    execute (message, prefix, client) {
        const Discord = require('discord.js');
        const db = require('../../structure/global.js').db;;
        const embed = new Discord.MessageEmbed();
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (user.bot) return message.channel.send(`Bots do not have wallets.`);
        if (!isNaN(args[1])) user = user.user;

        embed.setFooter(`To bank some cash use: ${prefix}deposit [amount]`);
        embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
        embed.setAuthor(user.username, user.displayAvatarURL());

        var sym = '$'
        let bankBal = db.get(user.id + '.bank.balance') || 0;
        var walletBal = db.get(user.id + '.economy.balance') || 0;

        if (walletBal.toString().startsWith('-')) sym = '-$';
        embed.addField(`Wallet:`, `${sym}${walletBal.toString().replace('-', '')}`);

        sym = '$'
        if (bankBal.toString().startsWith('-')) sym = '-$';
        embed.addField(`Bank Account:`, `${sym}${bankBal.toString().replace('-', '')}`);
        
        sym = '$'
        let networth = walletBal + bankBal;
        if (networth.toString().startsWith('-')) sym = '-$';
        embed.addField(`Total Networth:`, sym + networth.toString().replace('-', ''));
        message.channel.send(embed);
    }
}