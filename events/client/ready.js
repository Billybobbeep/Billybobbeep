/**
 * Post slash commands 
 * @param {string} directory The directory name
 * @param {Client} client The bots client
 */
function setupSlashCommands(directory, client) {
	// Define required modules
	const fs = require('fs');
	const guildData = require('../client/database/models/guilds');

	// Loop through known command files
	const commandFolders = fs.readdirSync(`./${directory}`).filter(file => !file.endsWith('.js') && !file.endsWith('.json'));
	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./${directory}/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../../${directory}/${folder}/${file}`);
			// If the command supports slash
			if (command.options && (command.slashInfo && command.slashInfo.enabled)) {
				let data = {
					name: command.name, // The commands name
					description: command.description, // The commands description
					options: command.options // The command arguments
				}
				// If the command is set to moderators only
				if ((typeof command.slashInfo.options == 'object' && command.slashInfo.options.mod)) {
					data.permissions = [];
					guildData.find(function (err, data1) {
						if (err || !data) return;
						data1.forEach(guild => {
							// If the guild has setup a mod-role
							if (guild.modRole) {
								// Add the role into the permissions array
								data.permissions.push({
									id: guild.modRole,
									type: 1,
									permission: true
								});
							}
						});
						if (command.slashInfo.public) { // If the slash command is public
							// Post command to all guilds
							client.api.applications(client.user.id).commands.post({
								data
							});
						} else { // If the slash command is in testing
							// Post command for use only in the dev server
							client.api.applications(client.user.id).guilds(require('../../utils/config.json').DevServer).commands.post({
								data
							});
						}
					});
				} else {
					if (command.slashInfo.public) { // If the slash command is public
						// Post command to all guilds
						client.api.applications(client.user.id).commands.post({
							data
						});
					} else { // If the slash command is in testing
						// Post command for use only in the dev server
						client.api.applications(client.user.id).guilds(require('../../utils/config.json').DevServer).commands.post({
							data
						});
					}
				}
			}
		}
	}

	// Do the same as above just checking for command files in the directory instead of sub-folder
	const commandFiles = fs.readdirSync(`./${directory}`).filter(file => file.endsWith('.js'));
	if (commandFiles.length >= 1) {
		for (const file of commandFiles) {
			const command = require(`../../${directory}/${file}`);
			if (command.options && (command.slashInfo && command.slashInfo.enabled)) {
				let data = {
					name: command.name,
					description: command.description,
					options: command.options
				}
				if ((typeof command.slashInfo.options == 'object' && command.slashInfo.options.mod)) {
					data.permissions = [];
					guildData.find(function (err, data1) {
						if (err || !data) return;
						data1.forEach(guild => {
							if (guild.modRole) {
								data.permissions.push({
									id: guild.modRole,
									type: 1,
									permission: true
								});
							}
						});
						if (command.slashInfo.public) {
							client.api.applications(client.user.id).commands.post({
								data
							});
						} else {
							client.api.applications(client.user.id).guilds(require('../../utils/config.json').DevServer).commands.post({
								data
							});
						}
					});
				} else {
					if (command.slashInfo.public) {
						client.api.applications(client.user.id).commands.post({
							data
						});
					} else {
						client.api.applications(client.user.id).guilds(require('../../utils/config.json').DevServer).commands.post({
							data
						});
					}
				}
			}
		}
	}

	// Delete non-public slash command(s) from guilds
	client.api.applications(client.user.id).commands.get().then(commands => {
		commands.forEach(command => {
			if (!client.commands.get(command.name)) deleteCommand();
			if (!client.commands.get(command.name).slashInfo || !client.commands.get(command.name).slashInfo.public) deleteCommand();

			function deleteCommand() {
				console.log('Deleting the slash command: ' + command.name);
				client.api.applications(client.user.id).commands(command.id).delete();
			}
		});
	});
}

module.exports = (client) => {
	// Activities to loop through
	let activities = [`~help`, `v${(require('../../package.json').version)[0]}${(require('../../package.json').version)[1]}${(require('../../package.json').version)[2]}`];
	let i = 0;
	setInterval(() => {
		// Loop through activities in order
		client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'LISTENING' });
	}, 10000);
	// Log the cached guild size and user size
	console.log(`Total Guilds: ${client.guilds.cache.size}\nTotal Members: ${client.users.cache.size}`);
	// Start backend timeouts
	require('../backend/timeOut.js')(client);

	// Setup the slash commands
	setupSlashCommands('commands', client);

	// Delete a/all slash command(s)
	// client.api.applications(client.user.id).guilds(require('../../utils/config.json').DevServer).commands.get().then(commands => {
	// 	commands.forEach(command => {
	// 		console.log('Deleting the slash command: ' + command.name);
	// 		client.api.applications(client.user.id).guilds(require('../../utils/config.json').DevServer).commands(command.id).delete()
	// 	});
	// });
}