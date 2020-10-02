module.exports = async (client, message, args) => {
    if (!args[2]) {
    embed.setDescription('Please specify a message to send');
    return message.channel.send(embed)
    }
    await message.delete();
    await message.channel.send(args.slice(2).join(" "));
}