const Discord = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');

module.exports = {
    name: 'poll',
    description: 'Send a poll',
    catagory: 'generator',
    guildOnly: true,
    slashInfo: { enabled: true, public: true, options: { mod: true }},
    options: [{ name: 'description', description: 'The poll description', type: 3, required: true }, { name: 'title', description: 'The poll title', type: 3, required: false }, { name: 'channel', description: 'The channel to send the poll in', type: 7, required: false }],
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute (message, prefix, client) {
        if (!message.data) {
            guildData.findOne({ guildId: message.guild.id }).then(async result => {
                let args = message.content.slice(prefix.length).trim().split(/ +/g);
                let channel = message.mentions.channels.first();
                let desc = args.slice(2).join(' ');

                if (!channel) message.channel.send(`Usage: ${result.prefix}poll \`#channel\` [description]`);
                if (!isNaN(channel)) channel = client.channels.fetch(channel);

                const embed = new Discord.MessageEmbed()
                    .setTitle('New Poll!')
                    .setDescription(desc)
                    .setColor(result.preferences ? result.preferences.embedColor : '#447ba1')
                    .setFooter(`Poll created by: ${message.author.tag}`)
                let msg = await channel.send(embedPoll);
                await msg.react('👍');
                await msg.react('👎');
            });
        } else {
            guildData.findOne({ guildId: message.guild_id }).then(async result => {
                let channel = message.data.options[2] ? message.data.options[2].value : message.channel_id;
                if (!isNaN(channel)) channel = await client.channels.fetch(channel);
                else channel = await client.channels.fetch(channel.id)
                let embed = new Discord.MessageEmbed()
                    .setTitle(message.data.options[1] ? message.data.options[1].value : 'New Poll!')
                    .setDescription(message.data.options[0].value)
                    .setColor(result.preferences ? result.preferences.embedColor : '#447ba1')
                    .setFooter(`Poll created by: ${message.member.user.username}#${message.member.user.discriminator}`)
                require('../../utils/functions').slashCommands.reply(message, client, 'I have posted your poll');
                let msg = await channel.send({ embeds: [embed] });
                await msg.react('👍');
                await msg.react('👎');
            });
        }
    }
}