module.exports = async (client) => {
  // [Varibles] //
  const Discord = require('discord.js');
  const db = require('./data/databaseManager/index.js');
  const fs = require('fs');

  require('./utils/events.js')(client);

  client.commands = new Discord.Collection();

  const commandFolders = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));
  for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
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
}