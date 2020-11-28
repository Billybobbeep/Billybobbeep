const Discord = require('discord.js');
const db = require('../../structure/global.js').db;

module.exports = async (client, message) => {
    const introvert = client.emojis.cache.get('734494044230516767');
    const extrovert = client.emojis.cache.get('771826679722410044');
    const shy = client.emojis.cache.get('771827072888209419');
    const loud = '🔊';
    const sensitive = client.emojis.cache.get('771828077093191732');
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
        .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
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
}