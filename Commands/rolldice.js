const rollDice = () => Math.floor(Math.random() * 6) + 1;

module.exports = async(client, msg, args, prefix, message) => {
    message.reply("rolled a " + rollDice());
}