module.exports = {
    name: 'balance',
    description: 'View how much money you have.',
    alias: ['bal', 'wallet'],
    guildOnly: true,
    execute (message, prefix, client) {
        const Discord = require('discord.js');
        const db = require('../../data/databaseManager/index.js');
        const embed = new Discord.MessageEmbed();

        embed.setFooter(`To bank some cash use: ${prefix}deposit [amount]`);
        embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

        var sym = '$'
        let bankBal = db.get(message.author.id + '.bank.balance') || 0;
        var walletBal = db.get(message.author.id + '.economy.balance') || 0;

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