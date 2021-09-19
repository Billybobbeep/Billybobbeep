module.exports = {
    name: 'say',
    description: 'Repeat what you just said',
    catagory: 'generator',
    usage: 'say [message]',
    guildOnly: true,
    //options: [{ name: 'message', description: 'The message to repeat', type: 3, required: false }],
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute (message, prefix, _client) { 
        let args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1);
        let wantToSay = args.join(' ');
        if (!args[0]) return message.channel.send('You must provide a message to send');
        message.channel.send(wantToSay, { disableMentions: 'everyone' });
        message.delete();
    }
}