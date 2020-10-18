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
    wait()


    if (args[1]) {
        embed.setTitle(`${args[1]} | Job Description`)
        embed.setFooter(`If you would like to apply for this job enter the command ${prefix}apply ${args[1]}`)
        if (args[1].toLowerCase() === 'cashier') {

        } else if (args[1].toLowerCase() === 'teacher') {

        } else if (args[1].toLowerCase() === 'waiter') {
        
        } else if (args[1].toLowerCase() === 'receptionist') {

        } else if (args[1].toLowerCase() === 'architect') {

        } else if (args[1].toLowerCase() === 'lifeguard') {
   
        } else if (args[1].toLowerCase() === 'nurse') {

        } else if (args[1].toLowerCase() === 'police') {
        
        } else if (args[1].toLowerCase() === 'engineer') {
        
        } else if (args[1].toLowerCase() === 'chief') {
        
        } else if (args[1].toLowerCase() === 'clinical scientist') {
        
        } else if (args[1].toLowerCase() === 'head scientist') {

        } else if (args[1].toLowerCase() === 'lawyer') {

        } else if (args[1].toLowerCase() === 'social worker') {

        } else if (args[1].toLowerCase() === 'doctor') {

        } else {
            message.channel.send(`${args[1]} is not a valid job, please make sure you have spelt it correctly and try again.`)
        }
    }
}