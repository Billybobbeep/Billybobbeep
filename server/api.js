const { Router } = require('express');
const router = Router();
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const guildData = require('../events/client/database/models/guilds');
const userData = require('../events/client/database/models/users');
client.login(process.env.token);

let cache = {
    lastVote: false,
    lastVoteDate: false
}

async function userVoted(req, res) {
    let user = false;
    user = await client.users.fetch(req.body.user).catch(() => res.json({ error: 'Could not find user' }));
    if (cache.lastVoteDate < new Date().getTime() + 60000 && cache.lastVote && cache.lastVote.user == req.body.user && cache.lastVote.bot == req.body.bot) return res.send({ error: user.username + ' has already voted' });
    if (user && (req.body.bot).toString() == (client.user.id).toString() && (req.body.type).toLowerCase() == 'upvote') {
        if (!user) return res.json({ error: 'Could not find user' });
        userData.findOne({ userId: req.body.user }).then(async result => {
            if (!result) return;
            const embed = new MessageEmbed();
            embed.setTitle('Thank you for voting!');
            embed.setDescription('You have recieved `$100` for voting on [top.gg](https://top.gg/bot/' + client.user.id + ')');
            embed.setColor('#447ba1');
            await user.send(embed).catch(err => res.json({ error: 'User has DMs turned off' }));
            result.economy_balance = result.economy_balance + 100;
            result.save();
            res.json({ response: 200 });
            let votersChannel = await client.channels.fetch('847150442558390282');
            embed.setTitle(`${user.username}#${user.discriminator} ${req.body.type}d`);
            embed.setDescription(`${user.username} has ${req.body.type}d on [top.gg](https://top.gg/bot/${client.user.id}/vote)`);
            if (votersChannel) votersChannel.send(embed);
            cache.lastVoteDate = new Date().getTime();
            cache.lastVote = { user: req.body.user, bot: req.body.bot }
        });
    } else {
        res.json({ error: 'Internal Error' });
    }
}

router.post('/api/user/voted', function (req, res) {
    if (typeof cache.lastVote == 'string' && cache.lastVote == req.body.user) return;
    let user = client.users.fetch(req.body.user);
    if (!user) {
        client.once('ready', () => {
            userVoted(req, res);
        });
    } else
        userVoted(req, res);
});

router.get('/api/images/guilds/:id', function (req, res) {
    if (client.guilds.cache.get(req.params.id)) {
        //res.json({ data: { icon: client.guilds.cache.get(req.params.id).iconURL({ dynamic: true }) }, error: null });
        try {
            res.redirect(client.guilds.cache.get(req.params.id).iconURL({ dynamic: true }));
        } catch {
            res.json({ error: 'Internal error', data: null });
        }
    } else {
        res.status(404);
        res.json({ error: 'Guild not found', data: null });
    }
});

router.post('/api/credits', function (req, res) {
    if (client.users.cache.get('303097521314725890') && client.users.cache.get('697194959119319130') && client.users.cache.get('441613173003649028')) {
        res.json({ data: [client.users.cache.get('303097521314725890').tag, client.users.cache.get('697194959119319130').tag, client.users.cache.get('441613173003649028').tag], error: null });
    } else if (client.users.cache.get('303097521314725890') && client.users.cache.get('697194959119319130')) {
        res.json({ data: [client.users.cache.get('303097521314725890').tag, client.users.cache.get('697194959119319130').tag, 'wibbleywobbley#1564'], error: null });
    } else if (client.users.cache.get('303097521314725890') && client.users.cache.get('441613173003649028')) {
        res.json({ data: [client.users.cache.get('303097521314725890').tag, 'Spoink#2793', client.users.cache.get('441613173003649028').tag], error: null });
    } else if (client.users.cache.get('697194959119319130') && client.users.cache.get('441613173003649028')) {
        res.json({ data: ['Will Os#9857', client.users.cache.get('697194959119319130').tag, client.users.cache.get('441613173003649028').tag], error: null });
    } else {
        res.json({ data: ['Will Os#9857', 'Spoink#2793', 'wibbleywobbley#1564'], error: null });
    }
});

router.post('/api/guilds/info', function (req, res) {
    if (!req.query.guildId) return res.json({ error: 'Could not find guild ID query', data: null });
    if (!client.guilds.cache.get(req.query.guildId)) {
        res.json({ error: 'Guild not in selected cache', data: null });
    } else {
        let guild = client.guilds.cache.get(req.query.guildId);
        try {
            res.json({ data: { name: guild.name, members: guild.memberCount, region: guild.region, available: guild.available }, error: null });
        } catch {
            res.json({ error: 'Internal error', data: null });
        }
    }
});

router.get('/api/guilds/data', function (req, res) {
    if (!req.query.guildId) return res.json({ error: 'Could not find guild ID query', data: null });
    if (!client.guilds.cache.get(req.query.guildId)) {
        res.json({ error: 'Guild not in selected cache', data: null });
    } else {
        guildData.findOne({ guildId: req.query.guildId }).then(result => {
            if (!result) return res.json({ error: 'Guild could not be found', data: null });
            res.json({ data: result });
        }).catch(() => {
            res.json({ error: 'Internal error', data: null })
        });
    }
});

module.exports = router;