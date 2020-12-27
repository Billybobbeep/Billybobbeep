module.exports = {
    name: 'updatestats',
    description: 'Update the member stats',
    catagory: 'other',
    execute (message, prefix, client) {
        const configFile = require('../../structure/config.json');
        const db = require('../../structure/global.js').db;        
        let countChannel = {
            total: db.get(message.guild.id + '.serverStats.totalNo'),
            member: db.get(message.guild.id + '.serverStats.memberNo'),
            bots: db.get(message.guild.id + '.serverStats.botNo'),
            serverID: message.guild.id
        }
        if (!countChannel.total || !countChannel.member || !countChannel.bots) return message.channel.send(`This server has not been set up to use this command);
        var tu = db.get(message.guild.id + '.serverStats.totalNoText') || 'Total Users:'
        var tm = db.get(message.guild.id + '.serverStats.memberNoText') || 'Members:';
        var tb = db.get(message.guild.id + '.serverStats.botNoText') || 'Bots:';
        try {
            client.channels.cache.get(countChannel.total).setName(`${tu} ${message.guild.memberCount}`);
            client.channels.cache.get(countChannel.member).setName(`${tm} ${message.guild.members.cache.filter(m => !m.user.bot).size}`);
            client.channels.cache.get(countChannel.bots).setName(`${tb} ${message.guild.members.cache.filter(m => m.user.bot).size}`);
            message.channel.send(`Successfully updated the server stats);
        } catch {
            message.channel.send(`There was an error whilst updating the server stats);
        }
    }
}