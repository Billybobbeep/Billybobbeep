module.exports = {
    name: 'rank',
    description: 'View your xp',
    catagory: 'info',
    alias: ['cl', 'currlvl', 'xp'],
    guildOnly: true,
    slashInfo: { enabled: true, public: false },
    options: [{ name: 'user', description: 'The users rank', type: 6, required: true }],
    /**
     * Execute the selected command
     * @param {object} message The message that was sent
     * @param {string} prefix The servers prefix
     * @param {Client} client The bots client
     */
    async execute (message, prefix, _client) {
        const guildMemberData = require('../../events/client/database/models/guildMembers.js');
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
        if (!user.username) user = user.user;
        let displayName = `${user.username[0].toUpperCase()}${(user.username).substring(1).toLowerCase()}`;
        message.channel.startTyping();
        let msg = await message.channel.send('Preparing..');

        guildMemberData.findOne({ guildId: message.guild.id, memberId: user.id}).then(async result => {
            if (!result) return msg.edit('No data found');
            let level = result.level || 0;
            let xp = result.xp || 1;
            let discriminator = user.discriminator;
            let xpForLevel = 150;
            if (result.activeGuild) {
                xpForLevel = level * 2 + 200;
                if (xpForLevel < 100)
                    xpForLevel = 100;
            } else {
                xpForLevel = Math.floor(level * 2 + 150);
                if (xpForLevel < 100)
                    xpForLevel = 100;
            }
            const canvas = require('canvas');
            let avatar = await canvas.loadImage(user.displayAvatarURL({ dynamic: false, format: 'png' }))
            require('../../utils/functions').rank(message, avatar, displayName, parseInt(discriminator), xp, xpForLevel, level);
            msg.delete();
            message.channel.stopTyping();
        });
    }
}