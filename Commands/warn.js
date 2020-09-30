const Discord = require(`discord.js`);
const configFile = require('../config.json')
module.exports = async(client, msg, args, prefix, message) => {
  let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
    if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to run this command.")

        var user = message.mentions.users.first();
        if(!user) return message.channel.send('Please specify a user to warn.');

        var member;

        try {
            member = await message.guild.members.fetch(user);
        } catch(err) {
            member = null;
        }

        if(!member) return message.reply('That user is not in this server.');

        var reason = args.splice(1).join(' ');
        if(!reason) return message.reply('You need to give a reason');

        var log = new Discord.MessageEmbed()
        .setTimestamp()
        .setColor('#fbc2eb')
        .setTitle('User Warned.')
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        await LoggingChannel.send(log);

        await message.channel.send(`**${user}** has been warned by **${message.author}**!`);
        var log2 = new Discord.MessageEmbed()
        log2.setTimestamp()
        log2.setColor('#fbc2eb')
        log2.setTitle(`You have been warned`);
        log2.addField(`Responsible Moderator:`, message.author.tag, true);
        log2.addField(`Reason:`, reason);
        log2.addField(`Guild:`, message.guild)
        user.send(log2)
}