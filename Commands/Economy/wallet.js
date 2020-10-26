const Discord = require(`discord.js`);
const db = require('../../databaseManager/index.js');
const embed = new Discord.MessageEmbed();
module.exports = async (client, message, prefix) => {
    embed.setFooter(`To bank some cash use: ${prefix}bank [amount]`);
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

    var sym = '$'
    var amt = db.get(message.author.id + '.economy.balance') || 0
    if (amt.toString().startsWith('-')) sym = '-$';
    embed.setDescription(`You currently have **${sym}${amt.toString().replace('-', '')}** in your wallet.`);
    message.channel.send(embed)
}