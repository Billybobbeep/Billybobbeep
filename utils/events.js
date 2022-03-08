const event = (event) => require(`../events/client/${event}`);
const events = (event) => require(`../events/backend/${event}`);

/**
 * Setup the clients event listeners
 * @param {Client} client The bots client
 */
module.exports = (client) => {
    client.once("ready", () => event("ready")(client));
    client.on("messageCreate", (message) => event("message")(message, client));
    client.on("guildMemberAdd", (member) => require("./cache").dev.get() || event("member").add(member, client));
    client.on("guildMemberRemove", (member) => require("./cache").dev.get() || event("member").remove(member, client));
    client.on("guildMemberUpdate", (oldMember, newMember) => require("./cache").dev.get() || events("roles")(oldMember, newMember, client));
    client.on("guildBanAdd", (guild) => require("./cache").dev.get() || events("logging").add(guild, client));
    client.on("guildBanRemove", (guild) => require("./cache").dev.get() || events("logging").remove(guild, client));
    client.on("guildCreate", (guild) => require("./cache").dev.get() || events("guildManager").add(guild, client));
    client.on("guildDelete", (guild) => require("./cache").dev.get() || events("guildManager").remove(guild, client));
    client.on("messageDelete", (message) => require("./cache").dev.get() || events("deleteMessages")(message, client));
    client.on("messageReactionAdd", (reaction, user) => require("./cache").dev.get() || require("../events/backend/reactionRoles/main.js").add(reaction, user, client));
    client.on("messageUpdate", (oldMessage, newMessage) => require("./cache").dev.get() || events("editMessage")(newMessage, oldMessage, client));
    // client.on("clickButton", (button) => require("./cache").dev.get() || events("buttonClick")(button, client));
    client.ws.on("INTERACTION_CREATE", async interaction => event("message")(interaction, client));
}