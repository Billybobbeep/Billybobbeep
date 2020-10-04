module.exports = async (client) => {
    client.on('typingStart', async (channel, user) => {
        var message = await channel.send(`<@!${user.id}> is typing`);
        message.delete({ timeout : 5000})
    });
}