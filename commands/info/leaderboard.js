const all = require('../../quick.db/src/methods/all.js');

module.exports = {
    name: 'leaderboard',
    description: 'View this servers level leaderboard.',
    guildOnly: true,
    catagory: 'info',
    async execute(message, prefix, client) {
        const db = require('../../structure/global.js').db;
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed();
        embed.setColor(db.get(message.guild.id + 'embedColor') || '#447ba1');
        embed.setTitle('Levels | Leaderboard');

        if (args[1] && args[1] === 'global') {
            var allData = [];
            var levels = [];
            var finalData = [];
            db.fetchAll().forEach(data => {
                if (data.data && data.data.level) {
                    allData.push(`${data.data.level}_${data.ID.split('_')[1]}_${data.ID.split('_')[0]}`);
                }
            });
            allData.forEach(level => {
                levels.push(level.split('_')[0]);
            });
            levels.sort((a, b) => b - a);
            levels.length = 10;
            allData = allData.sort((a, b) => b.split('_')[0] - a.split('_')[0]);
            allData.length = 10;
            var count = 0;
            allData.forEach(data => {
                var level = data.split('_')[0];
                if (levels[count].toString() === level.toString()) {
                    finalData.push(data);
                }
                count++;
            });

            var i = 0;
            finalData.forEach(data => {
                i++
                embed.addField(`#${i}`, `${client.users.cache.get(data.split('_')[1]).tag} - **${data.split('_')[0]}** - ${client.guilds.cache.get(data.split('_')[2]).name}`, false);
            });

            message.channel.send(embed);
        } else {
            var allData = [];
            var levels = [];
            var finalData = [];
            embed.setFooter('Use "' + prefix + 'leaderboard global" to see the global leaderboard');
            db.fetchAll().forEach(data => {
                if (!data.ID.includes((message.guild.id).toString())) return;
                if (data.data && data.data.level) {
                    allData.push(`${data.data.level}_${data.ID.split('_')[1]}`);
                }
            });
            allData.forEach(level => {
                levels.push(level.split('_')[0]);
            });
            levels.sort((a, b) => b - a);
            levels.length = 10;
            allData = allData.sort((a, b) => b.split('_')[0] - a.split('_')[0]);
            allData.length = 10;
            var count = 0;
            allData.forEach(data => {
                var level = data.split('_')[0];
                if (levels[count].toString() === level.toString()) {
                    finalData.push(data);
                }
                count++;
            });

            var i = 0;
            finalData.forEach(data => {
                i++
                embed.addField(`#${i}`, `<@!${data.split('_')[1]}> - **${data.split('_')[0]}**`);
            });

            let msg = await message.channel.send(embed);
            if (msg.embeds[0].fields.length < 1) {
                msg.embeds[0].description = 'No data avalable.';
                msg.embeds[0].fields = [];
                msg.edit(msg.embeds[0]);
            }
        }
    }
}