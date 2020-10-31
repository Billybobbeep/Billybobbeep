module.exports = (message, client) => {
    client.generateInvite({
        permissions: ['ADMINISTRATOR'],
      })
        .then(link => message.channel.send(`My invite link is:\n${link}`))
        .catch(console.error);
}