module.exports = {
    name: 'vote',
    description: 'Vote for billybobbeep',
    guildOnly: true,
    execute(message, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const guildData = require('../../events/client/database/models/guilds');

        guildData.findOne({ guildId: message.guild.id }).then(result => {
            embed.setTitle('Vote for Billybobbeep');
            embed.setDescription('Please [see here](https://top.gg/bot/731498842813366304/vote) to vote for Billybobbeep on [top.gg](https://top.gg)');
            embed.setColor(result.embedColor);
            message.channel.send(embed);
        });
    }
}