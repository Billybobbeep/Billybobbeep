const { Permissions } = require('discord.js');
const guildData = require('../client/database/models/guilds');

/**
 * Basic functionality:
 *     - Add users and guilds to the database if they're not already indexed
 *     - Check if the message contains an invite link, is in the counting channel or is spam
 * @param {object} message The sent message
 * @param {Client} client The bots client
 */
function redirect(message, client) {
    // If the message is marked interaction, return
    if (message.data) return;
    // If the message is in a guild
    if (message.guild) {
        // If the client has administrator privileges
        const me = message.guild.members.cache.get(client.user.id);
        if (me.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            // Execute backend files
            require('../backend/inviteLinks.js')(message, client);
            require('../backend/levelling.js')(message, client);
            require('../commands/counting.js').execute(message, client);
            require('../commands/mentions.js')(message, client);
            require('../backend/antiSpam.js').execute(message);
        }
    } else
        require('../backend/dmRecieving.js')(message, client); // Record incoming DMs
    if (message.mentions.users.first())
        require('../commands/afkHandle.js').mentions(message); // Handle AFK messages

    // If the message author is not a bot
    if (!message.author.bot) {
        // If the message was sent in a guild
        if (message.guild) {
            // Ensure the guild is in the database
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
        // Ensure the user is in the database
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

/**
 * Handle bot commands
 * @param {object} message The sent message
 * @param {Client} client The bots client
 */
function handleMessage(message, client) {
    // Define variables
    let args = (message.content).slice(1).trim().split(/ +/g);
    let command = args[0].toLowerCase();

    // If the command was executed in a DM channel
    if (!message.guild && client.commands.get(command))
        return message.channel.send(`${client.user.username} does not support DM commands, consider using commands via a mutual server`);
    // Return if the message was in a DM channel
    if (!message.guild) return;
    // Search for the guild in the database
    guildData.findOne({ guildId: message.guild.id }).then(result => {
        // If the guild doesn't exist in the database, add it
        let prefix;
        // Find the servers preferred prefix
        if (message.guild)
            prefix = result?.prefix || '~';
        else
            prefix = '~';

        // If the message wasn't a command for the bot
        if (!(message.content).toLowerCase().startsWith(prefix)) return;
        // If the command actually exists
        if (client.commands.get(command)) {
            // If the command is marked as guild-only and the message was not executed in a guild, return
            if (client.commands.get(command).guildOnly && !message.guild) return;
            // If the command catagory is for moderators only, check the client has the correct permissions to actually execute the command
            if (message.guild && client.commands.get(command).catagory && client.commands.get(command).catagory == 'moderation') {
                if (!require('../../utils/functions').guildPerms.clientpermissions(client, message, client.commands.get(command)))
                    require('../../utils/functions').guildPerms.permissionCallback(message, client, (client.commands.get(command).permissions || 'UNKNOWN'))
            }
            try {
                // Execute the command
                client.commands.get(command).execute(message, prefix, client);
            } catch (err) {
                // Fallback if the command failed to execute
                if (err.toString().includes('client.commands.get(...).execute is not a function')) return;
                else console.log(err);
            }
        }
    });
}

/**
 * Handle slash commands
 * @param {object} interaction The interaction
 * @param {Client} client The bots client
 */
function handleSlashCommand(interaction, client) {
    // Get the command name
    const command = (interaction.data.name).toLowerCase();

    // Fallback if the slash command was executed in a DM channel or the comma dis not registered in client.commands
    if (!interaction.guild_id && !client.commands.get(command))
        return require('../../utils/functions').slashCommands.reply(interaction, client, `${client.user.username} does not support DM commands, consider using commands via a mutual server`);

    // If the command exists in client.commands
    if (client.commands.get(command)) {
        // If the command is registered as a guild-only command and the command was executed in a DM, return a friendly message
        if (client.commands.get(command).guildOnly && !interaction.guild_id)
            return require('../../utils/functions').slashCommands.reply(interaction, client, `The command \`/${command}\` is a guild-only command, consider using this command via a mutual server`);
        // If the command catagory is for moderators only, check the client has the correct permissions to actually execute the command
        if (typeof client.commands.get(command).catagory == 'string' && client.commands.get(command).catagory == 'moderation') {
            if (!require('../../utils/functions').slashCommands.clientpermissions(client, interaction, client.commands.get(command)))
                require('../../utils/functions').slashCommands.permissionCallback(interaction, client, (client.commands.get(command).permissions || 'UNKNOWN'))
        }
        try {
            // Execute the command
            client.commands.get(command).execute(interaction, '/', client);
        } catch (err) {
            // Fallback if the command failed to execute
            if (err.toString().includes('client.commands.get(...).execute is not a function')) return;
            else console.log(err);
        }
    }
}

/**
 * Handle when someone clicks a button
 * @param {object} interaction The interaction
 * @param {Client} client The bots client
 */
function handleButtonClick(interaction, client) {
    if (typeof interaction.data.custom_id !== 'string') return; // If there's no custom ID to find the button callback, return
    if (interaction.message.author.id !== client.user.id) return; // If the message was not created by the bot
    // If the ID of the button is linked with a command
    if (
        client.commands.get((interaction.data.custom_id).split('-')[0]) &&
        typeof client.commands.get((interaction.data.custom_id).split('-')[0]).buttonCallback == 'function'
    ) {
        client.commands.get((interaction.data.custom_id).split('-')[0]).buttonCallback(interaction, client);
    }
}

/**
 * Handle incoming commands, messages or button clicks
 * @param {object} message The interaction/message
 * @param {Client} client The bots client
 */
module.exports = function(message, client) {
    if (!message.interaction && message.author) { // If the message is a normal message
        // If the bot is in dev mode and the server is not the dev server, return
        if (require('../../utils/cache').dev.get() && !message.guild) return;
        if (require('../../utils/cache').dev.get() && message.guild.id !== require('../../utils/config.json').DevServer) return;
        // If the message author is a bot, return
        if (message.author.bot) return;
        // Handle message
        redirect(message, client);
        handleMessage(message, client);
    } else if (
        message.data && message.data.custom_id &&
        message.data.component_type
    ) { // If the message type was a button click
        // If the bot is in dev mode and the server is not the dev server, return
        if (require('../../utils/cache').dev.get() && message.guild_id !== require('../../utils/config.json').DevServer) return;
        handleButtonClick(message, client); // Handle interaction
    } else if (message.data) { // If the message type is a slash command
        // If the bot is in dev mode and the server is not the dev server, return
        if (require('../../utils/cache').dev.get() && message.guild_id !== require('../../utils/config.json').DevServer) return;
        handleSlashCommand(message, client); // Handle interaction
    }

    // If none of the above criterias match, the feature is not supported
}