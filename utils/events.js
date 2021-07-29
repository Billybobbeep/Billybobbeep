const event = (event) => require(`../events/client/${event}`);
const events = (event) => require(`../events/backend/${event}`);

/**
 * Setup the clients event listeners
 * @param {*} client The bots client
 */
module.exports = (client) => {
    client.once('ready', () => event('ready')(client));
    client.on('message', (message) => event('message')(message, client));
    client.on('guildMemberAdd', (member) => process.argv[2] && process.argv[2] == '--guild-only' || event('member').add(member, client));
    client.on('guildMemberRemove', (member) => process.argv[2] && process.argv[2] == '--guild-only' || event('member').remove(member, client));
    client.on('guildMemberUpdate', (oldMember, newMember) => process.argv[2] && process.argv[2] == '--guild-only' || events('roles')(oldMember, newMember, client));
    client.on('guildBanAdd', (guild, user) => process.argv[2] && process.argv[2] == '--guild-only' || events('logging').add(guild, user, client));
    client.on('guildBanRemove', (guild, user) => process.argv[2] && process.argv[2] == '--guild-only' || events('logging').remove(guild, user, client));
    client.on('guildCreate', (guild) => process.argv[2] && process.argv[2] == '--guild-only' || events('guildManager').add(guild, client));
    client.on('guildDelete', (guild) => process.argv[2] && process.argv[2] == '--guild-only' || events('guildManager').remove(guild, client));
    client.on('messageDelete', (message) => process.argv[2] && process.argv[2] == '--guild-only' || events('deleteMessages')(message, client));
    client.on('messageReactionAdd', (reaction, user) => process.argv[2] && process.argv[2] == '--guild-only' || require('../events/backend/reactionRoles/main.js').add(reaction, user, client));
    client.on('messageUpdate', (oldMessage, newMessage) => process.argv[2] && process.argv[2] == '--guild-only' || events('editMessage')(newMessage, oldMessage, client));
    client.on('clickButton', (button) => process.argv[2] && process.argv[2] == '--guild-only' || events('buttonClick')(button, client));
    client.ws.on('INTERACTION_CREATE', async interaction => event('message')(interaction, client));
}