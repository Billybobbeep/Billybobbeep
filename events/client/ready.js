const { Client, Routes, ActivityType, Guild} = require("discord.js");
const { REST } = require("@discordjs/rest");
const { default: axios } = require("axios");
const fs = require("fs");
const guilds = require("../../database/models/guilds");
// Define the API client to connect with Discord
const rest = new REST({ version: "10" }).setToken(process.env.token);

/**
 * Delete a slash command
 * @param {Client} client The bots client
 * @param {?string} guildId The guild connected to the command
 * @param {object} command The command to delete
 */
async function deleteCommand(client, guildId, command) {
  console.log("delete command: " + command.name);
  if (guildId) {
    return await axios
      .delete(`https://discord.com/api/v10/applications/${client.user.id}/guilds/${guildId}/commands/${command.id}`, { headers: { Authorization: `Bot ${process.env.token}` }})
      .catch(() => null);
  } else {
    return await axios
      .delete(`https://discord.com/api/v10/applications/${client.user.id}/commands/${command.id}`, { headers: { Authorization: `Bot ${process.env.token}` }})
      .catch(() => null);
  }
}

/**
 * Post all slash commands to Discord
 * @param {Array} data The slash command data
 * @param {?string} to The guild to post the slash commands to
 * @param {Client} client The bots client
 */
async function postSlashCommands(data, to, client) {
  if (!to) {
    // Post command to all guilds
    return await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: data }
    )
    // .catch(() => console.log("Error posting slash commands"));
  } else {
    // Post command for use only in a specific server
    return await rest.put(
      Routes.applicationGuildCommands(client.user.id, to),
      { body: data }
    )
    // .catch(() => console.log("Error posting slash commands"));
  }
}

/**
 * Post slash commands 
 * @param {string} directory The directory name
 * @param {Client} client The bots client
 * @param {Guild} guild The guild to post the slash commands to
 */
