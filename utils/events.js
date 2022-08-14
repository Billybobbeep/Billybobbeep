const { Client } = require("discord.js");
const { dev } = require("./cache");

const clientEvents = (event) => require(`../events/client/${event}`);
const backendEvents = (event) => require(`../events/backgroundFunctions/${event}`);

/**
 * Setup the clients event listeners
 * @param {Client} client The bots client
 */
module.exports = (client) => {
  // Ready event
  client.on("ready", () => clientEvents("ready")(client));
  // Message event
  client.on("messageCreate", (message) => clientEvents("messageCreate")(message, client));
  // Interaction Create
  client.on("interactionCreate", (interaction) => clientEvents("interactionCreate")(interaction, client));

  if (!dev.enabled) { // Only listen to the following events if not in dev mode
    // Message delete event
    client.on("messageDelete", (message) => backendEvents("messageDelete")(message, client));
    // Message update event
    client.on("messageUpdate", (oMessage, nMessage) => backendEvents("messageUpdate")(oMessage, nMessage, client));
    
    // Message reaction add event
    client.on("messageReactionAdd", (reaction, user) => backendEvents("messageReactions").add(reaction, user, client));
    // Message reaction remove event
    client.on("messageReactionRemove", (reaction, user) => backendEvents("messageReactions").remove(reaction, user, client));

    // Guild member add event
    client.on("guildMemberAdd", (member) => backendEvents("guildMemberChange").add(member, client));
    // Guild member remove event
    client.on("guildMemberRemove", (member) => backendEvents("guildMemberChange").remove(member, client));
    // Guild member update event
    client.on("guildMemberUpdate", (oMember, nMember) => backendEvents("guildMemberChange").update(oMember, nMember, client));

    // Guild member ban event
    client.on("guildBanAdd", (ban) => backendEvents("guildMemberBan").add(ban, client));
    // Guild member unban event
    client.on("guildBanRemove", (ban) => backendEvents("guildMemberBan").remove(ban, client));

    // Guild create event
    client.on("guildCreate", (guild) => backendEvents("guildManager").create(guild, client));
    // Guild delete event
    client.on("guildDelete", (guild) => backendEvents("guildManager").delete(guild, client));

    // Guild event create
    client.on("guildScheduledEventCreate", (event) => backendEvents("guildScheduledEvents").create(event, client));
    // Guild event delete
    client.on("guildScheduledEventDelete", (event) => backendEvents("guildScheduledEvents").delete(event, client));
    // Guild event update
    client.on("guildScheduledEventUpdate", (oldEvent, newEvent) => backendEvents("guildScheduledEvents").update(oldEvent, newEvent, client));

    // Guild thread create
    client.on("threadCreate", (thread) => backendEvents("threadManager").create(thread, client));
    // Guild thread delete
    client.on("threadDelete", (thread) => backendEvents("threadManager").delete(thread, client));
    // Guild thread update
    client.on("threadUpdate", (oldThread, newThread) => backendEvents("threadManager").update(oldThread, newThread, client));

    // Guild channel create
    client.on("channelCreate", (channel) => backendEvents("channelManager").create(channel, client));
    // Guild channel delete
    client.on("channelDelete", (channel) => backendEvents("channelManager").delete(channel, client));
    // Guild channel update
    client.on("channelUpdate", (oldChannel, newChannel) => backendEvents("channelManager").update(oldChannel, newChannel, client));
  }
}