const Discord = require(`discord.js`);
const configFile = require('../config.json');
const db = require('quick.db');

module.exports = async(client, msg, args, prefix, message) => {
    if (!message.member.hasPermission("MANAGE_GUILD") || !message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send("You do not have the premission to run this command.")
    }

let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
    if (!user) return message.channel.send("Please mention a user.");

    let nick = args.slice(1).join(" ");
    if (!nick) {
      await member.setNickname()
      return message.channel.send('Changed ' + user.tag + '\'s nickname to default.')
    }
    let member = message.guild.members.cache.get(user.id);
    if (user.tag === undefined) {
      user = user.user
    }
    try {
        await member.setNickname(nick);
        message.channel.send(`Changed ${user.tag}'s nickname to ${nick}`);
    }
    catch {
        message.channel.send("I do not have the premissions to change this users nickname.")
    }
}