module.exports = async (client) => {
  const express = require('express');
  const app = express();
  const Discord = require('discord.js')
  var port = 3000;
  const bot = require('./utils/data.js');
  const db = require('./data/databaseManager/index.js');
  const fs = require('fs');
  const { parse } = require('querystring');
  const fetch = require('node-fetch');
  const http = require('http');
  const logging = require('./utils/functions').logging;

  app.use('/style', express.static('style'));
  app.set('view engine', 'ejs');

  function listen() {
    app.post('/api/database/:name/get', (req, res) => {
      if (req.params.name !== 'all') res.json('Error: Invalid database');
      key = req.params.key;
      bot.data(function(data) { res.send(data) });
    });
    app.get('/api/:key/chatbot', async function(req, res) {
      let message = req.query.message;
      let key = req.params.key;
      var debounce = false;
      if (!key) {
        res.json('An invalid API key was sent.');
        res.status(404);
        debounce = true;
      }
      if (key !== undefined) {
        let keys = db.get('apiKey');
        if (!keys || keys === '[]') {
          res.json('An invalid API key was sent.');
          res.status(404);
          debounce = true;
        } else if (keys.length < 1) {
          res.json('An invalid API key was sent.');
          res.status(404);
          debounce = true;
        } else {
          keys.forEach(result => {
            result = result.replace('_', ' ');
            result = result.split(/ +/g);
            if (req.params.key === result[1]) {
              debounce = '1';
            }
          });
          if (debounce !== '1') {
            res.json('An invalid API key was sent.');
            res.status(404);
            debounce = true;
          }
        }
      }
      if (debounce === true) return;
      var reply = 'undefined';
      if (!message) {
        res.json('missing message query')
      }
      if (message.toLowerCase() === 'hello' || message.toLowerCase() === 'hi' || message.toLowerCase() === 'hiya') reply = message.toLowerCase();
      if (message.toLowerCase().includes('test')) reply = 'test command';
      if (message.toLowerCase().includes('ily')) reply = 'ily2';
      if (reply === 'undefined') {
        let response = await fetch('https://some-random-api.ml/chatbot?message=' + message);
        reply = await response.text();
        if (reply.toLowerCase().startsWith('<!doctype html>')) res.json('This channel is causing issues for me. Please try again later.');
        reply = reply.replace('response', '').replace('{', '').replace('}', '').replace('??', '?').replace('???', '?').replace('"', '').replace('"', '').replace('"', '').replace('error', '').replace(')', '').replace(':', '');
      }
      if (req.query.cap && req.query.cap === 'no' && req.query.punc && req.query.punc === 'no') {
        res.json(reply.toLowerCase());
      } else if (req.query.cap && req.query.cap === 'yes' && req.query.punc && req.query.punc === 'no') {
        res.json(reply[0].toUpperCase() + reply.substring(1).toLowerCase());
      } else if (req.query.cap && req.query.cap === 'yes' && req.query.punc && req.query.punc === 'yes') {
        reply = reply[0].toUpperCase() + reply.substring(1).toLowerCase();
        if (message.endsWith('?') || message.endsWith('!') || message.endsWith('.') || message.endsWith('/')) {
          reply = reply;
        } else {
          reply = reply + '.'
        }
        res.json(reply.replace('?.', '?').replace('..', '.').replace('!.', '!'));
      } else if (req.query.cap && req.query.cap === 'no' && req.query.punc && req.query.punc === 'yes') {
        reply = reply.toLowerCase();
        if (message.endsWith('?') || message.endsWith('!') || message.endsWith('.') || message.endsWith('/')) {
          reply = reply;
        } else {
          reply = reply + '.'
        }
        res.json(reply.replace('?.', '?').replace('..', '.').replace('!.', '!'));
      } else if (req.query.cap && req.query.cap === 'full' && req.query.punc && req.query.punc === 'yes') {
        reply = reply.toUpperCase();
        if (message.endsWith('?') || message.endsWith('!') || message.endsWith('.') || message.endsWith('/')) {
          reply = reply;
        } else {
          reply = reply + '.'
        }
        res.json(reply.replace('?.', '?').replace('..', '.').replace('!.', '!'));
      } else if (req.query.cap && req.query.cap === 'full' && req.query.punc && req.query.punc === 'no') {
        res.json(reply.toUpperCase());
      } else {
        reply = reply[0].toUpperCase() + reply.substring(1).toLowerCase();
        if (message.endsWith('?') || message.endsWith('!') || message.endsWith('.') || message.endsWith('/')) {
          reply = reply;
        } else {
          reply = reply + '.'
        }
        res.json(reply.replace('?.', '?').replace('..', '.').replace('!.', '!').replace('"', '').replace('"', ''));
      }
    });
    app.get('/', function(req, res) {
      res.redirect('/home');
    });
    app.get('/home', function(req, res) {
      res.sendFile(__dirname + '/Public/index.html');
    });
    app.get('/home/status', function(req, res) {
      res.sendFile(__dirname + '/Public/status.html');
    });
    app.get('/home/analytics', (req, res) => {
      res.sendFile(__dirname + '/Public/analytics.html')
    });
    app.get('/contact/submit', (req, res) => {
      if (!req.query) res.render('general.ejs');
      if (!req.query.fName || !req.query.sName || !req.query.discord || !req.query.subject || !req.query.message) res.render('general.ejs');
      const embed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Contact Us Submissions')
        .setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`)
        .setTimestamp()
        .setDescription(
          '**First Name:** ' + req.query.fName +
          '\n**Second Name:** ' + req.query.sName +
          '\n**Discord Tag:** ' + req.query.discord +
          '\n**Subject:** ' + req.query.subject +
          '\n**Message:** ' + req.query.message
        )
      logging(embed, undefined, client)
      res.render('success.ejs');
    });
    app.get('/discord/invite', function(req, res) {
      fs.readFile('./Public/analytics/invites.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
          return;
        }
        data = JSON.parse(data)
        if (!req.query.from) {
          var total = data[0].total;
          var website = data[0].website;
          var json = [{
            'total': total + 1,
            'spoink': data[0].spoink,
            'other': data[0].other,
            'website': website + 1
          }]
          json = JSON.stringify(json)
          fs.writeFile('./Public/analytics/invites.json', json, 'utf8', function() { })
          res.redirect('https://discord.com/invite/qNJEj3s');
        } else {
          if (req.query.from === 'spoink' || req.query.from === 'tyler') {
            var total = data[0].total;
            var spoink = data[0].spoink;
            var json = [{
              'total': total + 1,
              'spoink': spoink + 1,
              'other': data[0].other,
              'website': data[0].website
            }]
            json = JSON.stringify(json)
            fs.writeFile('./Public/analytics/invites.json', json, 'utf8', function() { })
            res.redirect('https://discord.com/invite/qNJEj3s');
          }
            else if (req.query.from === 'stack') {
              res.redirect('https://discord.com/invite/qNJEj3s')
          } else {
            var total = data[0].total;
            var other = data[0].other;
            var json = [{
              'total': total + 1,
              'spoink': data[0].spoink,
              'other': other + 1,
              'website': data[0].website
            }]
            json = JSON.stringify(json)
            fs.writeFile('./Public/analytics/invites.json', json, 'utf8', function() { })
            res.redirect('https://discord.com/invite/qNJEj3s');
          }
        }
      });
    });
    app.get('/terms', (req, res) => {
      res.sendFile(__dirname + '/Public/terms.html');
    });
    app.post('/terms', (req, res) => {
      var users = new Set()
      var data;
      var body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        data = parse(body);
      });
      setTimeout(() => {
        if (req.query.denied) {
          let channel = client.channels.cache.get('769590641931714602');
          let accEmbed = new Discord.MessageEmbed();
          accEmbed.setTitle(`${data.discordTag} denied the terms`);
          accEmbed.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);
          accEmbed.setTimestamp()
          try {
            channel.send(accEmbed)
          } catch {
            return res.render('general.ejs');
          }
          users.add(data.discordTag)
          res.render('terms.ejs', { message : 'You have denied the terms.'});
        } else {
          if (users.has([data.discordTag])) res.render('terms.ejs', { message : 'You have agreed to the terms.'});
          let channel = client.channels.cache.get('769590641931714602');
          let accEmbed = new Discord.MessageEmbed();
          accEmbed.setTitle(`${data.discordTag} accepted the terms`);
          accEmbed.setColor(`${db.get('733442092667502613.embedColor') || '#447ba1'}`);
          accEmbed.setTimestamp()
          try {
            channel.send(accEmbed)
          } catch {
            return res.render('general.ejs');
          }
          users.add(data.discordTag)
          res.render('terms.ejs', { message : 'You have agreed to the terms.'});
        }
        }, 50);
      });

    app.use(function(req, res) {
      if (req.url.toLowerCase().startsWith('/api')) {
        res.status(404);
        res.json('An invalid API key was sent.')
      } else {
        res.status(404);
        res.sendFile(__dirname + '/Public/error404.html');
      }
    });

    app.listen(port, () => { console.log('Billybobbeep is online') });

  }

  listen()

  setInterval(() => {
    http.get(`http://localhost:3000/home`);
  }, 280000);
}