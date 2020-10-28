const ms = require('ms');
module.exports = (db, client) => {
    setInterval(() => {
        mute(db, client)
    }, 60000);
}

function mute(db, client) {
    var MM = db.get('mutedMembers');
    var guild;
    var user;
    var time;

    if (!MM) return;
    if (MM.length < 1) return;
    console.log(MM)

    MM.forEach(result => {
        result = result.replace('_', ' ').replace('_', ' ');
        result = result.split(/ +/g);
        guild = result[0];
        user =  result[1];
        time = result[2];
        
        guild = client.guilds.cache.get(guild)
        let member = guild.members.cache.get(user);
        if (!member) return remove(MM, db, guild, user, time);
        if (member.roles.cache.find(role => role.id === db.get(guild.id + db.get(guild + '.mutedRole')))) {
            if (Date.now() > ms(time)) {
                remove(MM, db, guild, user, time)
            }
        } else {
            remove(MM, db, guild, user, time);
        }
    });
}

function remove(table, db, guild, user, time) {
    let clientGuild = client.guilds.cache.get(guild);
    let member = guild.members.cache.get(user);
    console.log(table)
    table.splice(table.indexOf(guild.id.toString() + '_' + user.toString() + '_' + time.toString()), 1);
    db.set('mutedMembers', table);
    console.log(table);
    if (!member) return;
    if (member.roles.cache.find(role => role.id === db.get(guild.id + db.get(guild.id + '.mutedRole')))) {
        member.roles.remove(clientGuild.roles.cache.find(role => role.id === db.get(guild.id + '.mutedRole')));
    }
}