const guildData = require('../../events/client/database/models/guilds');
const express = require('express');
const router = express.Router();

router.get('/login', function(req, res) {
    try {
        res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&redirect_uri=${'https://billybobbeep-1.tyler2p.repl.co/auth'}&response_type=code&scope=identify%20guilds`);
    } catch {
        //res.render()
        res.send('error')
    }
});

router.get('/auth', async function(req, res) {
    try {
        if (!code) {
            res.json({ error: 'Cannot authorize', data: null });
        } else {
            const code = req.query.code;
            const key = await authClient.getAccess(code.toString());

            req.cookie('token', key);
            res.redirect('/dashboard');
        }
    } catch(error) {
        res.redirect('/');
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie('key');
    res.render('logout');
});

module.exports = router;