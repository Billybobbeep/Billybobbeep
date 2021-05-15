const guildData = require('../events/client/database/models/guilds');
const express = require('express');
const router = express.Router();
const discordAuth = require('disco-oauth');
const authClient = new discordAuth(process.env.clientId, process.env.clientSecret);

router.get('/login', function(req, res) {
    try {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${process.env.clientId}&redirect_uri=${'https://billybobbeep-1.tyler2p.repl.co/auth'}&response_type=code&scope=identify%20guilds`);
    } catch {
        res.status(400);
        res.render('errors/400');
    }
});

router.get('/auth', async function(req, res) {
    try {
        if (!req.query.code) {
            res.json({ error: 'Cannot authorize', data: null });
        } else {
            const code = req.query.code;
            const key = await authClient.getAccess(code.toString());

            req.cookie('token', key);
            res.redirect('/dashboard');
        }
    } catch(error) {
        res.status(400);
        res.render('errors/400');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('key');
    res.render('logout');
});

module.exports = router;