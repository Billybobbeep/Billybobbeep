const { Client, GuildMember, EmbedBuilder } = require("discord.js");
const { logging } = require("../../utils/functions");
const guilds = require("../../database/models/guilds");
const guildMembers = require("../../database/models/guildMembers");

/**
 * 
 * @param {*} guildObj The guild member object from the database
 * @param {GuildMember} member The guild member object
 */
async function updateServerStats(guildObj, member) {
  /**
   * Replace string variables with a value
   * @param {string} str The string to replace
   */
  function replaceVariables(str) {
    str = str.replaceAll("{totalCount}", member.guild.memberCount);
    str = str.replaceAll("{totalBots}", member.guild.members.cache.filter(m => m.user.bot).size);
    str = str.replaceAll("{botCount}", member.guild.members.cache.filter(m => m.user.bot).size);
    str = str.replaceAll("{totalUsers}", member.guild.members.cache.filter(m => !m.user.bot).size);
    str = str.replaceAll("{memberCount}", member.guild.members.cache.filter(m => !m.user.bot).size);
    
    return str;
  }
  // If the server stats channels have been enabled
  if (guildObj?.preferences?.serverStats?.enabled) {
    // Total member
    let totalCount = guildObj?.preferences?.serverStats?.totalCount;
    let totalBots = guildObj?.preferences?.serverStats?.totalBots;
    let totalMembers = guildObj?.preferences?.serverStats?.totalMembers;

    if (totalCount?.channelId) { // If the total member count is enabled
      // Find the channel
      let channel = await member.guild.channels.fetch(totalCount.channelId);
      let text = totalCount.text || "All Members: {totalCount}";

      // Replace the placeholders
      text = replaceVariables(text);

      if (channel) { // If the channel provided exists
        // Edit the channel name
        channel.setName(text, "Server stats update");
      }
    }
    if (totalBots?.channelId) { // If the total member count is enabled
      // Find the channel
      let channel = await member.guild.channels.fetch(totalBots.channelId);
      let text = totalBots.text || "Total Bots: {botCount}";

      // Replace the placeholders
      text = replaceVariables(text);

      if (channel) { // If the channel provided exists
        // Edit the channel name
        channel.setName(text, "Server statistics update");
      }
    }
    if (totalMembers?.channelId) { // If the total member count is enabled
      // Find the channel
      let channel = await member.guild.channels.fetch(totalMembers.channelId);
      let text = totalMembers.text || "Total Members: {memberCount}";

      // Replace the placeholders
      text = replaceVariables(text);

      if (channel) { // If the channel provided exists
        // Edit the channel name
        channel.setName(text, "Server statistics update");
      }
    }
  }
}

/**
 * Replace string variables with a value
 * @param {string} str The string to replace
 * @param {GuildMember} member The guild member object
 */
function replaceVariables(str, member) {
  str = str.replaceAll("{user}", `<@!${member.user.id}>`);
  str = str.replaceAll("{user.tag}", member.user.tag);
  str = str.replaceAll("{user.id}", member.user.id);
  str = str.replaceAll("{server}", member.guild.name);
  str = str.replaceAll("{server.name}", member.guild.name);
  str = str.replaceAll("{server.id}", member.guild.id);
  str = str.replaceAll("{server.memberCount}", member.guild.memberCount);
  
  return str;
}

/**
 * A function to handle when a guild member joins the server
 * @param {GuildMember} member The member that joined the server
 * @param {Client} client The bots client
 */
module.exports.add = async function(member, _client) {
  // Ensure the member object is valid
  if (!member instanceof GuildMember) return;

  // Find the guild from the database
  let guildObj = await guilds.findOne({ guildId: member.guild.id });

  // If the welcome channel is enabled
  if (guildObj?.preferences?.welcomeChannel?.enabled) {
    // Define the properties
    let channelId = guildObj.preferences?.welcomeChannel?.channelId;
    let message = guildObj.preferences?.welcomeChannel?.joinMessage;
    // Find the channel
    let channel = await member.guild.channels.fetch(channelId || null);

    if (channel) { // If the channel provided exists
      // If the message doesn't exist, use the default
      if (!message)
        message = `${member.user.tag} has left the server`;

      // Replace the placeholders
      message = replaceVariables(message, member);
      
      // Send a message to the servers welcome channel
      channel.send(message);
    }
  }

  // Update the server stats
  updateServerStats(guildObj);

  // Give the members any automatic roles
  if (guildObj?.preferences?.autoRoles && Array.isArray(guildObj.preferences.autoRoles.roleIds)) {
    // Ensure the user isn't a bot
    if (guildObj?.preferences?.autoRoles.includeBots === false && member.user.bot) return;

    // Get the roles to give the member
    (guildObj.preferences.autoRoles.roleIds).forEach(roleId => {
      // If the role exists, give the member the role
      if (roleId) {
        member.roles.add(roleId);
      }
    });
  }
}

/**
 * A function to handle when a guild member left the server
 * @param {GuildMember} member The member that left the server
 * @param {Client} client The bots client
 */
