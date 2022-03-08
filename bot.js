module.exports = async function(client) {
	const Discord = require("discord.js");
	const fs = require("fs");

	require("./utils/events")(client);
	client.commands = new Discord.Collection();

	const commandFolders = fs
		.readdirSync("./commands")
		.filter(file => !file.endsWith(".js") && !file.endsWith(".json"));
	for (const folder of commandFolders) {
		const commandFiles = fs
			.readdirSync(`./commands/${folder}`)
			.filter(file => file.endsWith(".js"));
		for (const file of commandFiles) {
			const command = require(`./commands/${folder}/${file}`);
			client.commands.set(command.name, command);
			if (command.alias) {
				command.alias.forEach(e => {
					client.commands.set(e, command);
				});
			}
		}
	}

	client.commands.set("afk", require("./events/commands/afkHandle.js"));
	client.commands.set("back", require("./events/commands/afkHandle.js"));
}