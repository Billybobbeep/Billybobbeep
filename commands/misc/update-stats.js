module.exports = {
    name: 'updatestats',
    description: 'Update the member stats',
    execute (message, client) {
        client.channels.cache.get(countChannel.total).setName(`➳𝓣𝓸𝓽𝓪𝓵 𝓤𝓼𝓮𝓻𝓼: ${message.guild.memberCount}`);
        client.channels.cache.get(countChannel.member).setName(`➳𝓜𝓮𝓶𝓫𝓮𝓻𝓼: ${message.guild.members.cache.filter(m => !m.user.bot).size}`);
        client.channels.cache.get(countChannel.bots).setName(`➳𝓑𝓸𝓽𝓼: ${message.guild.members.cache.filter(m => m.user.bot).size}`);
    }
}