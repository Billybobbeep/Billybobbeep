module.exports = {
    name: 'transferlvl',
    description: 'Transfer a users level to another user',
    alias: ['tl', 'translvl', 'transferlevel'],
    guildOnly: true,
    catagory: 'other',
    execute(message, prefix, client) {
        const db = require('../../structure/global.js').db;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send(`You need the \`Administrator\` permission to use this command);
        if (db.get(message.guild.id + '.levelsEnabled') === false) return message.channel.send(`Levels have been disabled for this server);
        let user1 = message.guild.members.cache.get(args[1]);
        let user2 = message.guild.members.cache.get(args[2]);
        if (user1) user1 = user1.user;
        if (user2) user2 = user2.user;
        if (!user1 || !user2) {
            if (message.mentions.users.first()) {
                var count = 0;
                message.mentions.users.forEach(user => {
                    if (count >= 2) return;
                    count++;
                    if (count === 1) {
                        user1 = user;
                    } else {
                        user2 = user;
                    }
                });
            } else {
                if (!user1) message.channel.send(`You have not specified a first user); else message.channel.send(`You have not specified a second user);
            }
        }

        if (user1.bot) return message.channel.send(`Bots do not have levels);
        if (user2.bot) return message.channel.send(`You cannot transfer levels to a bot);
        if (user1.id === user2.id) return message.chanel.send(`You cannot transfer a level to the same person);
        let user1lvl = db.get(message.guild.id + '_' + user1.id + '.level');
        if (user1lvl <= 1) return message.channel.send(`${user1} does not have enough levels to transfer);

        db.delete(message.guild.id + '_' + user1.id +'.level');
        db.add(message.guild.id + '_' + user2.id +'.level', user1lvl);
        message.channel.send(`Succesfully transfered ${user1lvl} levels to ${user2}`);
    }
}