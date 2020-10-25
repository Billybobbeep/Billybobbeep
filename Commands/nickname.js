const Discord = require(`discord.js`);
const configFile = require('../config.json');
const db = require('../databaseManager/index.js');

module.exports = (client, msg, args, prefix, message) => {
    async function nicknameCmd() {
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);
        if (!user) return message.channel.send("Please mention a user.");

        let nick = args.slice(1).join(" ");
        let member = message.guild.members.cache.get(user.id);
        if (!nick) {
        await member.setNickname('')
        return message.channel.send('Removed ' + user.tag + '\'s nickname.')
        }
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
    var debounce = false;

    if (message.member.hasPermission("MANAGE_GUILD") || message.member.hasPermission("ADMINISTRATOR")) {
        nicknameCmd()
        debounce = true;
      } else if (db.get(message.guild.id + '.modRole')) {
        if (message.member.roles.cache.find(role => role.id === db.get(message.guild.id + '.modRole'))) {
          nicknameCmd()
          debounce = true;
        }
        if (debounce === false) {
          message.channel.send('You do not have the premissions to run this command.')
        }
      }
}