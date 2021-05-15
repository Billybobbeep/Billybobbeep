const guildData = require('../events/client/database/models/guilds');
const express = require('express');
const router = express.Router();
const authClient = require('./modules/authClient');

function login(res) {
    res.status(401);
    res.render('errors/login');
}
router.use(function(req, res, next) {
    if ((req.path).includes('dashboard')) {
        if (!req.cookies.token) return login(res);
        authClient.getUser(req.cookies.token).then(user => {
            res.send(user);
        });
    } else {
        next();
    }
});

router.get('/dashboard', function(req, res) {
    res.status(308);
});

module.exports = router;