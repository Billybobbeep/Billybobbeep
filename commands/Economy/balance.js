module.exports = {
    name: 'balance',
    description: 'Check how much money a user has',
    alias: ['bal', 'wallet'],
    catagory: 'economy',
    usage: 'balance [user]',
    guildOnly: true,
    slashInfo: { enabled: true, public: false },
    options: [{ name: 'user', description: 'The user you\'d like to check the balance of', type: 6, required: false }],
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message, prefix, client) {
        const Discord = require('discord.js');
        const guildData = require('../../events/client/database/models/guilds.js');
        const userData = require('../../events/client/database/models/users.js');
        const embed = new Discord.MessageEmbed();
        if (!message.data) {
            let args = message.content.slice(prefix.length).trim().split(/ +/g);
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
            if (!user.id) user = user.user;
            if (user.bot) return message.channel.send('Bots do not have wallets');
            if (!isNaN(args[1])) user = user.user;
            guildData.findOne({ guildId: message.guild.id }).then(guildResult => {
                if (guildResult.preferences && guildResult.preferences.ecoEnabled) return message.channel.send('Economy commands have been disabled in this server');
                userData.findOne({ userId: user.id }).then(userResult => {
                    embed.setFooter(`To bank some cash use: /deposit`);
                    embed.setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1');
                    embed.setAuthor(user.username, user.displayAvatarURL());

                    let sym = '$'
                    let bankBal = userResult ? userResult.bank_balance : 0;
                    let walletBal = userResult ? userResult.economy_balance : 0;

                    if (walletBal.toString().startsWith('-')) sym = '-$';
                    embed.addField(`Wallet:`, `${sym}${walletBal.toFixed().toString().replace('-', '')}`);

                    sym = '$'
                    if (bankBal.toString().startsWith('-')) sym = '-$';
                    embed.addField(`Bank Account:`, `${sym}${bankBal.toFixed().toString().replace('-', '')}`);

                    sym = '$'
                    let networth = parseInt(walletBal) + parseInt(bankBal);
                    if (networth.toString().startsWith('-')) sym = '-$';
                    embed.addField(`Total Networth:`, sym + networth.toFixed().toString().replace('-', ''));
                    message.channel.send({ embeds: [embed] });
                });
            });
        } else {
            let args = message.data.options;
            let user;
            if (typeof args !== 'undefined' && args[0].value) user = client.guilds.cache.get(message.guild_id).members.cache.get(args[0].value);
            else user = message.member;
            user = user.user;
            if (user.bot) return require('../../utils/functions').slashCommands.reply(message, client, 'Bots do not have wallets');
            guildData.findOne({ guildId: message.guild_id }).then(guildResult => {
                userData.findOne({ userId: user.id }).then(userResult => {
                    embed.setFooter(`To bank some cash use: /deposit`);
                    embed.setColor(guildResult.preferences ? guildResult.preferences.embedColor : '#447ba1');
                    user.id !== message.member.user.id ? embed.setAuthor(user.username, user.displayAvatarURL()) : null;

                    let sym = '$'
                    let bankBal = userResult ? userResult.bank_balance : 0;
                    let walletBal = userResult ? userResult.economy_balance : 0;

                    if (walletBal.toString().startsWith('-')) sym = '-$';
                    embed.addField(`Wallet:`, `${sym}${walletBal.toFixed().toString().replace('-', '')}`);

                    sym = '$'
                    if (bankBal.toString().startsWith('-')) sym = '-$';
                    embed.addField(`Bank Account:`, `${sym}${bankBal.toFixed().toString().replace('-', '')}`);

                    sym = '$'
                    let networth = parseInt(walletBal) + parseInt(bankBal);
                    if (networth.toString().startsWith('-')) sym = '-$';
                    embed.addField(`Total Networth:`, sym + networth.toFixed().toString().replace('-', ''));
                    return require('../../utils/functions').slashCommands.reply(message, client, embed);
                });
            });
        }
    }
}