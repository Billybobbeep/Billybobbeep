const configFile = require('../../utils/config.json');
const guildData = require('../client/database/models/guilds');
const { MessageEmbed } = require('discord.js');
const { relativeTimeRounding } = require('moment');

function redirect(message, client) {
    if (message.data) return;
    if (message.channel.id == configFile.PollChannel || message.channel.id == configFile.MemesChannel)
        require('../backend/reactions.js')(message);
    else {
        if (message.guild) {
            if (!message.guild.me.hasPermission('ADMINISTRATOR')) return;
            require('../backend/inviteLinks.js')(message, client);
            require('../backend/levelling.js')(message, client);
            require('../commands/counting.js').execute(message, client);
            require('../commands/mentions/mentions.js')(message, client);
            require('../backend/antiSpam.js').execute(message);
        } else {
            require('../backend/dmRecieving.js')(message, client);
        }
    }
    if (message.mentions.users.first())
        require('../commands/afkHandle.js').mentions(message);

    if (!message.author.bot) {
        if (message.guild) {
            const guildMemberData = require('./database/models/guildMembers');
            guildMemberData.findOne({ guildId: message.guild.id, memberId: message.author.id }).then(result => {
                if (!result) {
                    if (message.author.bot) return;
                    let newData = new guildMemberData({
                        guildId: message.guild.id,
                        memberId: message.author.id
                    });
                    newData.save();
                }
            });
        }
        const userData = require('./database/models/users');
        userData.findOne({ userId: message.author.id }).then(result => {
            if (!result) {
                let newData = new userData({
                    userId: message.author.id
                });
                newData.save();
            }
        });
    }
}

function handle(message, client) {
    let args = message.content.slice(1).trim().split(/ +/g);
    let command = args[0].toLowerCase();

    if (!message.guild && client.commands.get(command)) return message.channel.send('We do not support DM commands yet');
    if (!message.guild) return;
    guildData.findOne({ guildId: message.guild.id }).then(result => {
        if (!result) {
            let newData = new guildData({
                guildId: message.guild.id,
                embedColor: '#447ba1'
            });
            newData.save();
        }
        if (message.guild)
            var prefix = result.prefix || '~';
        else
            var prefix = '~';

        if (!message.content.toLowerCase().startsWith(prefix)) return;
        if (client.commands.get(command)) {
            if (client.commands.get(command).guildOnly && client.commands.get(command).guildOnly == true && !message.guild) return;
            if (message.guild && client.commands.get(command).catagory && client.commands.get(command).catagory == 'moderation') {
                if (!require('../../utils/functions').guildPerms.clientHasPermissions(message, client.commands.get(command)))
                    require('../../utils/functions').guildPerms.permissionCallback(message, client, (client.commands.get(command).permissions || 'UNKNOWN'))
            }
            try {
                client.commands.get(command).execute(message, prefix, client);
            } catch (err) {
                if (err.toString().includes('client.commands.get(...).execute is not a function')) return;
                else console.error(err);
            }
        }
    });
}

function handleSlashCommands(interaction, client) {
    const command = (interaction.data.name).toLowerCase();
    const args = interaction.data.options;

    if (!interaction.guild_id && client.commands.get(command)) return require('../../utils/functions').slashCommands.reply(interaction, client, 'We do not support DM commands yet');
    if (!interaction.guild_id) return;
    guildData.findOne({ guildId: interaction.guild_id }).then(result => {
        if (!result) {
            let newData = new guildData({
                guildId: interaction.guild_id,
                embedColor: '#447ba1'
            });
            newData.save();
        }

        if (client.commands.get(command)) {
            if (client.commands.get(command).guildOnly && client.commands.get(command).guildOnly == true && !interaction.guild_id)
                return require('../../utils/functions').slashCommands.reply(interaction, client, `${client.user.username} does not support DM commands, consider using commands via a server`);
            if (interaction.guild_id && client.commands.get(command).catagory && client.commands.get(command).catagory == 'moderation') {
                if (!require('../../utils/functions').slashCommands.clientHasPermissions(interaction, client.commands.get(command)))
                    require('../../utils/functions').slashCommands.permissionCallback(interaction, client, (client.commands.get(command).permissions || 'UNKNOWN'))
            }
            try {
                client.commands.get(command).execute(interaction, '/', client);
            } catch (err) {
                if (err.toString().includes('client.commands.get(...).execute is not a function')) return;
                else console.error(err);
            }
        }
    });
}

module.exports = (message, client) => {
    if (!message.data) {
        if (message.author.bot) return;
        redirect(message, client);
        handle(message, client);
    } else {
        if (message.member.user.bot) return;
        handleSlashCommands(message, client);
    }
}