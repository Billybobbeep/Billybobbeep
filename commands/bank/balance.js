module.exports = {
    name: 'balance',
    description: 'View how much money you have in your bank account.',
    guildOnly: true,
    execute (message, prefix, client) {
        const db = require('../../data/databaseManager/index.js');
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();

        embed.setFooter(`${message.author.username}`);
        embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
        if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.');
        
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (!user.id) user = user.user;
        var sym = '$';
        let bal = db.get(user.id + '.bank.balance');
        if (bal.toString().startsWith('-')) sum = '-$';
        embed.setDescription(`You currently have ${sym}${bal} in your bank account.`);
        message.channel.send(embed);
    }
}