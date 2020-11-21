module.exports = (message, args) => {
  if (!args[2]) {
    embed.setDescription('Please specify a message to send');
    message.channel.send(embed)
  } else {
    message.delete().then(() => {
      message.channel.send(args.slice(2).join(' '));
    });
  }
}