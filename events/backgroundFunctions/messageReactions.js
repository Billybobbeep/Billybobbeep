const { MessageReaction, User, Client } = require("discord.js");
const guilds = require("../../database/models/guilds");

/**
 * A function that handles message reactions
 * @param {MessageReaction} reaction The reaction that was added
 * @param {User} user The user that added the reaction
 * @param {Client} client The bots client
 */
module.exports.add = async function(reaction, user, client) {
console.log("reaction add");

  // Define the error flag
  let errorExists = false;

  // Ensure the member is not a bot
  if (user.bot) return;
  if (reaction?.partial) {
    reaction = await reaction
      .fetch()
      .catch(() => errorExists = true);
  }

  // Ensure an error doesn't exist
  if (errorExists) return;

  // Ensure all parameters are valid
  if (
    !reaction instanceof MessageReaction ||
    !user instanceof User ||
    !client instanceof Client
  ) return;

  let guild = reaction.message.guild;
  let member = await guild.members.fetch(user.id);

  // Ensure the member exists
  if (!member) return;

  let guildObj = await guilds.findOne({ guildId: guild.id });

  // Create a new guild object in the database if one doesn't already exist
  if (!guildObj) {
    guildObj = new guilds({
      guildId: guild.id,
    });
    guildObj.save();
  }

  // Ensure reaction roles have been setup in the server
  if (!guildObj.reactionRoles || !Array.isArray(guildObj.reactionRoles)) return;

  // Ensure the message is in the list of reaction roles
  if (!(guildObj.reactionRoles).some(r => r.messageId === reaction.message.id)) return;

  let reactionRoles = (guildObj.reactionRoles).find(r => r.messageId === reaction.message.id);
  let validReaction = reactionRoles.reactions.find(r => r.emoji === reaction.emoji.name);

  // Ensure the reaction is valid
  if (!validReaction) return;

  console.log("valid reaction");

  // Give the member the role
  member.roles.add(validReaction.roleId);
}

/**
 * A function that handles message reactions
 * @param {MessageReaction} reaction The reaction that was removed
 * @param {User} user The user that removed the reaction
 * @param {Client} client The bots client
 */
module.exports.remove = async function(reaction, user, client) {
console.log("reaction remove");

  // Define the error flag
  let errorExists = false;

  // Ensure the member is not a bot
  if (user.bot) return;
  if (reaction?.partial) {
    reaction = await reaction
      .fetch()
      .catch(() => errorExists = true);
  }

  // Ensure an error doesn't exist
  if (errorExists) return;

  // Ensure all parameters are valid
  if (
    !reaction instanceof MessageReaction ||
    !user instanceof User ||
    !client instanceof Client
  ) return;

  let guild = reaction.message.guild;
  let member = await guild.members.fetch(user.id);

  // Ensure the member exists
  if (!member) return;

  let guildObj = await guilds.findOne({ guildId: guild.id });

  // Create a new guild object in the database if one doesn't already exist
  if (!guildObj) {
    guildObj = new guilds({
      guildId: guild.id,
    });
    guildObj.save();
  }

  // Ensure reaction roles have been setup in the server
  if (!guildObj.reactionRoles || !Array.isArray(guildObj.reactionRoles)) return;

  // Ensure the message is in the list of reaction roles
  if (!(guildObj.reactionRoles).some(r => r.messageId === reaction.message.id)) return;

  let reactionRoles = (guildObj.reactionRoles).find(r => r.messageId === reaction.message.id);
  let validReaction = reactionRoles.reactions.find(r => r.emoji === reaction.emoji.name);

  // Ensure the reaction is valid
  if (!validReaction) return;

  // Remove the role
  member.roles.remove(validReaction.roleId);
}