module.exports = {
    name: 'apply',
    description: 'Apply for a job.',
    guildOnly: true,
    execute (message, prefix, client) {
        application_process(message, 'cashier', client);
        /*const Discord = require('discord.js');
        const db = require('../../data/databaseManager/index.js');
        const ms = require('ms');
        const embed = new Discord.MessageEmbed();

        let args = message.content.slice(prefix.length).trim().split(/ +/g);

        let timesFired = db.get(message.author.id + '.jobs.timesFired');
        let lastFired = db.get(message.author.id + '.jobs.lastFired');

        let cashier = db.get(message.author.id + '.jobs.cashier') || undefined;
        let teacher = db.get(message.author.id + '.jobs.teacher') || undefined;
        let waiter = db.get(message.author.id + '.jobs.waiter') || undefined;
        let receptionist = db.get(message.author.id + '.jobs.receptionist') || undefined;
        let architect = db.get(message.author.id + '.jobs.architect') || undefined;
        let lifeGuard = db.get(message.author.id + '.jobs.lifeGuard') || undefined;
        let nurse = db.get(message.author.id + '.jobs.nurse') || undefined;
        let police = db.get(message.author.id + '.jobs.police') || undefined;
        let engineer = db.get(message.author.id + '.jobs.engineer') || undefined;
        let chief = db.get(message.author.id + '.jobs.chief') || undefined;
        let clinicalScientist = db.get(message.author.id + '.jobs.clinicalScientist') || undefined;
        let headScientist = db.get(message.author.id + '.jobs.headScientist') || undefined;
        let lawyer = db.get(message.author.id + '.jobs.lawyer') || undefined;
        let socialWorker = db.get(message.author.id + '.jobs.socialWorker') || undefined;
        let doctor = db.get(message.author.id + '.jobs.doctor') || undefined;

        if (!args[1]) {
            embed.setDescription(`Please specify a job.`);
            embed.setFooter(`To view the full job list use the command ${prefix}jobs`);
            return message.channel.send(embed);
        }
        if (args.slice(1).join('').toLowerCase() === 'cashier') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'teacher') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'waiter') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'receptionist') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'architect') {

        } else if (args.slice(1).join('').toLowerCase() === 'lifeguard') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'nurse') {

        } else if (args.slice(1).join('').toLowerCase() === 'police') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'engineer') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'chief') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'clinical scientist') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'head-scientist') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'lawyer') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'social worker') {
            
        } else if (args.slice(1).join('').toLowerCase() === 'doctor') {
            
        } else {
            message.channel.send(`**${args[1][0].toUpperCase() + args[1].toLowerCase().substring(1)}** is not a valid job, please make sure you have spelt it correctly and try again.`)
        }*/
    }
}

function reactMessage(message, msg, job, client) {
    const filter = (reaction, user) => {
        return (
          [require('../../structure/config.json').TickEmoji1, require('../../structure/config.json').CrossEmoji].includes(reaction.emoji.id) && user.id === message.author.id
        );
    }

    msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then((collected) => {
        const reaction = collected.first();
        let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);

        if (reaction.emoji.id === tick.name) {
            message.reactions.removeAll();
            application_process(msg, job, client);
        } else {
            message.reactions.removeAll();
            message.channel.send(`${cross} Cancelled prompt.`);
        }
    }).catch(() => {
        msg.reactions.removeAll()
    });
}
function application_process(message, job, client) {
    console.log(message);
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed();
    const db = require('../../data/databaseManager/index.js');

    let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
    let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
    
    embed.setDescription(`${tick} Successfully applied for the ${job} job!`);
    embed.setAuthor('You will be DMed your application results soon.', message.author.displayAvatarURL());
    message.channel.send(embed);
    db.set(message.author.id + '.economy.jobs.awaiting', true);
}