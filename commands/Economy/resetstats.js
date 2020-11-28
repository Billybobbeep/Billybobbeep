module.exports = {
    name: 'resetstats',
    description: 'Delete a users stats.',
    catagory: 'economy',
    usage: 'apply [user]',
    guildOnly: true,
    execute(message, prefix, client) {
        if (message.member.hasPermission('MANAGE_GUILD') || message.member.hasPermission('ADMINISTRATOR')) {
            let args = message.content.slice(prefix.length).trim().split(/ +/g);
            let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
            if (!user) user = message.author;
            message.channel.send(`Are you sure you want to clear <@!${user.id}>'s stats?`).then(msg => reactions(message, msg, user, client));
        } else {
            message.channel.send(`You do not have premission to use this command.`);
        }
    }
}

async function reactions(message, msg, user, client) {
    const db = require('../../structure/global.js').db;

    let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
    let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);

    const filter = (reaction, user) => {
        return (
        [tick.id, cross.id].includes(reaction.emoji.id) && user.id === message.author.id
        );
    }
    await msg.react(tick);
    await msg.react(cross);
    msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
    .then((collected) => {
        const reaction = collected.first();

        if (reaction.emoji.id === tick.id) {
            msg.reactions.removeAll();
            message.channel.send(`${tick} Successfully cleared <@!${user.id}>'s stats.`);
            db.delete(user.id + `.economy`);
            db.delete(user.id + `.bank`);
            db.delete(user.id + `.jobs`);
        } else {
            msg.reactions.removeAll();
            message.channel.send(`${cross} Cancelled prompt.`);
        }
    }).catch(() => {
        msg.reactions.removeAll();
    });
}