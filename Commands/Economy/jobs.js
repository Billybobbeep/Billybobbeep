const db = require('quick.db');
const Discord = require('discord.js');

module.exports = async (prefix, message, client) => {
    const embed = new Discord.MessageEmbed();
    embed.setFooter(`${message.author.username}`);
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
    if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.')

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

    let args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);

    if (!args[1] || args[1] && args[1] === 'info') {
        embed.setTitle(`Economy | Jobs`)
        embed.setDescription('The billybobbeep job command is used to view all of the jobs avalable & apply for new jobs.\n\n' +
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
        embed.setDescription('Cashier - 10/hr\nTeacher - 11/hr\nWaiter - 12/hr\nReceptionist - 12/hr\nArchitect - 15/hr\nLifeguard - 16/hr\nNurse - 21/hr\nPolice - 22/hr\nEngineer - 24/hr\nChief - 25/hr\nClinical Scientist - 25/hr\nHead Scientist - 26/hr\nLawyer - 29/hr\nSocial Worker - 21/hr\nDoctor - 55/hr');
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
        embed.setTitle(`${args[1][0].toUpperCase() + args[1].toLowerCase().substring(1)} | Job Description`)
        embed.setFooter(`If you would like to apply for this job enter the command '${prefix}apply ${args[1].toLowerCase()}'`)
        if (args[1].toLowerCase() === 'cashier') {
            embed.addField('Level Required', '0', true)
            embed.addField('Hourly Pay', '$10', true)
            embed.addField('Maximum Promotions', '5', true)
            embed.addField('Job Description', 'A starter minimum wage job.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'teacher') {
            embed.addField('Level Required', '3', true)
            embed.addField('Hourly Pay', '$11', true)
            embed.addField('Maximum Promotions', '3', true)
            embed.addField('Job Description', 'Prepare lessons for children.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'waiter') {
            embed.addField('Level Required', '7', true)
            embed.addField('Hourly Pay', '$12', true)
            embed.addField('Maximum Promotions', '5', true)
            embed.addField('Job Description', 'Suggest food & beverages to customers.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'receptionist') {
            embed.addField('Level Required', '15', true)
            embed.addField('Hourly Pay', '$12', true)
            embed.addField('Maximum Promotions', '7', true)
            embed.addField('Job Description', 'Welcome, assist and direct visitors correctly.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'architect') {
            embed.addField('Level Required', '25', true)
            embed.addField('Hourly Pay', '$15', true)
            embed.addField('Maximum Promotions', '2', true)
            embed.addField('Job Description', 'To develop new building designs.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'lifeguard') {
            embed.addField('Level Required', '40', true)
            embed.addField('Hourly Pay', '$16', true)
            embed.addField('Maximum Promotions', '4', true)
            embed.addField('Job Description', 'To supervise all individuals using the swimming pool and for the safe activities around.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'nurse') {
            embed.addField('Level Required', '55', true)
            embed.addField('Hourly Pay', '$21', true)
            embed.addField('Maximum Promotions', '7', true)
            embed.addField('Job Description', 'To supervise all individuals using the swimming pool and for the safe activities around.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'police') {
            embed.addField('Level Required', '60', true)
            embed.addField('Hourly Pay', '$22', true)
            embed.addField('Maximum Promotions', '10', true)
            embed.addField('Job Description', 'Participate in raids & arrests.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'engineer') {
            embed.addField('Level Required', '75', true)
            embed.addField('Hourly Pay', '$24', true)
            embed.addField('Maximum Promotions', '2', true)
            embed.addField('Job Description', 'Fix any vehicle that comes in for a repair.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'chief') {
            embed.addField('Level Required', '90', true)
            embed.addField('Hourly Pay', '$25', true)
            embed.addField('Maximum Promotions', '15', true)
            embed.addField('Job Description', 'Cook foods as requested.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'clinical-scientist') {
            embed.addField('Level Required', '105', true)
            embed.addField('Hourly Pay', '$25', true)
            embed.addField('Maximum Promotions', '3', true)
            embed.addField('Job Description', 'Research different parts of the body.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'head-scientist') {
            embed.addField('Level Required', '110', true)
            embed.addField('Hourly Pay', '$26', true)
            embed.addField('Maximum Promotions', '3', true)
            embed.addField('Job Description', 'Research different parts of the body.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'lawyer') {
            embed.addField('Level Required', '130', true)
            embed.addField('Hourly Pay', '$29', true)
            embed.addField('Maximum Promotions', '5', true)
            embed.addField('Job Description', 'Show and explain different ways a person is or isn\'t guilty.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'social worker') {
            embed.addField('Level Required', '155', true)
            embed.addField('Hourly Pay', '$31', true)
            embed.addField('Maximum Promotions', '0', true)
            embed.addField('Job Description', 'Give good and clear advice on certain problems a person may have.')
            message.channel.send(embed)
        } else if (args[1].toLowerCase() === 'doctor') {
            embed.addField('Level Required', '180', true)
            embed.addField('Hourly Pay', '$55', true)
            embed.addField('Maximum Promotions', '20', true)
            embed.addField('Job Description', 'Treat and care for patients.')
            message.channel.send(embed)
        } else {
            message.channel.send(`${args[1]} is not a valid job, please make sure you have spelt it correctly and try again.`)
        }
    }
}