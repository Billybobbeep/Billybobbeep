module.exports = {
    name: 'jobs',
    description: 'View avalable jobs.',
    alias: ['job'],
    catagory: 'economy',
    guildOnly: true,
    async execute (message, prefix, client) {
        const db = require('../../structure/global.js').db;;
        const Discord = require('discord.js');
        const embed = new Discord.MessageEmbed();
        const info = require('./jobRequirements.js');
        embed.setFooter(`${message.author.username}`);
        embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
        if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.');

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

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let args1 = args.join(' ').split(/ +/g).slice(1).join(' ').split('-').join(' ');

        if (!args[1] || args[1] && args[1] === 'info') {
            embed.setTitle(`Economy | Jobs`)
            embed.setDescription('The job command is used to view all of the jobs available & apply for new jobs.\n\n' +
            'To see all of the jobs available, please see the next few pages.\n\n' + 'To see more information on any job use the command: ' +
            `\`${prefix}jobs [job] info\``);
            let msg = await message.channel.send(embed)
            await msg.react('◀');
            await msg.react('▶');

            function reactions() {
                const filter = (reaction, user) => {
                    return (
                    ['▶', '◀'].includes(reaction.emoji.name) && user.id === message.author.id
                    );
                }
                msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then((collected) => {
                const reaction = collected.first();

                if (reaction.emoji.name === '▶') {
                if (msg.embeds[0].title === 'Economy | Jobs') {
                    PageOne(msg)
                    reaction.users.remove(message.author.id)
                }
                wait()
                } else if (reaction.emoji.name === '◀') {
                if (msg.embeds[0].title === 'Jobs | Page One') {
                    MainPage(msg)
                    reaction.users.remove(message.author.id)
                }
                wait()
                }
            }).catch(() => {
                msg.reactions.removeAll()
            });
        }
        reactions()
    }
    
        function wait() {
            reactions()
        }

        function PageOne(msg) {
            embed.setTitle('Jobs | Page One');
            embed.setDescription('Cashier - 10/hr\nTeacher - 11/hr\nWaiter - 12/hr\nReceptionist - 12/hr\nArchitect - 15/hr\nLifeguard - 16/hr\nNurse - 21/hr\nPolice - 22/hr\nEngineer - 24/hr\nchef - 25/hr\nClinical Scientist - 25/hr\nHead Scientist - 26/hr\nLawyer - 29/hr\nSocial Worker - 21/hr\nDoctor - 55/hr');
            msg.edit(embed)
        }
        function MainPage(msg) {
            embed.setTitle(`Economy | Jobs`)
            embed.setDescription('The billybobbeep job command is used to view all of the jobs avalable & apply for new jobs.\n\n' +
            'To see all of the jobs available, please see the next few pages.\n\n' + 'To see more information on any job use the command: ' +
            `\`${prefix}jobs [job] info\``);
            msg.edit(embed)
        }

        if (args[1]) {
            let title;
            if (!args[2]) {
                title = args1[0].toUpperCase() + args1.split(/ +/g)[0].toLowerCase().substring(1);
            } else {
                title = args1[0].toUpperCase() + args1.split(/ +/g)[0].toLowerCase().substring(1) + ' ' + args1.split(/ +/g)[1][0].toUpperCase() + args1.split(/ +/g)[1].toLowerCase().substring(1)
            }
            embed.setTitle(`${title} | Job Description`)
            embed.setFooter(`If you would like to apply for this job enter the command '${prefix}apply ${args[1].toLowerCase()}'`)
            if (args[1].toLowerCase() === 'cashier') {
                embed.addField('Level Required', info.cashier.level, true)
                embed.addField('Hourly Pay', info.cashier.pay, true)
                embed.addField('Maximum Promotions', info.cashier.promotions, true)
                embed.addField('Job Description', info.cashier.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'teacher') {
                embed.addField('Level Required', info.teacher.level, true)
                embed.addField('Hourly Pay', info.teacher.pay, true)
                embed.addField('Maximum Promotions', info.teacher.promotions, true)
                embed.addField('Job Description', info.teacher.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'waiter') {
                embed.addField('Level Required', info.waiter.level, true)
                embed.addField('Hourly Pay', info.waiter.pay, true)
                embed.addField('Maximum Promotions', info.waiter.promotions, true)
                embed.addField('Job Description', info.waiter.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'receptionist') {
                embed.addField('Level Required', info.receptionist.level, true)
                embed.addField('Hourly Pay', info.receptionist.pay, true)
                embed.addField('Maximum Promotions', info.receptionist.promotions, true)
                embed.addField('Job Description', info.receptionist.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'architect') {
                embed.addField('Level Required', info.architect.level, true)
                embed.addField('Hourly Pay', info.architect.pay, true)
                embed.addField('Maximum Promotions', info.architect.promotions, true)
                embed.addField('Job Description', info.architect.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'lifeguard') {
                embed.addField('Level Required', info.lifeguard.level, true)
                embed.addField('Hourly Pay', info.lifeguard.pay, true)
                embed.addField('Maximum Promotions', info.lifeguard.promotions, true)
                embed.addField('Job Description', info.lifeguard.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'nurse') {
                embed.addField('Level Required', info.nurse.level, true)
                embed.addField('Hourly Pay', info.nurse.pay, true)
                embed.addField('Maximum Promotions', info.nurse.promotions, true)
                embed.addField('Job Description', info.nurse.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'police') {
                embed.addField('Level Required', info.police.level, true)
                embed.addField('Hourly Pay', `$` + info.police.pay, true)
                embed.addField('Maximum Promotions', info.police.promotions, true)
                embed.addField('Job Description', info.police.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'engineer') {
                embed.addField('Level Required', info.engineer.level, true)
                embed.addField('Hourly Pay', `$` + info.engineer.pay, true)
                embed.addField('Maximum Promotions', info.engineer.promotions, true)
                embed.addField('Job Description', info.engineer.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'chef') {
                embed.addField('Level Required', info.chef.level, true)
                embed.addField('Hourly Pay', `$` + info.chef.pay, true)
                embed.addField('Maximum Promotions', info.chef.promotions, true)
                embed.addField('Job Description', info.chef.description)
                message.channel.send(embed)
            } else if (args1.toLowerCase() === 'clinical scientist') {
                embed.addField('Level Required', info.clinicalScientist.level, true)
                embed.addField('Hourly Pay', `$` + info.clinicalScientist.pay, true)
                embed.addField('Maximum Promotions', info.clinicalScientist.promotions, true)
                embed.addField('Job Description', info.clinicalScientist.description)
                message.channel.send(embed)
            } else if (args1.toLowerCase() === 'head scientist') {
                embed.addField('Level Required', info.headScientist.level, true)
                embed.addField('Hourly Pay', `$` + info.headScientist.pay, true)
                embed.addField('Maximum Promotions', info.headScientist.promotions, true)
                embed.addField('Job Description', info.headScientist.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'lawyer') {
                embed.addField('Level Required', info.lawyer.level, true)
                embed.addField('Hourly Pay', `$` + info.lawyer.pay, true)
                embed.addField('Maximum Promotions', info.lawyer.promotions, true)
                embed.addField('Job Description', info.lawyer.description)
                message.channel.send(embed)
            } else if (args1.toLowerCase() === 'social worker') {
                embed.addField('Level Required', info.socialWorker.level, true)
                embed.addField('Hourly Pay', `$` + info.socialWorker.pay, true)
                embed.addField('Maximum Promotions', info.socialWorker.promotions, true)
                embed.addField('Job Description', info.socialWorker.description)
                message.channel.send(embed)
            } else if (args[1].toLowerCase() === 'doctor') {
                embed.addField('Level Required', info.doctor.level, true)
                embed.addField('Hourly Pay', `$` + info.doctor.pay, true)
                embed.addField('Maximum Promotions', info.doctor.promotions, true)
                embed.addField('Job Description', info.doctor.description)
                message.channel.send(embed)
            } else {
                message.channel.send(`**${args1}** is not a valid job, please make sure you have spelt it correctly and try again.`)
            }
        }
    }
}