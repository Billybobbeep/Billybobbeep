const { table } = require('quick.db');

module.exports = (client) => {
    const db = require('quick.db');
    setInterval(() => {
        mute(db, client)
    }, 300000);
    setInterval(() => {
        application(db, client)
    }, 180000);
}

function application(db, client) {
    const { MessageEmbed } = require('discord.js');
    let appliedUsers = db.get('awaiting');
    var table = [];
    appliedUsers.forEach(result => {
        table.push(result);
        result = result.replace('_', ' ').replace('_', ' ').replace('_', ' ').replace('_', ' ');
        result = result.split(/ +/g);
        let user = client.users.cache.get(result[0]);
        let date = result[1];
        let job = result[2];
        let emj = client.emojis.cache.get(require('../../structure/config.json').emoji)
        
        const embed = new MessageEmbed();
        embed.setColor(`${db.get(require('../../structure/config.json').ServerId + '.embedColor') || '#447ba1'}`);
        embed.setAuthor(user.username, user.displayAvatarURL());
        var failed = false;
        let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
        let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
        var results = [tick, cross, tick];
        var result1 = Math.floor(Math.random() * result.length);
        var result2 = Math.floor(Math.random() * result.length);
        var result3 = Math.floor(Math.random() * result.length);
        embed.setDescription(`Your application results are the following:\n\n**Qualifications:**\n${results[result1]} Grammar\n${results[result2]} Communications\n${results[result3]} Loyalty\n${results[result2]} Trustworthiness\n\n`);
        console.log(result2.toString())
        if (result1 === 1 && result2 === 1) failed = true;
        if (result2 === 1 && result3 === 1) failed = true;
        if (result1 === 1 && result3 === 1) failed = true;

        if (failed === true) {
            embed.addField(`Overall Score:`, `Failed`);
            embed.setFooter(`Feel free to apply again in 2 minutes.`);
            db.delete(user.id + '.jobs.awaiting');
            db.set(user.id + '.jobs.lastApplied', Date.now());
        } else {
            embed.addField(`Overall Score:`, `Passed`);
            embed.setFooter(`Feel free to start working when you're ready.`)
            db.delete(user.id + '.jobs.awaiting');
            db.set(user.id + '.jobs.lastApplied', Date.now());
            db.set(user.id + `.jobs.${job}`, true);
        }
        try {
            user.send(embed);
        } catch {
            return table.splice(table.indexOf(result.join('_')));
        }
        table.splice(table.indexOf(result.join('_')));
    });
    db.set('awaiting', table);
}

function mute(db, client) {
    var MM = db.get('mutedMembers');
    var guild;
    var user;
    var time;

    if (!MM) return;
    if (MM.length < 1) return;

    MM.forEach(result => {
        result = result.replace('_', ' ').replace('_', ' ');
        result = result.split(/ +/g);
        guild = result[0];
        user =  result[1];
        time = result[2];
        
        guild = client.guilds.cache.get(guild)
        let member = guild.members.cache.get(user);
        if (!member) return remove(MM, db, guild, user, time, client);
        if (member.roles.cache.find(role => role.id === db.get(guild.id + '.mutedRole'))) {
            if (Date.now() > time) {
                remove(MM, db, guild, user, time, client, 'mute');
            }
        } else {
            remove(MM, db, guild, user, time, client, 'mute');
        }
    });
}

function remove(table, db, guild, user, time, client, string) {
    let member = guild.members.cache.get(user);
    table.splice(table.indexOf(guild.id.toString() + '_' + user.toString() + '_' + time.toString()), 1);
    db.set('mutedMembers', table);
    if (string === 'mute') {
        setTimeout(() => {
            var mutedRole = db.get(guild.id +'.mutedRole');
            var role = guild.roles.cache.find(role => role.id === mutedRole);
            if (member.roles.cache.find(role => role.id === mutedRole)) {
                member.roles.remove(role.id);
            }
        }, 50);
    }
}