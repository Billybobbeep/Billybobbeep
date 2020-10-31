function redirect() {
    if (message.channel.id === configFile.PollChannel || message.channel.id === configFile.MemesChannel)
        require(`./events/commands/reactions.js`)(message);
}
function handle() {

}

module.exports = (message, client) => {

}