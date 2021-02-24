module.exports = {
    name: 'invite',
    description: 'Invite billy to your server',
    catagory: 'other',
    execute(message, client, prefix) {
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const guildData = require('../../events/client/database/models/guilds');

        guildData.findOne({ guildId: message.guild.id }).then(result => {
            embed.setTitle('Invite Billybobbeep');
            embed.setDescription('Invite Billybobbeep here:\nhttps://discord.com/oauth2/authorize?client_id=731498842813366304&permissions=8&scope=bot\nAlso feel free to check out Billybobbeep on [top.gg](https://top.gg/bot/731498842813366304) or join our [support server](https://discord.com/invite/AUGX9sywnP).');
            embed.setColor(result.embedColor);
            message.channel.send(embed);
        });
    }
}