module.exports = {
    name: 'updatestats',
    description: 'Update the member stats',
    catagory: 'other',
    /**
     * Execute the selected command
     * @param {Object} message The message that was sent
     * @param {String} prefix The servers prefix
     * @param {Client} client The bots client
     */
    execute (message, _prefix, client) {
        const guildData = require('../../events/client/database/models/guilds.js');
        guildData.findOne({ guildId: message.guild.id }).then(result => {
            if (!result) return message.channel.send({ content: 'This server has not been set up to use this command' });
            let data = {
                total: result.preferences.serverStats_totalNo,
                member: result.preferences.serverStats_memberNo,
                bots: result.preferences.serverStats_botNo,
                serverID: message.guild.id
            }
            if (!data.total || !data.member || !data.bots) return message.channel.send({ content: 'This server has not been set up to use this command' });
            let tu = result.preferences.serverStats_totalNoText || 'Total Users:'
            let tm = result.preferences.serverStats_memberNoText || 'Members:';
            let tb = result.preferences.serverStats_botNoText || 'Bots:';
            try {
                client.channels.cache.get(data.total).setName(`${tu} ${message.guild.memberCount}`);
                client.channels.cache.get(data.member).setName(`${tm} ${message.guild.members.cache.filter(m => !m.user.bot).size}`);
                client.channels.cache.get(data.bots).setName(`${tb} ${message.guild.members.cache.filter(m => m.user.bot).size}`);
                message.channel.send({ content: 'Successfully updated the server stats' });
            } catch {
                message.channel.send({ content: 'There was an error whilst updating the server stats' });
            }
        });
    }
}