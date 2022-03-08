module.exports = {
    name: "promote",
    description: "Promote a user to mod",
    guildOnly: true,
    catagory: "moderation",
    usage: "promote [user] [reason]",
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute(message, prefix, client) {
        const Discord = require("discord.js");
        const embed = new Discord.MessageEmbed();
        const embed2 = new Discord.MessageEmbed();
        const guildData = require("../../events/client/database/models/guilds.js");
        const logging = require("../../utils/functions").logging;
        function promoteCmd() {
            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                let args = message.content.slice(prefix.length).trim().split(/ +/g);
                let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
                if (!user) return message.channel.send("You must provide a user to promote");
                if (!user.tag) user = user.user;
                if (!result.preferences.modRole)
                    return message.channel.send("You need to set up a mod role in your server to use this command");

                let reason = args.slice(2).join(" ");
                if (!reason) reason = "No reason was provided";
                let member = message.guild.members.cache.get(user.id);

                if (!member.roles.cache.get(result.preferences.modRole)) {
                    await member.roles.add(result.preferences.modRole).catch(() => { return message.channel.send("I do not have permissions to use this command") });
                    message.channel.send(`<@!${user.id}> was promoted by <@!${message.author.id}>`)
                    embed.setTitle("User Promoted");
                    embed.setDescription(
                        `**User:** ${user}\n` +
                        `**User Tag:** ${user.tag}\n` +
                        `**User ID:** ${user.id}\n\n` +
                        `**Reason:** ${reason}\n\n` +
                        `**Moderator:** ${message.author}\n` +
                        `**Moderator Tag:** ${message.author.tag}\n` +
                        `**Moderator ID:** ${message.author.id}`);
                    embed.setColor(result.preferences ? result.preferences.embedColor : "#447ba1");
                    embed2.setTitle("You have been promoted");
                    embed2.addField(`Moderator`, message.author.tag);
                    embed2.addField(`Reason`, reason);
                    embed2.addField("Guild:", message.guild.name);
                    embed2.setColor(result.preferences ? result.preferences.embedColor : "#447ba1");
                    try {
                        await user.send(embed2)
                    } catch {
                        message.channel.send(`The user was not notified as they do not have their DMs turned on`)
                    }
                    logging(embed, message, client);
                } else
                    message.channel.send(`<@!${user.id}> is already a moderator`);
            });
        }

        if (message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR))
            promoteCmd();
        else 
            message.channel.send("You do not have the permissions to use this command");
    }
}