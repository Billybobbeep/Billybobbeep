module.exports = async (client, latestType, ready, message) => {
    client.on('message', async () => {
        if (!message) return;
        if (!latestType.id && !latestType.ready) return;
        if (ready === true && latestType !== 0) {
            message.delete()
            ready = false
        }
    });
}