function redirect() {
    if (message.channel.id === configFile.PollChannel || message.channel.id === configFile.MemesChannel)
        require(`./events/commands/reactions.js`)(message);
    else {
        require('./events/commands/Afk/AfkHandle.js')(message, client);
        require('./events/commands/counting.js')(message, client);
        require('./events/backend/dmRecieving.js')(message, client);
        require(`./events/backend/deletingMessages.js`)(message, client);
        require('./events/commands/mentions/mentions.js')(message, client);
        require('./events/backend/levels/main.js')(message, client);
        require('./events/commands/talk2billy')(message);
    }
}
function handle() {

}

module.exports = (message, client) => {

}