const Discord = require('discord.js');
const configFile = require('../../structure/config.json');
const db = require('quick.db');

module.exports = {
    name: 'userinfo',
    description: 'View a users info.',
    catagory: 'info',
    guildOnly: true,
    execute (message, prefix, client) {
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        const moment = require('moment');
        if (!user) return message.channel.send('Please specify a user.')
        if (!user.avatarURL) user = user.user
        if (user.presence.status === "dnd") user.presence.status = "Do Not Disturb";
        if (user.presence.status === "idle") user.presence.status = "Idle";
        if (user.presence.status === "offline") user.presence.status = "Offline";
        if (user.presence.status === "online") user.presence.status = "Online";
        
        function game() {
            let game;
            if (user.presence.activities.length >= 1) game = `${user.presence.activities[0].type} ${user.presence.activities[0].name}`;
            else if (user.presence.activities.length <1) game = "None"; //If the user is not playing a game.
            return game;
        }
        let x = Date.now() - user.createdAt; //When the user created their account.
        let y = Date.now() - message.guild.members.cache.get(user.id).joinedAt; //When the user joined the server.
        let created = Math.floor(x / 86400000); //5 digits-zero
        let joined = Math.floor(y / 86400000);

        const member = message.guild.member(user)
        let nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : "None";
        let createdate = moment.utc(user.createdAt).format("dddd, MMMM Do YYYY, HH:MM:ss"); //User Created Date.
        let joindate = moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss"); // User joined the server at.
        let status = user.presence.status;
        let avatar = user.avatarURL({size: 2048});

        const userinfoembed = new Discord.MessageEmbed()
        .setAuthor(user.tag, avatar)
        .setThumbnail(avatar)
        .setTimestamp()
        .setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`)
        .addField("ID", user.id, true)
        .addField("Nickname", nickname, true)
        .addField("Created Account Date", `${createdate} \nCreated ${created} day(s) ago`, true)
        .addField("Join Server Date", `${joindate} \nJoined ${joined} day(s) ago`, true)
        .addField("Status", status, true)
        .addField("Activity", game(), true)
        .setFooter(`Requested by: ${message.author.tag}`)
        message.channel.send(userinfoembed);
    }
}