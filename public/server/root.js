const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res) {
    res.redirect('/home');
});
router.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '../pages/index.html'));
});
router.get('/home/analytics', function(req, res) {
    res.sendFile(path.join(__dirname, '../pages/analytics.html'))
});
router.get('/invite', function(req, res) {
    res.redirect('https://discord.com/oauth2/authorize?client_id=731498842813366304&permissions=8&scope=bot');
});

module.exports = router;