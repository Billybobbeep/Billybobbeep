module.exports = {
    name: 'ping',
    description: 'View the reaction times.',
    catagory: 'info',
    guildOnly: true,
    async execute (message, prefix, client) {
        let serverResponse;
        let messageResponse;
        let msg = await message.channel.send('Ping: Receiving Data...');
        messageResponse = msg.createdAt - message.createdAt;
        await client.channels.cache.get('775402441021456385').send(`Ping, Receiving data for: **${message.guild.name}** (${message.guild.id})`).then(msg => serverResponse = msg.createdAt - message.createdAt);
        msg.edit(`**Pong!**\n**Message Response Time:** ${messageResponse}ms\n**Client Response Time:** ${client.ws.ping}ms\n**Server Response Time:** ${serverResponse}ms`);
    }
}