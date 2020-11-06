module.exports = {
    name: 'apply',
    description: 'Apply for a job.',
    guildOnly: true,
    execute (message, prefix, client) {
        const Discord = require('discord.js');
        const db = require('../../data/databaseManager/index.js');
        const ms = require('ms');

        let timesFired = db.get(message.author.id + '.economy.jobs');
        let lastFired = db.get(message.author.id + '.economy.jobs');
    }
}