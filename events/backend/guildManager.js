const { MessageEmbed, } = require('discord.js');
const guildData = require('../client/database/models/guilds');
const embed = new MessageEmbed();
const embed2 = new MessageEmbed();
const logging = require('../../utils/functions').logging;

module.exports.add = async (guild, client) => {
    if (!guild.name) return;
    setTimeout(async function() {
        let channelID;
        let channels = guild.channels.cache;

        channelLoop:
        for (let key in channels) {
            let c = channels[key];
            if (c[1].type === "text") {
                channelID = c[0];
                break channelLoop;
            }
        }

        guildData.findOne({ guildId: guild.id }).then(async result => {
            let channel = await guild.channels.cache.get(guild.systemChannelID || channelID);
            embed.setTitle('Billybobbeep | Welcome');
            embed.setColor('#447ba1');
            embed.setTimestamp();
            embed.setDescription(`Thank you for adding me to your server.\n\nThe default prefix is \`~\`, You can change the prefix with the command \`~prefix\`\n\nTo view the commands view \`~cmds\` and to customise the bot for your server feel free to check out \`~setup\``);
            setTimeout(() => {
                try {
                    channel.send(embed);
                } catch {
                    console.log('Could not send welcome embed in ' + guild.name);
                }
            }, 300);
        });

        let role;
        guild.roles.create({
            data: {
                name: 'Billy 🤩',
                color: '#e5f7b2',
                permissions: 8
            }
        }).then(role => {
            guild.member(client.user).roles.add(role);
            role.setHoist(true);
            const highestRole = guild.me.roles.highest;
            role.setPosition(highestRole.position - 1);
        }).catch(() => { return });

        embed2.setTitle('Guild Added');
        embed2.setDescription(
        `**Guild Name:** ${guild.name}\n` +
        `**Guild ID:** ${guild.id}`);
        embed2.setColor('#447ba1');
        embed2.setTimestamp();
        embed2.setThumbnail(guild.iconURL({ dynamic: true }));
        embed2.setFooter(`Total Guilds: ${client.guilds.cache.size}`);
        logging(embed2, '733442092667502613', client, 'guild');

        const newData = new guildData({ guildId: guild.id, embedColor: '#447ba1' });
        newData.save();
    }, 1000);
}

module.exports.remove = (guild, client) => {
    if (!guild.name) return;
    const embed = new MessageEmbed()
        .setTitle('Guild Removed')
        .setDescription(
        `**Guild Name:** ${guild.name}\n` +
        `**Guild ID:** ${guild.id}`)
        .setColor('#447ba1')
        .setTimestamp()
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setFooter(`Total Guilds: ${client.guilds.cache.size}`);
    logging(embed, '733442092667502613', client, 'guild');

    const guildData = require('../client/database/models/guilds');
    guildData.findOne({ guildId: guild.id }).then(res => {
        if (!res) return;
        res.delete();
    });
    const guildMemberData = require('../client/database/models/guildMembers');
    guildMemberData.find(function(err, result) {
        if (err) return console.log(err);
        if (!result) return;
        result.forEach(data => {
            if (data.guildId && data.guildId === guild.id) {
                data.delete();
            }
        });
    });
}