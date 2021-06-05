module.exports = (client) => {
	let activities = [`~help`, `v${(require('../../package.json').version)[0]}${(require('../../package.json').version)[1]}${(require('../../package.json').version)[2]}`];
	let i = 0;
	setInterval(() => {
		client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'LISTENING' });
	}, 10000);
	console.log(`Total Guilds: ${client.guilds.cache.size}\nTotal Members: ${client.users.cache.size}`);
	require('../backend/timeOut.js')(client);

	const fs = require('fs');
	const guildData = require('../client/database/models/guilds');
	const commandFolders = fs.readdirSync('./commands').filter(file => !file.endsWith('.js') && !file.endsWith('.json'));
	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../../commands/${folder}/${file}`);
			if (command.options && (command.isSlashEnabled && command.isSlashEnabled.type)) {
				let data = {
					name: command.name,
					description: command.description,
					options: command.options
				}
				if ((typeof command.isSlashEnabled.options == 'object' && command.isSlashEnabled.options.mod)) {
					data.permissions = [];
					guildData.find(function(err, data1) {
						if (err || !data) return;
						data1.forEach(guild => {
							if (guild.modRole) {
								data.permissions.push({
									id: guild.modRole,
									type: 1,
									permission: true
								});
							} else return;
						});
						client.api.applications(client.user.id).guilds('729288155064434729').commands.post({
							data
						});
					});
				} else {
					if (command.isSlashEnabled.public) {
						client.api.applications(client.user.id).commands.post({
							data
						});
					} else {
						client.api.applications(client.user.id).guilds('729288155064434729').commands.post({
							data
						});
					}
				}
			}
		}
	}
	// client.api.applications(client.user.id).guilds('729288155064434729').commands.get().then(commands => {
	// 	commands.forEach(command => {
	// 		console.log('Deleting the slash command: ' + command.name);
	// 		client.api.applications(client.user.id).guilds('729288155064434729').commands(command.id).delete()
	// 	});
	// });
}