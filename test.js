let string = '345'

!isNaN(string) ? console.log(`${string} is a number.`) : console.log(`${string} is not a number`);

const Discord = require('discord.js');
const chalk = require('chalk');
const client = new Discord.Client();
client.once('ready', () => {
    (client.guilds.cache).array().forEach(guild => {
        console.log(chalk.blue(guild.id) + ' - ' + chalk.green(guild.name) + ' - ' + chalk.red(guild.members.cache.get(client.user.id).hasPermission('ADMINISTRATOR')));
    });
});
client.login(require('./structure/auth.js').token);

const mongoose = require('mongoose');
const guildData = require('./events/client/database/models/guilds');
mongoose.connect(require('./structure/auth').mongoDb);
client.once('ready', () => {
    (client.guilds.cache).array().forEach(guild => {
        let newGuildData = new guildData({
            guildId: guild.id,
            embedColor: '#447ba1'
        });
        newGuildData.save().then(() => {
            console.log(chalk.blue('INFO') + ' - ' + guild.name + ' has been added');
        });
    });
});

//const mongoose = require('mongoose');
const guildMemberData = require('./events/client/database/models/guildMembers');
//mongoose.connect(require('./structure/auth').mongoDb);
client.once('ready', () => {
    (client.guilds.cache).array().forEach(guild => {
        (guild.members.cache).array().forEach(member => {
            setTimeout(() => {
                if (member.user.bot) return console.log(chalk.red('ERROR') + ' - ' + member.user.username + ' is a bot');
                let newData = new guildMemberData({
                    guildId: guild.id,
                    memberId: member.user.id
                });
                newData.save().then(() => {
                    console.log(chalk.blue('INFO') + ' - ' + member.user.username + ' has been added');
                });
            }, 10000);
        });
    });
});

//const mongoose = require('mongoose');
const userData = require('./events/client/database/models/users');
//mongoose.connect(require('./structure/auth').mongoDb);
client.once('ready', () => {
    client.users.cache.array().forEach(user => {
        setTimeout(() => {
            if (user.bot) return console.log(chalk.red('ERROR') + ' - ' + user.username + ' is a bot');
            userData.findOne({ userId: user.id }).then(result => {
                if (result) return;
                let newData = new userData({
                    userId: user.id
                });
                newData.save().then(() => {
                    console.log(chalk.blue('INFO') + ' - ' + user.username + ' has been added');
                });
            });
        }, 10000);
    });
});