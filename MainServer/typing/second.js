module.exports = async (client, latestType, ready, message) => {
    client.on('message', async () => {
        console.log(latestType)
        console.log(ready)
        if (!message) return console.log('no message found')
        if (!latestType.id && !latestType.ready) return console.log('error - not ready')
        if (ready === true && latestType !== 0) {
            console.log('message')
            message.delete()
            ready = false
        }
    });
}