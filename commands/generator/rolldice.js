module.exports = {
    name: 'rolldice',
    description: 'Roll a rice and recieve a number',
    alias: ['roll', 'dice'],
    catagory: 'generator',
    options: [],
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute (message, _prefix, _client) {
        message.channel.send(`<@!${message.author ? message.author.id : message.member.user.id}>, rolled a ${Math.floor(Math.random() * 6) + 1}`);
    }
}