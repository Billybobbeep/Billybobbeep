module.exports = {
    name: 'profile',
    description: 'View a users economy profile',
    alias: ['stats'],
    catagory: 'economy',
    async execute(message, prefix, client) {
        const guildData = require('../../events/client/database/models/guilds.js');
        const userData = require('../../events/client/database/models/users.js');
        let guildResult = await guildData.findOne({ guildId: message.guild.id });
        let userResult = await userData.findOne({ userId: message.author.id });
        const moment = require('moment');
        const { MessageEmbed } = require('discord.js');
        const embed = new MessageEmbed();
        
        let cashier = userResult.job === 'cashier' ? true : undefined;
        let teacher = userResult.job === 'teacher' ? true : undefined;
        let waiter = userResult.job === 'waiter' ? true : undefined;
        let receptionist = userResult.job === 'receptionist' ? true : undefined;
        let architect = userResult.job === 'architect' ? true : undefined;
        let lifeGuard = userResult.job === 'life guard' ? true : undefined;
        let nurse = userResult.job === 'nurse' ? true : undefined;
        let police = userResult.job === 'police' ? true : undefined;
        let engineer = userResult.job === 'engineer' ? true : undefined;
        let chef = userResult.job === 'chef' ? true : undefined;
        let clinicalScientist = userResult.job === 'clinical scientist' ? true : undefined;
        let headScientist = userResult.job === 'head scientist' ? true : undefined;
        let lawyer = userResult.job === 'lawyer' ? true : undefined;
        let socialWorker = userResult.job === 'social worker' ? true : undefined;
        let doctor = userResult.job === 'doctor' ? true : undefined;

        let job = '';
        let jobLvl = userResult.job_level || 0;
        let streak = userResult.economy_tStreak;
        let timesFired = userResult.job_timesFired || 0;
        let lastFired = moment.utc(userResult.job_lastFired).format('DD-MM-YYYY, h:mm:ss a');
        let lastApplied = moment.utc(userResult.job_lastApplied).format('DD-MM-YYYY, h:mm:ss a');

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

        message.guild ? embed.setColor(guildResult.embedColor) : embed.setColor('#447ba1');
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