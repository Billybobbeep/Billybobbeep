module.exports = {
    name: 'profile',
    description: 'View a users economy profile.',
    alias: ['stats'],
    catagory: 'economy',
    guildOnly: true,
    execute(message, prefix, client) {
        const db = require('../../structure/global.js').db;;
        const moment = require('moment');
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed();
        
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

        var job = '';
        var jobLvl = db.get(message.author.id + '.jobs.level');
        var streak = db.get(message.author.id + '.economy.tStreak');
        var timesFired = db.get(message.author.id + '.jobs.timesFired');
        var lastFired = db.get(message.author.id + '.jobs.lastFired');
        var lastApplied = moment.utc(db.get(message.author.id + '.jobs.lastApplied'));

        if (cashier) job = 'Cashier';
        else if (teacher) job = 'Teacher';
        else if (waiter) job = 'Waiter';
        else if (receptionist) job = 'Receptionist';
        else if (architect) job = 'Architect';
        else if (lifeGuard) job = 'Life Guard';
        else if (nurse) job = 'Nurse';
        else if (police) job = 'Police';
        else if (engineer) job = 'Engineer';
        else if (chief) job = 'Chief';
        else if (clinicalScientist) job = 'Clinical Scientist';
        else if (headScientist) job = 'Head Scientist';
        else if (lawyer) job = 'Lawyer';
        else if (socialWorker) job = 'Social Worker';
        else if (doctor) job = 'Doctor';
        else job = 'Unemployed';

        embed.setColor()
        embed.setAuthor(message.author.username, message.author.displayAvatarURL());
        embed.addField('Job', job, true);
        embed.addField('Job Level', jobLvl, true);
        embed.addField('Last Applied', moment(lastApplied, 'DD MM YYYY, h:mm:ss a', true));
        embed.addField('Daily Streak', streak);
        //embed.addField('Times Fired', timesFired.toString(), true);
        embed.addField('Last Fired', moment(lastFired), true) //, 'MMMM Do YYYY, h:mm:ss a', true), true);

        message.channel.send(embed);
    }
}