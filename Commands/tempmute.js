const Discord = require(`discord.js`);
const configFile = require('../config.json');

module.exports = async(client, msg, args, prefix, message) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES") || !message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You do not have the permission to run this command.")
    const role = await message.guild.roles.fetch(r => r.id === "730514715155103847");
    if(!role) return message.channel.send("I cannot find the muted role, please make sure you have not removed it.");

    const user = message.mentions.first();
    if (!user) return message.channel.send("Please specify a user you would like to mute.");
    if (user.roles.has(role)) return message.channel.send(`${user} has already been muted.`);
    user.addRole(role);
    message.channel.send(`${user} has been muted for ${args[1]} milliseconds.`)

    setTimeout(async() => (await user.removeRole(role)), args[1]);
}