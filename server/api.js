const guildData = require('../events/client/database/models/guilds');
const express = require('express');
const router = express.Router();
const { Client } = require('discord.js');
const client = new Client();
client.login(process.env.token);

router.get('/api/images/guilds/:id', function(req, res) {
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

router.post('/api/credits', function(req, res) {
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

router.post('/api/guilds/info', function(req, res) {
    if (!req.query.guildId) return res.json({ error: 'Could not find guild ID query', data: null });
    if (!client.guilds.cache.get(req.query.guildId)) {
        res.json({ error: 'Guild not in selected cache', data: null });
    } else {
        let guild = client.guilds.cache.get(req.query.guildId);
        try {
            res.json({ data: { name: guild.name, members: guild.memberCount, region: guild.region, available: guild.available }, error: null });
        } catch {
            res.json({ error: 'Internal error', data: null});
        }
    }
});

router.get('/api/guilds/data', function(req, res) {
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