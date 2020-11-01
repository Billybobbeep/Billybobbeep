module.exports = {
    name: 'wallet',
    description: 'View how much money you have.',
    guildOnly: true,
    execute (message, prefix, client) {
        const Discord = require(`discord.js`);
        const db = require('../../data/databaseManager/index.js');
        const embed = new Discord.MessageEmbed();

        embed.setFooter(`To bank some cash use: ${prefix}bank [amount]`);
        embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

        var sym = '$'
        var amt = db.get(message.author.id + '.economy.balance') || 0
        if (amt.toString().startsWith('-')) sym = '-$';
        embed.setDescription(`You currently have **${sym}${amt.toString().replace('-', '')}** in your wallet.`);
        message.channel.send(embed)
    }
}