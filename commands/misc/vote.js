module.exports = {
    name: 'vote',
    description: 'Vote for billybobbeep',
    guildOnly: true,
    /**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message, _prefix, client) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const guildData = require('../../events/client/database/models/guilds');

        guildData.findOne({ guildId: message.guild.id }).then(result => {
            embed.setTitle('Vote for Billybobbeep');
            embed.setDescription(`[See here](https://top.gg/bot/${client.user.id}/vote) to vote for Billybobbeep on [top.gg](https://top.gg)`);
            embed.setColor(result.preferences ? result.preferences.embedColor : '#447ba1');
            message.channel.send(embed);
        });
    }
}