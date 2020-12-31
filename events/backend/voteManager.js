module.exports = (client) => {
    const DBL = require("dblapi.js");
    const api = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjczMTQ5ODg0MjgxMzM2NjMwNCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjA4MDQ1MDk5fQ.zq-BdK82KBaD8cDLujA-cp0-xcPiz_3I0xmANJpO5NQ', client);
    const Discord = require('discord.js');

    api.getVotes().then(votes => {
        if (votes.find(vote => vote.id == '697194959119319130')) console.log("Tonkku has voted!!!")
    });

    api.getVotes().then(votes => {
    //api.on('upvote', (user, bot) => {
        const embed = new Discord.MessageEmbed();
        embed.setTitle('Vote Added');
        embed.setColor('#447ba1');
        embed.addField('Voter', `**Tag:** ${user.username}#${user.discriminator}\n**ID:** ${user.id}`, true);
        embed.addField('Bot', `**Tag:** ${bot.username}#${bot.discriminator}\n**ID:** ${bot.id}`, true);
        embed.addField('Total Upvotes', bot.points);
        client.channels.cache.get('788331636303200286').send(embed);
        console.log(user);
        client.channels.cache.get('788439092433911860').send(`${user} has upvoted ${bot}`);
    });
}