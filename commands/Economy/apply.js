module.exports = {
    name: 'apply',
    description: 'Apply for a job.',
    catagory: 'economy',
    usage: 'apply [job name]',
    guildOnly: true,
    async execute (message, prefix, client) {
        //application_process(message, 'cashier', client);
        const Discord = require('discord.js');
        const db = require('../../data/databaseManager/index.js');
        const ms = require('ms');
        const embed = new Discord.MessageEmbed();
        const info = require('./jobRequirements.js');
        embed.setColor(db.get(message.guild.id + '.embedColor') || '#447ba1');
        embed.setAuthor(message.author.username, message.author.displayAvatarURL());

        let args = message.content.slice(prefix.length).trim().split(/ +/g);

        let timesFired = db.get(message.author.id + '.jobs.timesFired') || 0;
        let lastFired = db.get(message.author.id + '.jobs.lastFired') || 0;
        let level = db.get(message.author.id + '.jobs.level') || 0;

        if (!args[1]) {
            embed.setDescription(`Please specify a job.`);
            embed.setFooter(`To view the full job list use the command ${prefix}jobs`);
            return message.channel.send(embed);
        }
        if (db.get(message.author.id + '.jobs.awaiting') === true) {
            var cooldown = 300000;
            let lastApp = db.get(message.author.id + '.jobs.lastApplied');
            if (cooldown - (lastApp - Date.now()) > 0) {
                let timeObj = ms(cooldown - (Date.now() - lastApp));
                timeObj = timeObj.replace('s', ' seconds').replace('m', ' minutes').replace('h', ' hours');
                embed.setDescription(`You have already applied in the last 5 minutes.\nTime Left: **${timeObj}**`);
                message.channel.send(embed);
            }
        } else {
            var job = '';
            let args1 = args.join(' ').split(/ +/g).slice(1).join(' ').split('-').join(' ');
            if (args.slice(1).join('').toLowerCase() === 'cashier') {
                job = 'cashier';
                if (level > (info.cashier.level + info.cashier.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'teacher') {
                job = 'teacher'
                if (level < info.teacher.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.teacher.level + info.teacher.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'waiter') {
                job = 'waiter'
                if (level < info.waiter.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.waiter.level + info.waiter.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'receptionist') {
                job = 'receptionist'
                if (level < info.receptionist.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.receptionist.level + info.receptionist.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'architect') {
                job = 'architect'
                if (level < info.architect.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.architect.level + info.architect.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'lifeguard') {
                job = 'lifeguard'
                if (level < info.lifeguard.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.lifeguard.level + info.lifeguard.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'nurse') {
                job = 'nurse'
                if (level < info.nurse.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.nurse.level + info.nurse.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'police') {
                job = 'police'
                if (level < info.police.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.police.level + info.police.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'engineer') {
                job = 'engineer'
                if (level < info.engineer.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.engineer.level + info.engineer.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'chief') {
                job = 'chief'
                if (level < info.chief.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.chief.level + info.chief.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args1.toLowerCase() === 'clinical scientist') {
                job = 'clinical scientist'
                if (level < info.clinicalScientist.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.clinicalScientist.level + info.clinicalScientist.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args1.toLowerCase() === 'head scientist') {
                job = 'head scientist'
                if (level < info.headScientist.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.headScientist.level + info.cashier.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'lawyer') {
                job = 'lawyer'
                if (level < info.lawyer.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.lawyer.level + info.lawyer.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args1.toLowerCase() === 'social worker') {
                job = 'social worker'
                if (level < info.socialWorker.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.socialWorker.level + info.socialWorker.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else if (args.slice(1).join('').toLowerCase() === 'doctor') {
                job = 'doctor'
                if (level < info.doctor.level) {
                    embed.setDescription(`You cannot apply for this job as your job level is too low.`);
                    embed.setFooter(`Try working at your current job before applying again.`);
                    message.channel.send(embed);
                } else if (level > (info.doctor.level + info.doctor.promotions)) {
                    embed.setDescription(`You cannot apply for this job as your job level is too high.`);
                    embed.setFooter(`If you would like to start over you can apply for a prestige.`);
                    message.channel.send(embed);
                } else {
                    let msg = await message.channel.send('Are you sure you want to apply for the ' + job + ' job?');
                    reactions(message, msg, job, client);
                }
            } else {
                message.channel.send(`**${args1[0].toUpperCase() + args1.toLowerCase().substring(1)}** is not a valid job, please make sure you have spelt it correctly and try again.`)
            }
        }
    }
}

function application_process(message, job, client) {
    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed();
    const db = require('../../data/databaseManager/index.js');

    let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
    let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
    
    embed.setDescription(`${tick} Successfully applied for the ${job} job!`);
    embed.setAuthor('You will be DMed your application results soon.', message.author.displayAvatarURL());
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
    message.channel.send(embed);
    db.push('awaiting', `${message.author.id}_${Date.now()}_${job}`);
    db.set(message.author.id + '.jobs.awaiting', true);
}
async function reactions(message, msg, job, client) {
    let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
    let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
    const filter = (reaction, user) => {
        return (
        [tick.id, cross.id].includes(reaction.emoji.id) && user.id === message.author.id
        );
    }
    await msg.react(tick);
    await msg.react(cross);
    msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
    .then((collected) => {
        const reaction = collected.first();

        if (reaction.emoji.id === tick.id) {
            msg.reactions.removeAll();
            application_process(message, job, client);
        } else {
            msg.reactions.removeAll();
            message.channel.send(`${cross} Cancelled prompt.`);
        }
    }).catch(() => {
        msg.reactions.removeAll();
    });
}