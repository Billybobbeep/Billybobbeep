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
        if (messageResponse > 500) {
            msg.edit(`**Pong!**\n**Message Response Time:** ${messageResponse}ms\n**Client Response Time:** ${client.ws.ping}ms\n**Server Response Time:** ${serverResponse}ms\n\n⚠ It appears I have a slow connection, please be patient.`);
        } else {
            msg.edit(`**Pong!**\n**Message Response Time:** ${messageResponse}ms\n**Client Response Time:** ${client.ws.ping}ms\n**Server Response Time:** ${serverResponse}ms`);
        }
    }
}