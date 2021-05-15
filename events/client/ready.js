module.exports = (client) => {
	let activities = [`~help`, `v${(require('../../package.json').version)[0]}${(require('../../package.json').version)[1]}${(require('../../package.json').version)[2]}`, 'Background maintenance in progress'];
	let i = 0;
	setInterval(() => {
		client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'LISTENING' });
	}, 10000);
	console.log(`Total Guilds: ${client.guilds.cache.size}\nTotal Members: ${client.users.cache.size}`);
	require('../backend/timeOut.js')(client);

	const fs = require('fs');
	const commandFolders = fs.readdirSync('./commands').filter(file => !file.endsWith('.js') && !file.endsWith('.json'));
	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`../../commands/${folder}/${file}`);
			if (command.options && command.options.length > 0 && command.isSlashEnabled) {
				let data = {
					name: command.name,
					description: command.description,
					options: command.options
				}
				if ((command.catagory).toLowerCase().includes('mod')) {
					data.permissions = [
						{
							"id": MODERATOR_ROLE_ID,
							"type": 1,
							"permission": True
						}
					]
				}
				client.api.applications(client.user.id).guilds("729288155064434729").commands.post({
					data
				});
			}
		}
	}
}