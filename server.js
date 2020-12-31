module.exports = async (client) => {
  const express = require('express');
  const app = express();
  const Discord = require('discord.js')
  let port = 3000;
  const bot = require('./utils/data.js');
  const fetch = require('node-fetch');
  const logging = require('./utils/functions').logging;
  const guildData = require('./events/client/database/models/guilds');

  app.use('/style', express.static('style'));
  app.set('view engine', 'ejs');

  function listen() {
    app.post('/api/database/:name/get', (req, res) => {
      if (req.params.name !== 'all') res.json('Error: Invalid database');
      key = req.params.key;
      bot.data(function(client, data) { res.send(data) });
    });
    app.get('/api/chatbot', async function(req, res) {
      let message = req.query.message;
      let debounce = false;

      let reply = undefined;
      if (!message) return res.json('missing message query');
      if (message.toLowerCase() === 'hello' || message.toLowerCase() === 'hi' || message.toLowerCase() === 'hiya') reply = message.toLowerCase();
      if (message.toLowerCase().includes('test')) reply = 'test command';
      if (message.toLowerCase().includes('ily')) reply = 'ily2';
      if (message.toLowerCase().startsWith('call') || message.toLowerCase().includes('emergency')) reply = 'I am not responsible for any form of emergency call.\nIf you need any service from the emergency services, please call them yourself or ask another guild member to do it for you.';
      if (reply === undefined) {
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
        if (message.endsWith('?') || message.endsWith('!') || message.endsWith('.') || message.endsWith('/'))
          reply = reply;
        else
          reply = reply + '.'
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
      res.redirect('/home/analytics');
    });
    app.get('/home/analytics', (req, res) => {
      res.sendFile(__dirname + '/Public/analytics.html')
    });
    app.get('/discord/invite', function(req, res) {
      res.redirect('https://discord.com/invite/qNJEj3s');
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

  listen();
}