module.exports.remove = async function(member, _client) {
  // Ensure the member object is valid
  if (!member instanceof GuildMember) return;

  // Remove the member from the database
  guildMembers.deleteOne({
    memberId: member.user.id,
    guildId: member.guild.id
  }).catch(() => null);

  // Find the guild from the database
  let guildObj = await guilds.findOne({ guildId: member.guild.id });

  if (guildObj?.preferences?.welcomeChannel?.enabled) {
    // Define the properties
    let channelId = guildObj.preferences?.welcomeChannel?.channelId;
    let message = guildObj.preferences?.welcomeChannel?.leaveMessage;
    // Find the channel
    let channel = await member.guild.channels.fetch(channelId || null);

    if (channel) { // If the channel provided exists
      // If the message doesn't exist, use the default
      if (!message)
        message = `${member.user.tag} has left the server`;

      // Replace the placeholders
      message = replaceVariables(message, member);
      
      // Send a message to the servers welcome channel
      channel.send(message);
    }
  }

  // Update the server stats
  updateServerStats(guildObj);
}

/**
 * A function to handle when a guild member object gets updated
 * @param {GuildMember} oldMember The old member object
 * @param {GuildMember} newMember The new member object
 * @param {Client} client The bots client
 */
module.exports.update = async function(oldMember, newMember, client) {
  // Ensure the member object is valid
  if (
    !oldMember instanceof GuildMember ||
    !newMember instanceof GuildMember
  ) return;

  // Find the guild from the database
  let guildObj = await guilds.findOne({ guildId: newMember.guild.id });
  let loggingTypes = guildObj?.preferences?.loggingTypes;

  // Define the embed
  const embed = new EmbedBuilder();
  // Set default properties
  embed.setColor("#447ba1");
  embed.setTimestamp();

  // If the user's roles have been changed
  if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
    // Ensure logging is enabled for this type
    if (!loggingTypes?.roleUpdates) return;
    // Set the embed description
    embed.setDescription(`**${newMember.user.username}**'s roles have been updated`);
    embed.setAuthor({
      name: newMember.user.tag,
      iconURL: newMember.user.displayAvatarURL()
    });

    if (oldMember.roles.cache.size > newMember.roles.cache.size) { // If roles have been removed
      // Find the removed roles and append them to the embed
      (oldMember.roles.cache).forEach(role => {
        if (!role) return;
        if (!newMember.roles.cache.has(role.id)) {
          embed.addFields([{
            name: "Role Removed",
            value: `<@&${role.id}>`
          }]);

          // If auto roles are enforced
          if (guildObj?.preferences?.autoRoles?.enforceRoles) {
            // Ensure the user is not a bot if the auto roles do not include bots
            if (!guildObj?.preferences?.autoRoles?.includeBots && newMember.user.bot) return;
            // Ensure the removed role is not an auto role
            if ((guildObj.preferences.autoRoles.roleIds).includes(role.id)) {
              // Add the role to the user
              newMember.roles.add(role.id, "This role is an enforced auto role");
            }
          }
        }
      });
    } else if (oldMember.roles.cache.size < newMember.roles.cache.size) { // If roles have been added
      // Find the new roles and append them to the embed
      (newMember.roles.cache).forEach(role => {
        if (!role) return;
        if (!oldMember.roles.cache.has(role.id)) {
          embed.addFields([{
            name: "Role Added",
            value: `<@&${role.id}>`
          }]);
          if ((guildObj?.preferences?.autoRoles?.roleIds || []).includes(role.id)) {
            embed.setFooter({ text: guildObj.preferences.autoRoles.enforceRoles ? "Enforced auto role" : "Auto role" });
          }
        }
      });
    }

    // Send the embed
    logging(embed, newMember.guild, client, { type: "guild", messageType: "embed" });
  }
  
  // If the user's nickname has been changed
  if (oldMember.nickname !== newMember.nickname) {
    // Ensure logging is enabled for this type
    if (!loggingTypes?.nicknameUpdates) return;
    // Set the embed data
    embed.setTitle("Nickname Updated");
    embed.setDescription([
      `**User:** <@!${newMember.user.id}>`,
      `**User Tag:** ${newMember.user.tag}`,
      `**User ID:** ${newMember.user.id}\n`,
      `**Old Nickname:** ${oldMember.nickname || "None"}`,
      `**New Nickname:** ${newMember.nickname || "None"}`
    ].join("\n"));

    // Send the embed
    logging(embed, newMember.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the user's avatar has been changed
  if (oldMember.user.avatar !== newMember.user.avatar) {
    if (!loggingTypes?.avatarUpdates) return;
    // Set the embed data
    embed.setTitle("Avatar Updated");
    embed.setDescription([
      `**User:** <@!${newMember.user.id}>`,
      `**User Tag:** ${newMember.user.tag}`,
      `**User ID:** ${newMember.user.id}\n`,
      `**Old Avatar:** ${oldMember.user.avatar ? oldMember.user.avatarURL() : "None"}`,
      `**New Avatar:** ${newMember.user.avatar ? newMember.user.avatarURL() : "None"}`
    ].join("\n"));

    // Send the embed
    logging(embed, newMember.guild, client, { type: "guild", messageType: "embed" });
  }

  // If the user's username has been changed
  if (oldMember.user.username !== newMember.user.username) {
    // Ensure logging is enabled for this type
    if (!loggingTypes?.usernameUpdates) return;
    // Set the embed data
    embed.setTitle("Username Updated");
    embed.setDescription([
      `**User:** <@!${newMember.user.id}>`,
      `**User Tag:** ${newMember.user.tag}`,
      `**User ID:** ${newMember.user.id}\n`,
      `**Old Username:** ${oldMember.user.username}`,
      `**New Username:** ${newMember.user.username}`
    ].join("\n"));

    // Send the embed
    logging(embed, newMember.guild, client, { type: "guild", messageType: "embed" });
  }
}