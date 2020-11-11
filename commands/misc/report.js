module.exports = {
    name: 'report',
    description: 'Report errors & bugs.',
    catagory: 'other',
    async execute(message, prefix, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const db = require('../../data/databaseManager/index.js');
        embed.setDescription(`Welcome to the ${client.user.username} bug report service.\nHere I will be asking you a series of questions.\nYou can cancel this prompt anytime by entering \`cancel\`.\n\n**Please begin all messages with a** \`~\`**.**`);
        embed.setFooter(`To continue react to this message`);
        embed.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

        const embed2 = new Discord.MessageEmbed();
        embed2.setTitle('Question: 1/3');
        embed2.setDescription(`What is your bug about?`);
        embed2.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

        const embed3 = new Discord.MessageEmbed();
        embed3.setTitle('Question: 2/3');
        embed3.setDescription(`What is your bug?\n*Please provide as much detail as you can*.`);
        embed3.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

        const embed4 = new Discord.MessageEmbed();
        embed4.setTitle('Question: 3/3');
        embed4.setDescription(`Any additional information the moderator should know?`);
        embed.setFooter('Say \'skip\' to skip this question.')
        embed4.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

        var subject = '';
        var body = '';
        var extra = '';

        if (message.channel.type === 'dm') {
            let msg = await message.channel.send(embed);
            if (msg && msg.id) {
                await msg.react('🐞');

                const rfilter = (reaction, user) => {
                    return (user.id !== client.user.id);
                }

                msg.awaitReactions(rfilter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {
                    message.channel.send(embed2);
                });
                const mfilter = collected => collected.author.id === message.author.id;
                var collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000,
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });

                if (collected.first().content.toLowerCase() === 'cancel' || collected.first().content.toLowerCase() === '~cancel') return message.author.send('Canceled prompt.');
                if (collected.first().content.toLowerCase() === 'skip' || collected.first().content.toLowerCase() === '~skip') message.author.send('This is a required question.');
                subject = collected.first().content;
                message.channel.send(embed3);

                collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000,
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });
                if (collected.first().content.toLowerCase() === 'cancel' || collected.first().content.toLowerCase() === '~cancel') return message.author.send('Canceled prompt.');
                if (collected.first().content.toLowerCase() === 'skip' || collected.first().content.toLowerCase() === '~skip') message.author.send('This is a required question.');
                body = collected.first().content;
                message.channel.send(embed4);

                collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });
                if (collected.first().content.toLowerCase() === 'cancel' || collected.first().content.toLowerCase() === '~cancel') return message.author.send('Canceled prompt.');

                if (collected.first().content.toLowerCase() === 'skip' || collected.first().content.toLowerCase() === '~skip')
                    extra = '*Question Skipped*';
                else extra = collected.first().content.replace('~', '');

                const embed5 = new Discord.MessageEmbed();
                embed5.setTitle('Results');
                embed5.setDescription(`Please react to the message below if you are happy with the information below.`);
                embed5.addField(`Subject`, subject.toString().replace('~', ''));
                embed5.addField(`Message`, body.toString().replace('~', ''));
                embed5.addField(`Additional Information`, extra.toString().replace('~', ''));
                embed5.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

                const embed6 = new Discord.MessageEmbed();
                embed6.setTitle('Bug Report');
                embed6.addField(`Subject`, subject.toString().replace('~', ''));
                embed6.addField(`Message`, body.toString().replace('~', ''));
                embed6.addField(`Additional Information`, extra.toString().replace('~', ''));
                embed6.addField(`Sent From`, message.author.tag);
                message.guild ? embed6.addField(`Guild`, message.guild.name) : '';
                embed6.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);


                msg = await message.channel.send(embed5);
                let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
                let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
                await msg.react(tick);
                await msg.react(cross);

                const rfilter2 = (reaction, user) => {
                    return ([tick.id, cross.id].includes(reaction.emoji.id) && user.id !== client.user.id);
                }

                msg.awaitReactions(rfilter2, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {
                    let reaction = collected.first();

                    if (reaction.emoji.id === tick.id) {
                        let channel = client.channels.cache.get('734398769831084102');
                        channel.send(embed6).catch(e => console.error(e));
                        message.channel.send(`Your report has been sent.`);
                    } else {
                        message.channel.send(`Your report has not been sent.`);
                    }
                });
            }
        } else {
            let msg = await message.author.send(embed).catch(() => { return message.channel.send(`You must have your DMs turned on to use this command.`) });
            message.channel.send(`<@!${message.author.id}> Check your DMs!`);
            if (msg && msg.id) {
                await msg.react('🐞');

                const rfilter = (reaction, user) => {
                    return (user.id !== client.user.id);
                }

                msg.awaitReactions(rfilter, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {
                    message.author.send(embed2);
                });
                const mfilter = collected => collected.author.id === message.author.id;
                var collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000,
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });

                if (collected.first().content.toLowerCase() === 'cancel' || collected.first().content.toLowerCase() === '~cancel') return message.author.send('Canceled prompt.');
                if (collected.first().content.toLowerCase() === 'skip' || collected.first().content.toLowerCase() === '~skip') message.author.send('This is a required question.');
                subject = collected.first().content;
                message.author.send(embed3);

                collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000,
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });
                if (collected.first().content.toLowerCase() === 'cancel' || collected.first().content.toLowerCase() === '~cancel') return message.author.send('Canceled prompt.');
                if (collected.first().content.toLowerCase() === 'skip' || collected.first().content.toLowerCase() === '~skip') message.author.send('This is a required question.');
                body = collected.first().content;
                message.author.send(embed4);

                collected = await msg.channel.awaitMessages(mfilter, {
                    max: 1,
                    time: 50000
                }).catch(() => {
                    message.author.send('Time expired, please run this command again.');
                });
                if (collected.first().content.toLowerCase() === 'cancel' || collected.first().content.toLowerCase() === '~cancel') return message.author.send('Canceled prompt.');

                if (collected.first().content.toLowerCase() === 'skip' || collected.first().content.toLowerCase() === '~skip')
                    extra = '*Question Skipped*';
                else extra = collected.first().content.replace('~', '');

                const embed5 = new Discord.MessageEmbed();
                embed5.setTitle('Results');
                embed5.setDescription(`Please react to the message below if you are happy with the information below.`);
                embed5.addField(`Subject`, subject.toString().replace('~', ''));
                embed5.addField(`Message`, body.toString().replace('~', ''));
                embed5.addField(`Additional Information`, extra.toString().replace('~', ''));
                embed5.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);

                const embed6 = new Discord.MessageEmbed();
                embed6.setTitle('Bug Report');
                embed6.addField(`Subject`, subject.toString().replace('~', ''));
                embed6.addField(`Message`, body.toString().replace('~', ''));
                embed6.addField(`Additional Information`, extra.toString().replace('~', ''));
                embed6.addField(`Sent From`, message.author.tag);
                message.guild ? embed6.addField(`Guild`, message.guild.name) : '';
                embed6.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);


                msg = await message.author.send(embed5);
                let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
                let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
                await msg.react(tick);
                await msg.react(cross);

                const rfilter2 = (reaction, user) => {
                    return ([tick.id, cross.id].includes(reaction.emoji.id) && user.id !== client.user.id);
                }

                msg.awaitReactions(rfilter2, { max: 1, time: 30000, errors: ['time'] }).then((collected) => {
                    let reaction = collected.first();

                    if (reaction.emoji.id === tick.id) {
                        let channel = client.channels.cache.get('734398769831084102');
                        channel.send(embed6).catch(e => console.error(e));
                        message.author.send(`Your report has been sent.`);
                    } else {
                        message.author.send(`Your report has not been sent.`);
                    }
                });
            }
        }
    }
}