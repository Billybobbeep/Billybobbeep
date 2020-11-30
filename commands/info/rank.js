module.exports = {
    name: 'rank',
    description: 'View your xp.',
    catagory: 'info',
    alias: ['cl', 'currlvl', 'xp'],
    guildOnly: true,

    async execute (message, prefix, client) {
        const Discord = require('discord.js');
        const canvacord = require('canvacord');
        const db = require('../../structure/global').db;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (!user.displayAvatarURL() || !user.id) user = user.user;
        let displayName = `${user.username[0].toUpperCase()}${(user.username).substring(1).toLowerCase()}`;
        let avatar = await canvacord.Canvas.trigger(user.displayAvatarURL({ dynamic: false, format: 'png' }));
        var msg = await message.channel.send('Please wait...');

        var rank = new canvacord.Rank();
        rank.setAvatar(avatar);
        rank.setUsername(displayName.toString());
        rank.setDiscriminator(user.discriminator);
        rank.setStatus((user.presence.status).toString());
        rank.setCurrentXP(db.get(message.guild.id + '_' + user.id + '.xp') || 0);
        rank.setRequiredXP(500)
        rank.setLevel(db.get(message.guild.id + '_' + user.id + '.level') || 0);
        try {
            rank.build().then(data => {
                const attachment = new Discord.MessageAttachment(data);
                message.channel.send(attachment);
                msg.delete();
            });
        } catch {
            if (user.id === message.author.id) {
                message.channel.send(`You do not have a rank yet`);
                msg.delete();
            } else {
                message.channel.send(`${displayName} does not have a rank yet`);
                msg.delete();
            }
            return;
        }
    }
}