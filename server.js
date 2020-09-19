const express = require("express");
const server = express();

server.use('/public', express.static('Public'));

server.all('/', function(req, res) {
  res.redirect("/home");
});
server.get('/home', function(req, res) {
  res.sendFile(__dirname + "/Public/index.html");
});
server.get('/home/status', function(req, res) {
  res.sendFile(__dirname + "/Public/status.html");
});

server.listen(5000, () => { console.log("Billybobbeep is online") });