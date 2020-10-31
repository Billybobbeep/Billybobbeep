module.exports = {
  name: 'invite',
  description: 'Generate a bot invite.',
  guildOnly: false,
  execute (message, prefix, client) {
    client.generateInvite({
        permissions: ['ADMINISTRATOR'],
      })
        .then(link => message.channel.send(`My invite link is:\n${link}`))
        .catch(console.error);
  }
}