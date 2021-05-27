const Discord = require('discord.js');
const guildData = require('../../client/database/models/guilds');

module.exports = async (client, message) => {
    guildData.findOne({ guildId: message.guild.id }).then(result => {
        const introvert = client.emojis.fetch('734494044230516767');
        const extrovert = client.emojis.fetch('771826679722410044');
        const shy = client.emojis.fetch('771827072888209419');
        const loud = '🔊';
        const sensitive = client.emojis.fetch('771828077093191732');
        const quiet = '✨';
        const embed = new Discord.MessageEmbed()
            .setTitle('Personality Roles')
            .setDescription(
            `${introvert} Introvert\n` +
            `${extrovert} Extrovert\n` +
            `${shy} Shy\n` +
            `${loud} Loud\n` +
            `${quiet} Quiet\n` +
            `${sensitive} Sensitive\n`)
            .setColor(result.embedColor)
            .setFooter(`React below to claim a role!`)
        let msg = await message.channel.send(embed);
        message.delete();
        await msg.react(introvert);
        await msg.react(extrovert);
        await msg.react(shy);
        await msg.react(loud);
        await msg.react(loud);
        await msg.react(quiet)
        await msg.react(sensitive);
    });
}