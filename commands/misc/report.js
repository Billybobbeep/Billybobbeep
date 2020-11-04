module.exports = {
    name: 'report',
    description: 'Report errors & bugs.',
    async execute(message, prefix, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        embed.setDescription(`Welcome to the ${client.user.username} bug report service.\nHere I will be asking you a series of questions.\nYou can cancel this prompt anytime by entering \`cancel\`.`);
        embed.setFooter(`To continue react to this message`);

        const embed2 = new Discord.MessageEmbed();
        embed2.setTitle('Question: 1/5');
        embed2.setDescription(`What is your bug about?`);

        if (message.channel.type === 'dm') {
            let msg = await message.channel.send(embed);
            if (msg && msg.id) {
                await msg.react('🐞');

                const rfilter = (reaction, user) => {
                    return (
                    ['▶', '◀'].includes(reaction.emoji.name) && user.id === message.author.id
                    );
                }

                msg.awaitReactions(rfilter, { max: 1, time: 60000, errors: ['time'] }).then((collected) => {
                    const reaction = collected.first();

                    msg.edit(embed1);
                });
                const mfilter = collected => collected.author.id === message.author.id;
                const collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000,
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });

                if (collected.first().content === 'cancel') return message.author.send('Canceled');
                if (collected.first().author.id === client.user.id) message.channel.send('....')
                message.author.send('Done');

            }
        } else {
            let msg = await message.author.send(embed).catch(() => { return message.channel.send(`You must have your DMs turned on to use this command.`)});
            message.channel.send(`<@!${message.author.id}> Check your DMs!`);
            if (msg && msg.id) {
                await msg.react('🐞');

                const rfilter = (reaction, user) => {
                    return (
                    ['▶', '◀'].includes(reaction.emoji.name) && user.id === message.author.id
                    );
                }

                msg.awaitReactions(rfilter, { max: 1, time: 60000, errors: ['time'] }).then((collected) => {
                    const reaction = collected.first();

                    msg.edit(embed1);
                });
                const mfilter = collected => collected.author.id === message.author.id;
                const collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000,
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });

                if (collected.first().content === 'cancel') return message.author.send('Canceled');
                message.author.send('Done');

            }
        }
    }
}