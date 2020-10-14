module.exports = (client) => {
  client.on('messageReactionAdd', (reaction, user) => {
    if (user.bot) return;
    reaction.message.channel.send('reacted')
  });
}