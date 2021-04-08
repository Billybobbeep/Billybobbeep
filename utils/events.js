const event = (event) => require(`../events/client/${event}.js`);
const events = (event) => require(`../events/backend/${event}.js`)
module.exports = (client) => {
    client.once('ready', () => event('ready')(client));
    client.on('message', (message) => event('message')(message, client));
    client.on('guildMemberAdd', (member) => event('member').add(member, client));
    client.on('guildMemberRemove', (member) => event('member').remove(member, client));
    client.on('guildBanAdd', (guild, user) => events('logging').add(guild, user, client));
    client.on('guildBanRemove', (guild, user) => events('logging').remove(guild, user, client));
    client.on('guildCreate', (guild) => events('guildManager').add(guild, client));
    client.on('guildDelete', (guild) => events('guildManager').remove(guild, client));
    client.on('messageDelete', (message) => events('deleteMessages')(message, client));
    client.on('messageReactionAdd', (reaction, user) => require('../events/backend/reactionRoles/main.js').add(reaction, user, client));
    client.on('messageUpdate', (oldMessage, newMessage) => events('editMessage')(newMessage, oldMessage, client));
}