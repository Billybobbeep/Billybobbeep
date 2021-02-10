module.exports = async (client) => {
  const express = require('express');
  const app = express();
  const Discord = require('discord.js')
  let port = 3000;
  const bot = require('./utils/data.js');
  const fetch = require('node-fetch');
  const logging = require('./utils/functions').logging;

  app.use('/style', express.static('style'));
  app.set('view engine', 'ejs');

  app.get('/', function(req, res) {
    res.redirect('/home');
  });
  app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
  app.get('/home/analytics', (req, res) => {
    res.sendFile(__dirname + '/public/analytics.html')
  });
  app.get('/discord/invite', function(req, res) {
    res.redirect('https://discord.com/invite/qNJEj3s');
  });

  app.post('/api/:name', (req, res) => {
    if (req.params.name === 'all') {
      bot.data(function(client, data) { res.send(data) });
    } else {
      res.status(404);
      res.json('Error: Invalid database');
    }
  });
  app.use(function(req, res) {
    if (req.url.toLowerCase().startsWith('/api')) {
      res.status(404);
      res.json({ error: 'Cannot find what you\'re looking for'});
    } else {
      res.status(404);
      res.sendFile(__dirname + '/public/error404.html');
    }
  });

  app.listen(port, () => console.log('Billybobbeep is online'));
}