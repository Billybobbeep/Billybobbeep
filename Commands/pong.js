module.exports = {
    name: 'ping',
    description: 'View the reaction time between you and the bot.',
    guildOnly: true,
    execute (message, prefix, client) {
        let pingMessage = await message.channel.send("Ping: Recieveing Data...");
        pingMessage.edit(`**Pong!**\n` + `**Ping:** ${pingMessage.createdAt - message.createdAt}ms`);
    }
}