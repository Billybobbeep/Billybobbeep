module.exports = {
    name: 'demote',
    description: 'Demote a user',
    guildOnly: true,
    catagory: 'moderation',
    usage: 'demote [user] [reason]',
    execute(message, prefix, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const embed2 = new Discord.MessageEmbed();
        const guildData = require('../../events/client/database/models/guilds.js');
        const logging = require('../../utils/functions.js').logging;
        function demoteCmd() {
            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                let args = message.content.slice(prefix.length).trim().split(/ +/g);
                let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
                if (!user) return message.channel.send('Please mention a user to demote');
                if (!user.tag) {
                    user = user.user;
                }
                if (!result.modRole)
                    return message.channel.send('You need to set up a mod role in your server to use this command');

                let reason = args.slice(2).join(' ');
                if (!reason) reason = 'No reason was provided';
                let member = message.guild.members.cache.get(user.id);

                if (member.roles.cache.get(result.modRole)) {
                    await member.roles.remove(result.modRole).catch(() => { return message.channel.send('I do not have permissions to use this command') });
                    message.channel.send(`<@!${user.id}> was demoted by <@!${message.author.id}>`)
                    embed.setTitle('User Demoted');
                    embed.setDescription(
                        `**User:** ${user}\n` +
                        `**User Tag:** ${user.tag}\n` +
                        `**User ID:** ${user.id}\n\n` +
                        `**Reason:** ${reason}\n\n` +
                        `**Moderator:** ${message.author}\n` +
                        `**Moderator Tag:** ${message.author.tag}\n` +
                        `**Moderator ID:** ${message.author.id}`);
                    embed.setColor(result.embedColor);
                    embed2.setTitle('You have been demoted');
                    embed2.addField(`Responsible Moderator`, message.author.tag);
                    embed2.addField(`Reason`, reason);
                    embed2.addField('Guild:', message.guild.name);
                    embed2.setColor(result.embedColor);
                    try {
                        await user.send(embed2);
                    } catch {
                        message.channel.send(`The user was not notified as they do not have their DMs turned on`);
                    }
                    logging(embed, message, client);
                } else
                    message.channel.send(`<@!${user.id}> is not a moderator`);
            });
        }

        if (message.member.hasPermission('ADMINISTRATOR'))
            demoteCmd();
        else 
            message.channel.send('You do not have the permissions to use this command');
    }
}