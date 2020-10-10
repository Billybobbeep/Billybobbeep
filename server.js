module.exports = async (client) => {
const express = require("express");
const app = express();
const Discord = require('discord.js')
var port = 3000;
const bot = require("./bot");
const fs = require('fs');

app.use('/style', express.static('style'));
app.set('view engine', 'ejs');

function listen() {

app.all('/', function(req, res) {
  res.redirect("/home");
});
app.get('/home', function(req, res) {
  res.sendFile(__dirname + "/Public/index.html");
});
app.get('/home/status', function(req, res) {
  res.sendFile(__dirname + "/Public/status.html");
});
app.get('/home/analytics', (req, res) => {
  res.sendFile(__dirname + '/Public/analytics.html')
});
app.get('/home/database/:name/:id/get', (req, res) => {
  if (req.params.name != 'users') res.redirect('/home'); if (req.params.id != 'rPUqgbgzBjTGfgZTZeHsDedGJVDUuEXWwKSxfZRymTVPttdLhDABAateSAuENZZVzwJsVheQTNbuZpRXtCqnqLRrsmASjQKQrJmTuFWNhFYQNFVXKkGjrgYYbEDZUjytDEZAXpAUejNQcachyvyHxEvSrfydQznwQQsGnPHnPNUnbFVtRNDXbHgHFqkkkqZsUjRSGsNWbzfwbXNZBmYTTXykCYxyRyEkdPCygqrDgksQsARDNxtZYkSwgWnjZRxBWKSgLWDMRQakwrHeJTPYtpLezdMksCbrWESccSCuxVtjtkeQyTjLaDcmaWbKbTjYNXGhAvMnpgnDLmHTZDhguJvRmnUTZbFBPHStTTqCZYNMBFHhNHDxzfdSknNzLkGbKxVkpQPXarYPbxVCsekhUTqQEpHJkfYBrPNgFhNqxLXUKuVaJAKahvSLfUkrWbawjATxHfgdDvRTjALZuTzkZVJcwsfZYwGdnGbYMLFhsduygNzkhkVgJYLuCWAbKYJKHyWEVqUUpsxwePmBrXJqVprZahWnSeUEprLrnXEagGSgGUZbHZkSMZagLfxaSPQxfgtzcchxEGzWPPxedueZugADeUQEufSsXSghktkXWuudggkVSwErYQhwVsRkMBEqZYUJMKmAskKYkpqTrFKTNZjgJcvrtBscXTWevaWLcTevNLNRcpcNPkYXJwKatDhNYMHaHZRrJYyrLHrKVuNtNtpCCyUSdEdRJTzcVphCgVqffzdbgHxKLxPbCkBqnwZpjXSRjVLarGpRZupwqbKPDkxFfsArhhspZPqyHBnTqvAcEaPGXTzQeCtXMRzvnadfykTafvNujCUBTXTsBbPtTJxAxcagyujMkBzDwqvZEWXfjfzmMCTbETRhrLduWcNNgKZhrwMgGRqPHHGyxRGCHkvRmPNMnpemXBrmUsBeznCBuSPaeCAZdGaGfjLkHmcEPHhXKQHRtSpUraympWASNhAvBKKtQZqLARfUQZYQhMZkhvKANExwqBggpATAugTs') res.redirect('/home'); if (req.query.bot != 'true') res.redirect('/home'); if (req.query.type != 'bot') res.redirect('/home'); bot.data(function(data) { res.send(data); }); });
app.get('/contact/submit', (req, res) => {
  if (!req.query) res.render('general.ejs');
  if (!req.query.fName || !req.query.sName || !req.query.discord || !req.query.subject || !req.query.message) res.render('general.ejs');
  const embed = new Discord.MessageEmbed()
  .setTitle('Billybobbeep | Contact Us Submissions')
  .setColor('#5271C4')
  .setTimestamp()
  .setDescription(
    '**First Name:** ' + req.query.fName +
    '\n**Second Name:** ' + req.query.sName +
    '\n**Discord Tag:** ' + req.query.discord +
    '\n**Subject:** ' + req.query.subject +
    '\n**Message:** ' + req.query.message
  )
  let LoggingChannel = client.channels.cache.get('738097180451274784');
  LoggingChannel.send(embed)
  res.render('success.ejs');
});
app.get('/discord/invite', function(req, res) {
    fs.readFile('./Public/analytics/invites.json', 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err)
      }
      data = JSON.parse(data)
      if (!req.query.from) {
        var total = data[0].total;
        var website = data[0].website;
        var json = [{
          "total" : total + 1,
          "spoink" : data[0].spoink,
          "other" : data[0].other,
          "website" : website + 1
        }]
        json = JSON.stringify(json)
        fs.writeFile('./Public/analytics/invites.json', json, 'utf8', function() { })
        res.redirect('https://discord.com/invite/qNJEj3s');
      } else {
        if (req.query.from === 'spoink' || req.query.from === 'tyler') {
        var total = data[0].total;
        var spoink = data[0].spoink;
        var json = [{
          "total" : total + 1,
          "spoink" : spoink + 1,
          "other" : data[0].other,
          "website" : data[0].website
        }]
        json = JSON.stringify(json)
        fs.writeFile('./Public/analytics/invites.json', json, 'utf8', function() { })
        res.redirect('https://discord.com/invite/qNJEj3s');
        } else {
          var total = data[0].total;
          var other = data[0].other;
          var json = [{
            "total" : total + 1,
            "spoink" : data[0].spoink,
            "other" : other + 1,
            "website" : data[0].website
          }]
          json = JSON.stringify(json)
          fs.writeFile('./Public/analytics/invites.json', json, 'utf8', function() { })
          res.redirect('https://discord.com/invite/qNJEj3s');
        }
      }
    });
});

app.use(function(req, res) {
    res.status(404)
    res.sendFile(__dirname + '/Public/error404.html');
});

app.listen(port, () => { console.log("Billybobbeep is online") });

}

listen()
}