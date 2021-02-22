const chalk = require('chalk');
const { RichPresenceAssets } = require('discord.js');

module.exports = async (client) => {
  const express = require('express');
  const app = express();
  const bot = require('./utils/data.js');
  const discordAuth = require('disco-oauth');
  const guildData = require('./events/client/database/models/guilds');
  const port = 3000;
  

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
    res.redirect('https://discord.com/oauth2/authorize?client_id=731498842813366304&permissions=8&scope=bot');
  })

  app.get('/discord', (req, res) => {
      if (req.query.code && req.query.userId) {
        oauthClient.getAccess(req.query.code);
        oauthClient.getUser(req.query.code).then(user => {
          res.send(JSON.stringify(user));
        }).catch(error => {
          res.send(error.message);
        });
      } else {
          res.send('Invalid query sent');
      }
  });
  app.get('/login', function(req, res) {
    console.log(chalk.blue(req.headers.host))
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&redirect_uri=${/*'http://' + req.headers.host + '/auth'*/ 'https://billybobbeep-1.tyler2p.repl.co/auth'}&response_type=code&scope=identify%20guilds`);
  });
  app.get('/auth', async function(req, res) {
    const code = req.query.code;
    const authClient = new discordAuth('731498842813366304', 'PQ8T2ybPhlgEvB9ewHFpgfQGXTUx8exw');

    if (!code) {
      res.json({ error: 'Cannot authorize', data: null });
    } else {
      const key = await authClient.getAccess(code);
      //authClient.getUser(key).then(user => res.send(user));
      res.send(key);
    }
  });

  app.get('/images/guilds/:id', function(req, res) {
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
  app.post('/api/credits', function(req, res) {
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
  app.post('/api/guilds/info', function(req, res) {
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
  app.get('/api/guilds/data', function(req, res) {
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
  app.post('/api/:name', function(req, res) {
    if (req.params.name === 'all') {
      bot.data(function(client, data) { res.send(data) });
    } else {
      res.status(404);
      res.json({ error: 'Invalid database', data: null });
    }
  });

  app.get('*', function(req, res) {
    if (req.url.toLowerCase().startsWith('/api')) {
      res.status(404);
      res.json({ error: 'Cannot find what you\'re looking for', data: null });
    } else {
      res.status(404);
      res.sendFile(__dirname + '/public/error404.html');
    }
  });

  app.listen(port, () => console.log('Billybobbeep is online'));
}