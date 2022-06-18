module.exports = {
    name: "ping",
    description: "View the reaction times",
    catagory: "info",
    guildOnly: true,
    slashInfo: { enabled: true, public: false },
    options: [],
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    async execute (message, _prefix, client) {
        const { slashCommands } = require("../../utils/functions");

        console.log(message);

        if (parseInt(client.ws.ping) > 500) {
            message.data ?
                slashCommands.reply(message, `**Pong** in ${client.ws.ping}ms\n\n⚠ It appears I have a slow connection, please be patient`) :
                message.channel.send({ content: `**Pong** in ${client.ws.ping}ms\n\n⚠ It appears I have a slow connection, please be patient` });
        } else {
            message.data ?
                slashCommands.reply(message, `**Pong** in ${client.ws.ping}ms`) :
                message.channel.send({ content: `**Pong** in ${client.ws.ping}ms` });
        }
    }
}