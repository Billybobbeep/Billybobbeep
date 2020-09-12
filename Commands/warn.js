
module.exports = async(client, msg, args, prefix, message) => {
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
        if(!reason) return message.reply('You need to give a reason!');

        var log = new Discord.MessageEmbed()
        .setTitle('User Warned.')
        .addField('User:', user, true)
        .addField('By:', message.author, true)
        .addField('Reason:', reason)
        message.channel.send(log);

        try {
            user.send(embed);
        } catch(err) {
            console.warn(err);
        }

        message.channel.send(`**${user}** has been warned by **${message.author}**!`);
        user.send(`You have been warned for: ${reason}. Responsible moderator: ${message.author.tag}`)
}