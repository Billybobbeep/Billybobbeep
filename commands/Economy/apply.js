module.exports = {
    name: 'apply',
    description: 'Apply for a job.',
    guildOnly: true,
    execute (message, prefix, client) {
        const Discord = require('discord.js');
        const db = require('../../data/databaseManager/index.js');
        const ms = require('ms');
        const embed = new Discord.MessageEmbed()

        let args = message.content.slice(prefix.length).trim().slice(/ +/g);

        let timesFired = db.get(message.author.id + '.jobs.timesFired');
        let lastFired = db.get(message.author.id + '.jobs.lastFired');

        //level 1 job
        let cashier = db.get(message.author.id + '.jobs.cashier') || undefined;
        //level 2 job
        let teacher = db.get(message.author.id + '.jobs.teacher') || undefined;
        //level 3 job
        let waiter = db.get(message.author.id + '.jobs.waiter') || undefined;
        //level 4 job
        let receptionist = db.get(message.author.id + '.jobs.receptionist') || undefined;
        //level 5 job
        let architect = db.get(message.author.id + '.jobs.architect') || undefined;
        //level 6 job
        let lifeGuard = db.get(message.author.id + '.jobs.lifeGuard') || undefined;
        //level 7 job
        let nurse = db.get(message.author.id + '.jobs.nurse') || undefined;
        //level 8 job
        let police = db.get(message.author.id + '.jobs.police') || undefined;
        //level 9 job
        let engineer = db.get(message.author.id + '.jobs.engineer') || undefined;
        //level 10 job
        let chief = db.get(message.author.id + '.jobs.chief') || undefined;
        //level 11 job
        let clinicalScientist = db.get(message.author.id + '.jobs.clinicalScientist') || undefined;
        //level 12 job
        let headScientist = db.get(message.author.id + '.jobs.headScientist') || undefined;
        //level 13 job
        let lawyer = db.get(message.author.id + '.jobs.lawyer') || undefined;
        //level 14 job
        let socialWorker = db.get(message.author.id + '.jobs.socialWorker') || undefined;
        //level 15 job
        let doctor = db.get(message.author.id + '.jobs.doctor') || undefined;

        if (!args[1]) {
            embed.setDescription(`Please specify a job.`);
            embed.setFooter(`To view the full job list use the command ${prefix}jobs`);
            return message.channel.send(embed);
        }
        if (args.slice(1).join('').toLowerCase() === 'cashier') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'teacher') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'waiter') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'receptionist') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'architect') {

        } else if (args.slice(1).join(' ').toLowerCase() === 'lifeguard') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'nurse') {

        } else if (args.slice(1).join(' ').toLowerCase() === 'police') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'engineer') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'chief') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'clinical-scientist') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'head-scientist') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'lawyer') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'social worker') {
            
        } else if (args.slice(1).join(' ').toLowerCase() === 'doctor') {
            
        } else {
            message.channel.send(`${args[1][0].toUpperCase() + args[1].substring(1)} is not a valid job, please make sure you have spelt it correctly and try again.`)
        }
    }

}