async function setupSlashCommands(directory, client, guild) {
  let globalCommands = [];
  let privateCommands = [];

	// Loop through known command files
	const commandFolders = fs.readdirSync(`./${directory}`).filter(file => !file.endsWith(".js") && !file.endsWith(".json"));
	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./${directory}/${folder}`).filter(file => file.endsWith(".js"));
		for (const file of commandFiles) {
      // Find the command object
			const command = require(`../../${directory}/${folder}/${file}`);
			// Ensure the command supports slash
			if (command.template === true || !command.slashInfo?.enabled) continue;

      // Get the slash data
      let data = command.getSlashInfo();

      // If the command is set to moderators only
      if (["mod", "moderation"].includes(command.category)) {
        data.permissions = [];
        // Loop through every guild in the database to find their mod role and add it to the moderators array
        guilds.find(function(err, data1) {
          if (err || !data) return;
          data1.forEach(guild => {
            // Define the guild ID for the command
            data.guild = guild.id;

            // If the server has setup a mod role
            // Some older servers in the database may not have converted to the new schema type
            if (guild.modRole || guild.preferences?.modRole) {
              // Add the role into the permissions array
              data.permissions.push({
                roleId: guild.modRole || guild.preferences?.modRole,
                guildId: guild.id,
                type: 1, // 1 = role
                permission: true
              });
            }
            // If the server has setup multiple mod roles
            if (Array.isArray(guild.preferences?.modRoles)) {
              [...guild.preferences?.modRoles].forEach(roleId => {
                console.log("modrole ID: " + roleId);
                // Add the role into the permissions array
                data.permissions.push({
                  roleId: roleId,
                  guildId: guild.id,
                  type: 1, // 1 = role
                  permission: true
                });
              });
            }
            // If the server has setup custom mods
            if (Array.isArray(guild.preferences?.customMods)) {
              [...guild.preferences?.customMods].forEach(userId => {
                // Add the role into the permissions array
                data.permissions.push({
                  userId: userId,
                  guildId: guild.id,
                  type: 2, // 2 = user
                  permission: true
                });
              });
            }
          });
        });
      }

      // Post the command to Discord
      if (command.slashInfo.public && !["mod", "moderation"].includes(command.category)) { // If the slash command is public and not for moderators
        // Push the command into the global commands array
        globalCommands.push(data);
      } else { // If the slash command is in testing
        // Push the command to the private commands array
        privateCommands.push(data);
      }
		}
	}

	// Do the same as above just checking for command files in the directory instead of sub-folder
	const commandFiles = fs.readdirSync(`./${directory}`).filter(file => file.endsWith(".js"));
	if (commandFiles.length >= 1) {
		for (const file of commandFiles) {
      // Get the command object
			const command = require(`../../${directory}/${file}`);

      // Ensure the command supports slash
			if (command.template === true || !command.slashInfo?.enabled) continue;

      // Get the slash data
      let data = command.getSlashInfo();

      // If the command is set to moderators only
      if ((typeof command.slashInfo.options == "object" && command.slashInfo.options.mod)) {
        data.permissions = [];
        // Loop through every guild in the database to find their mod role and add it to the moderators array
        guilds.find(function(err, data1) {
          if (err || !data) return; // If there was an error or the data is empty, return
          // Loop through every guild in the database
          data1.forEach(guild => {
            // If the server has setup a mod role
            // Some older servers in the database may not have converted to the new schema type
            if (guild.modRole || guild.preferences?.modRole) {
              // Add the role into the permissions array
              data.permissions.push({
                id: guild.modRole || guild.preferences?.modRole,
                type: 1, // 1 = role
                permission: true
              });
            }
            // If the server has setup multiple mod roles
            if (Array.isArray(guild.preferences?.modRoles)) {
              [...guild.preferences?.modRoles].forEach(roleId => {
                // Add the role into the permissions array
                data.permissions.push({
                  id: roleId,
                  type: 1, // 1 = role
                  permission: true
                });
              });
            }
            // If the server has setup custom mods
            if (Array.isArray(guild.preferences?.customMods)) {
              [...guild.preferences?.customMods].forEach(userId => {
                // Add the role into the permissions array
                data.permissions.push({
                  id: userId,
                  type: 2, // 2 = user
                  permission: true
                });
              });
            }
          });
        });

        // Post the command to Discord
        if (command.slashInfo.public && !guild) { // If the slash command is public and a guild is not provided
          // Push the command into the global commands array
          globalCommands.push(data);
        } else { // If the slash command is in testing
          // Push the command to the private commands array
          privateCommands.push(data);
        }
			}
		}
	}

  // Post the global commands to Discord
  if (globalCommands.length > 0) {
    postSlashCommands(globalCommands, null, client);
  }
  // Post the private commands to Discord
  if (privateCommands.length > 0) {
    let devCommands = privateCommands.filter(x => typeof x.guild !== "string" || x.guild === require("../../utils/config.json").DevServer);
    postSlashCommands(devCommands, require("../../utils/config.json").DevServer, client);
    
    let guilds = privateCommands.map(x => x.guild).filter((cmd, index, self) => self.indexOf(cmd) !== index);
    guilds.forEach(g => {
      postSlashCommands(privateCommands.filter(x => x.guild === g), g, client);
    });
  }

  // Fetch all registered commands
  let commands = await rest.get(
    Routes.applicationCommands(client.user.id)
  ).catch(() => null);

  client.guilds.cache.forEach(async (guild) => {
    let guildcommands = await rest.get(
      Routes.applicationGuildCommands(client.user.id, guild.id)
    ).catch(() => null);

    if (!guildcommands) return;

    // Delete non-public slash command(s) from guilds
    for await (let command of [...guildcommands]) {
      // If the command doesn't exist anymore
      if (!client.commands.get(command.name)) {
        await deleteCommand(client, guild.id, command);
      }
      // If the command is not public or no longer supports slash
      if (!client.commands.get(command.name)?.slashInfo || !client.commands.get(command.name)?.slashInfo?.public) {
        deleteCommand(client, guild.id, command);
      }
    }

    // Remove duplicate commands
    [...guildcommands]
      .filter(function(cmd, index, self) {
        // Filter all duplicate commands
        return self.indexOf(cmd) !== index;
      })
      .forEach(cmd => {
        deleteCommand(client, guild.id, cmd);
      });
  });

  // Delete non-public slash command(s) from guilds
  [...commands].forEach(async command => {
    // If the command doesn't exist anymore
    if (!client.commands.get(command.name))
      await deleteCommand(client, null, command);
    // If the command is not public or no longer supports slash
    if (!client.commands.get(command.name)?.slashInfo || !client.commands.get(command.name)?.slashInfo?.public)
      deleteCommand(client, null, command);
  });

  // Remove duplicate commands
  [...commands]
    .filter(function(cmd, index, self) {
      // Filter all duplicate commands
      return self.indexOf(cmd) !== index;
    })
    .forEach(cmd => {
      deleteCommand(client, null, cmd);
    });
}

/**
 * Setup the client
 * @param {Client} client The bots client
 */
module.exports = function(client) {
  // Activities to loop through
	let activities = [`~help`, `v${require("../../package.json").version}`];
	let i = 0;
	setInterval(() => {
		// Loop through activities in order
		client.user.setActivity(`${activities[i++ % activities.length]}`, { type: ActivityType.Listening });
	}, 10000);
	// Log the cached guild size and user size
	console.log(`Total Guilds: ${client.guilds.cache.size}\nTotal Members: ${client.users.cache.size}`);

  // Setup slash commands
  setupSlashCommands("commands", client);
}

module.exports.setupSlashCommands = (guild, client) => setupSlashCommands("commands", client, guild);