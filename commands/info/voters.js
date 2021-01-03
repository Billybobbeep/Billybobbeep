module.exports = {
    name: 'voters',
    description: 'View all users who have voted for the bot',
    catagory: 'info',
    guildOnly: true,
    execute(message, prefix, client) {
        const DBL = require("dblapi.js");
        const api = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMTQ5ODg0MjgxMzM2NjMwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA4MDQ1MDk5fQ.zq-BdK82KBaD8cDLujA-cp0-xcPiz_3I0xmANJpO5NQ', client);
        const Discord = require('discord.js');
        const guildData = require('../../events/client/database/models/guilds');
        const embed = new Discord.MessageEmbed();

        let count = 0;
        guildData.findOne({ guildId: message.guild.id }).then(result => embed.setColor(result.embedColor));
        api.getVotes().then(voters => {
            voters.forEach(voter => {
                count++;
                embed.addField(`Voter #${count}`, `${voter.username}#${voter.discriminator}`, false);
            });
        });
    }
}