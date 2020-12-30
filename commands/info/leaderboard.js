module.exports = {
    name: 'leaderboard',
    description: 'View this servers level leaderboard',
    guildOnly: true,
    catagory: 'info',
    execute(message, prefix, client) {
        const guildData = require('../../events/client/database/models/guilds.js');
        const guildMemberData = require('../../events/client/database/models/guildMembers.js');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed();
        embed.setColor(`${guildData.findOne({ guildId: message.guild.id }).then(result => result.embedColor) || '#447ba1'}`);
        embed.setTitle('Levels | Leaderboard');

        guildMemberData.find(function(err, result) {
            if (err) return message.channel.send('I do not have enough data to use this command');
            if (args[1] && args[1] === 'global') {
                let allData = [];
                let levels = [];
                let finalData = [];
                result.forEach(data => {
                    if (data && data.level) {
                        allData.push(`${data.level}_${data.memberId}_${data.guildId}`);
                    }
                });
                allData.forEach(level => {
                    levels.push(level.split('_')[0]);
                });
                levels = levels.sort((a, b) => b - a);
                levels.length = 10;
                allData = allData.sort((a, b) => b.split('_')[0] - a.split('_')[0]);
                allData.length = 10;
                let count = 0;
                allData.forEach(data => {
                    let level = data.split('_')[0];
                    if (levels[count].toString() === level.toString()) {
                        finalData.push(data);
                    }
                    count++;
                });

                let i = 0;
                finalData.forEach(data => {
                    i++
                    embed.addField(`#${i}`, `${client.users.cache.get(data.split('_')[1]).tag} - **${data.split('_')[0]}** - ${client.guilds.cache.get(data.split('_')[2]).name}`, false);
                });

                message.channel.send(embed);
            } else {
                let allData = [];
                let levels = [];
                let finalData = [];
                embed.setFooter('Use "' + prefix + 'leaderboard global" to see the global leaderboard');
                result.forEach(data => {
                    if (data.guildId !== message.guild.id) return;
                    if (data && data.level) {
                        allData.push(`${data.level}_${data.memberId}`);
                    }
                });
                allData.forEach(level => {
                    levels.push(level.split('_')[0]);
                });
                levels = levels.sort((a, b) => b - a);
                levels.length = 10;
                allData = allData.sort((a, b) => b.split('_')[0] - a.split('_')[0]);
                allData.length = 10;
                let count = 0;
                allData.forEach(data => {
                    let level = data.split('_')[0];
                    if (levels[count].toString() === level.toString()) {
                        finalData.push(data);
                    }
                    count++;
                });

                let i = 0;
                finalData.forEach(data => {
                    i++
                    embed.addField(`#${i}`, `<@!${data.split('_')[1]}> - **${data.split('_')[0]}**`);
                });

                message.channel.send(embed).then(msg => {
                    if (msg.embeds[0].fields.length < 1) {
                        msg.embeds[0].description = 'No data available';
                        msg.embeds[0].fields = [];
                        msg.edit(msg.embeds[0]);
                    }
                });
            }
        });
    }
}