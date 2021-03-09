const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
    res.redirect('/home');
});
router.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/root/index.html'));
});
router.get('/home/analytics', function(req, res) {
    res.sendFile(path.join(__dirname, '../views/root/analytics.html'))
});
router.get('/invite', function(req, res) {
    res.redirect(`https://discord.com/oauth2/authorize?client_id=${process.env.clientId}&permissions=8&scope=bot`);
});

module.exports = router;