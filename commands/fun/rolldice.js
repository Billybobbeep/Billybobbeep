module.exports = {
    name: 'rolldice',
    description: 'Roll a rice and recieve a number',
    alias: ['roll', 'dice'],
    catagory: 'generator',
    options: [],
    /**
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {objects} client The bots client
     */
    execute (message, _prefix, _client) {
        message.channel.send(`<@!${message.author ? message.author.id : message.member.user.id}>, rolled a ${Math.floor(Math.random() * 6) + 1}`);
    }
}