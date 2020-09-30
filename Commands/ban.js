const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    if (msg.startsWith(prefix + "ban")) {
        if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to run this command.")
        let user = message.mentions.users.first();

        let member = message.guild.member(user);
        let reason = args.slice(1).join(" ");
        
        if (!user) return message.channel.send("Please mention a user to ban.");
        if (user.id === message.author.id) return message.channel.send("You cannot ban yourself from the server.");
        if (user.id === client.user.id) return message.channel.send("You cannot ban me.");
        if (!reason) reason = "No reason provided";

        member.ban(reason).then(() => {
            message.channel.send(`Successfully banned **${user.tag}**`);
            console.log(`${message.author.username} successfully banned **${user.tag}**`);
            let LoggingChannel = client.channels.cache.get(configFile.LoggingChannel);
            }).catch(err => {
                message.reply("I was unable to ban the member you provided.");
            })
    }
}