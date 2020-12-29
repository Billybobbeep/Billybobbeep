module.exports = {
    name: 'profile',
    description: 'View a users economy profile',
    alias: ['stats'],
    catagory: 'economy',
    execute(message, prefix, client) {
        const db = require('../../structure/global.js').db;
        const moment = require('moment');
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed();
        
        let cashier = db.get(message.author.id + '.jobs.job') === 'cashier' ? true : undefined;
        let teacher = db.get(message.author.id + '.jobs.job') === 'teacher' ? true : undefined;
        let waiter = db.get(message.author.id + '.jobs.job') === 'waiter' ? true : undefined;
        let receptionist = db.get(message.author.id + '.jobs.job') === 'receptionist' ? true : undefined;
        let architect = db.get(message.author.id + '.jobs.job') === 'architect' ? true : undefined;
        let lifeGuard = db.get(message.author.id + '.jobs.job') === 'life guard' ? true : undefined;
        let nurse = db.get(message.author.id + '.jobs.job') === 'nurse' ? true : undefined;
        let police = db.get(message.author.id + '.jobs.job') === 'police' ? true : undefined;
        let engineer = db.get(message.author.id + '.jobs.job') === 'engineer' ? true : undefined;
        let chef = db.get(message.author.id + '.jobs.job') === 'chef' ? true : undefined;
        let clinicalScientist = db.get(message.author.id + '.jobs.job') === 'clinical scientist' ? true : undefined;
        let headScientist = db.get(message.author.id + '.jobs.job') === 'head scientist' ? true : undefined;
        let lawyer = db.get(message.author.id + '.jobs.job') === 'lawyer' ? true : undefined;
        let socialWorker = db.get(message.author.id + '.jobs.job') === 'social worker' ? true : undefined;
        let doctor = db.get(message.author.id + '.jobs.job') === 'doctor' ? true : undefined;

        let job = '';
        let jobLvl = db.get(message.author.id + '.jobs.level');
        let streak = db.get(message.author.id + '.economy.tStreak');
        let timesFired = db.get(message.author.id + '.jobs.timesFired') || 0;
        let lastFired = moment.utc(db.get(message.author.id + '.jobs.lastFired')).format('DD-MM-YYYY, h:mm:ss a');
        let lastApplied = moment.utc(db.get(message.author.id + '.jobs.lastApplied')).format('DD-MM-YYYY, h:mm:ss a');

        if (cashier) job = 'Cashier';
        else if (teacher) job = 'Teacher';
        else if (waiter) job = 'Waiter';
        else if (receptionist) job = 'Receptionist';
        else if (architect) job = 'Architect';
        else if (lifeGuard) job = 'Life Guard';
        else if (nurse) job = 'Nurse';
        else if (police) job = 'Police';
        else if (engineer) job = 'Engineer';
        else if (chef) job = 'chef';
        else if (clinicalScientist) job = 'Clinical Scientist';
        else if (headScientist) job = 'Head Scientist';
        else if (lawyer) job = 'Lawyer';
        else if (socialWorker) job = 'Social Worker';
        else if (doctor) job = 'Doctor';
        else job = 'Unemployed';

        message.guild ? embed.setColor(db.get(message.guild.id + '.embedColor') || '#447ba1') : embed.setColor('#447ba1');
        embed.setAuthor(message.author.username, message.author.displayAvatarURL());
        embed.addField('Job', job, true);
        embed.addField('Job Level', jobLvl, true);
        embed.addField('Last Applied', lastApplied.toString());
        embed.addField('Daily Streak', streak.toString());
        embed.addField('Times Fired', timesFired.toString(), true);
        embed.addField('Last Fired', lastFired.toString(), true) //, 'MMMM Do YYYY, h:mm:ss a', true), true);

        message.channel.send(embed);
    }
}