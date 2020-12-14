var string = '345'

!isNaN(string) ? console.log(`${string} is a number.`) : console.log(`${string} is not a number`);

const db = require('./structure/global.js').db;
db.fetchAll().forEach(data => {
    //console.log(data.id);
    //console.log(data.data.level);
    console.log(data);
});

const Discord = require('discord.js');
const chalk = require('chalk');
const client = new Discord.Client();
client.on('ready', () => {
    (client.guilds.cache).array().forEach(guild => {
        console.log(chalk.blue(guild.id) + ' - ' + chalk.green(guild.name) + ' - ' + chalk.red(guild.members.cache.get(client.user.id).hasPermission('ADMINISTRATOR')));
    });
});
client.login(require('./structure/auth.js').token);