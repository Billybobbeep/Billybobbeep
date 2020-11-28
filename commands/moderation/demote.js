module.exports = {
    name: 'demote',
    description: 'Demote a user.',
    guildOnly: true,
    execute(message, prefix, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const embed2 = new Discord.MessageEmbed();
        const db = require('../../structure/global.js').db;
        const logging = require('../../utils/functions.js').logging;
        async function demoteCmd() {
            let args = message.content.slice(prefix.length).trim().split(/ +/g);
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
            if (!user) return message.channel.send('Please mention a user to demote.');
            if (!user.tag) {
                user = user.user;
            }
            if (!db.get(message.guild.id + '.modRole'))
                return message.channel.send(`You need to set up a mod role in your server to use this command.`);

            let reason = args.slice(2).join(' ');
            if (!reason) return message.channel.send('You need to provide a reason.');
            let member = message.guild.members.cache.get(user.id);

            if (member.roles.cache.get(db.get(message.guild.id + '.modRole'))) {
                await member.roles.remove(db.get(message.guild.id + '.modRole')).catch(() => { return message.channel.send(`I do not have premissions to run this command.`) });
                message.channel.send(`<@!${user.id}> was demoted by <@!${message.author.id}>`)
                embed.setTitle('User Demoted');
                embed.setDescription(
                    `**User:** ${user}\n` +
                    `**User Tag:** ${user.tag}\n` +
                    `**User ID:** ${user.id}\n\n` +
                    `**Moderator:** ${message.author}\n` +
                    `**Moderator Tag:** ${message.author.tag}\n` +
                    `**Moderator ID:** ${message.author.id}`);
                embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
                embed2.setTitle('You have been demoted');
                embed2.addField(`Responsible Moderator`, message.author.tag);
                embed2.addField(`Reason`, reason);
                embed2.addField('Guild:', message.guild.name);
                embed2.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
                try {
                    await user.send(embed2)
                } catch {
                    message.channel.send(`The user was not notified as they do not have their DMs turned on.`)
                }
                logging(embed, message, client);
            } else
                message.channel.send(`<@!${user.id}> is not a moderator.`);
        }

        if (message.member.hasPermission('ADMINISTRATOR'))
            demoteCmd();
        else 
            message.channel.send('You do not have the premissions to run this command.');
    }
}