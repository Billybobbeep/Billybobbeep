module.exports = {
    name: 'report',
    description: 'Report errors & bugs.',
    async execute(message, prefix, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        embed.setDescription(`Welcome to the ${client.user.username} bug report service.\nHere I will be asking you a series of questions.\nYou can cancel this prompt anytime by entering \`cancel\``);
        embed.setFooter(`To continue react to this message`);

        const embed2 = new Discord.MessageEmbed();
        embed2.setTitle('Question: 1/5');
        embed2.setDescription(`What is your bug about?`);

        let msg = message.author.send(embed).catch(() => { return message.channel.send(`You must have your DMs turned on to use this command.`)});
        message.channel.send(`<@!${message.author.id}> Check your DMs!`);
        if (msg && msg.id) {
            await msg.react('🐞');

            const filter = (reaction, user) => {
                return (
                ['▶', '◀'].includes(reaction.emoji.name) && user.id === message.author.id
                );
            }

            msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] }).then((collected) => {
                const reaction = collected.first();

                msg.edit(embed1);
            });


        }
    }
}