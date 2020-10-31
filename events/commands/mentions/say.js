module.exports = async (message, args) => {
  if (!args[2]) {
    embed.setDescription('Please specify a message to send');
    message.channel.send(embed)
  } else {
    await message.delete();
    await message.channel.send(args.slice(2).join(" "));
  }
}