module.exports = {
    name: 'ping',
    description: 'View the reaction time between you and the bot.',
    guildOnly: true,
    execute (message, prefix, client) {
        message.channel.send("Ping: Recieveing Data...").then(msg => 
        msg.edit(`**Pong!**\n` + `**Ping:** ${msg.createdAt - message.createdAt}ms`));
    }
}