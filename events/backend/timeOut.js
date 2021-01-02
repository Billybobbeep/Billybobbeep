module.exports = (client) => {
    const mutedData = require('../client/database/models/mutedMembers');
    const awaitingData = require('../client/database/models/awaiting');
    const guildMemberData = require('../client/database/models/guildMembers');
    setInterval(() => {
        mute(mutedData, client)
    }, 300000);
    setInterval(() => {
        application(awaitingData, client)
    }, 180000);
    setInterval(() => {
        database(guildMemberData, client)
    }, 300000);
}

function database(db, client) {
    db.find(function(err, data) {
        if (err) return console.error(err);
        if (!data) return;
        data.forEach(result => {
            let amt = data.economy_balance;
            let newAmt;
            if (amt && amt.toString().includes('.')) {
                amt = amt.toString().split('.');
                if (amt[1].length > 2) newAmt = [amt[0]];
                else return;
                newAmt.push(amt[1][0] + amt[1][1]);
                result.economy_balance = Number(newAmt[0]);
                result.save();
            }

            amt = result.bank_balance;
            newAmt = [];
            if (amt && amt.toString().includes('.')) {
                amt = amt.toString().split('.');
                if (amt[1].length > 2) newAmt = [amt[0]];
                else return;
                newAmt.push(amt[1][0] + amt[1][1]);
                result.bank_balance = Number(newAmt[0]);
                result.save();
            }
        });
    });
}

function application(db, client) {
    const { MessageEmbed } = require('discord.js');
    const moment = require('moment');
    let appliedUsers = require('../client/database/models/awaiting');
    let userData = require('../client/database/models/users');
    appliedUsers.find(function(err, data) {
        if (!data) return;
        data.forEach(async result => {
            let user = client.users.cache.get(result.memberId);
            let job = result.job;
            let userResult = await userData.findOne({ userId: user.id });
            
            const embed = new MessageEmbed();
            embed.setColor('#447ba1');
            embed.setAuthor(user.username, user.displayAvatarURL());
            let failed = false;
            let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
            let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
            let results = [tick, cross, tick];
            let result1 = Math.floor(Math.random() * results.length);
            let result2 = Math.floor(Math.random() * results.length);
            let result3 = Math.floor(Math.random() * results.length);
            embed.setDescription(`Your application results are the following:\n\n**Qualifications:**\n${results[result1]} Grammar\n${results[result2]} Communications\n${results[result3]} Loyalty\n${results[result2]} Trustworthiness\n\n`);
            if (result1 === 1 && result2 === 1) failed = true;
            if (result2 === 1 && result3 === 1) failed = true;
            if (result1 === 1 && result3 === 1) failed = true;

            if (failed === true) {
                embed.addField('Overall Score:', 'Failed');
                embed.setFooter('Feel free to apply again in 2 minutes');
                result.job_lastApplied= Date.now();
                result.job_awaiting = false;
                result.save();
            } else {
                embed.addField('Overall Score:', 'Passed');
                embed.setFooter('Feel free to start working when you\'re ready');
                result.job_lastApplied= Date.now();
                result.job_awaiting = false;
                result.job_name = job.toLowerCase();
                result.save();
            }
            try {
                user.send(embed);
            } catch {
                result.delete();
            }
            result.delete();
        });
    });
}

function mute(db, client) {
    let MM = require('../client/database/models/mutedMembers');
    MM.find(function(err, data) {
        let guild;
        let user;
        let time;

        if (!data) return;

        data.forEach(result => {
            guild = result.guildId;
            user =  result.memberId;
            time = result.time;
            
            guild = client.guilds.cache.get(guild);
            let member = guild.members.cache.get(user);
            if (!member) return remove(db, guild, user);
            if (member.roles.cache.find(role => role.id === db.get(guild.id + '.mutedRole'))) {
                if (Date.now() > time)
                remove(db, guild, user, 'mute');
            } else
                remove(db, guild, user, 'mute');
        });
    });
}

function remove(db, guild, user, string) {
    const guildData = require('../client/database/models/guilds');
    let member = guild.members.cache.get(user);
    let mutedRole = guildData.findOne({ guildId: guild.id }).then(result => result.mutedRole);
    db.findOneAndRemove({ memberId: user.id });
    if (string === 'mute') {
        setTimeout(() => {
            let role = guild.roles.cache.find(role => role.id === mutedRole);
            if (member.roles.cache.find(role => role.id === mutedRole))
                member.roles.remove(role.id);
        }, 50);
    }
}