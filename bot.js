module.exports = async (client) => {
  // [Varibles] //
  const Discord = require('discord.js');
  const db = require('./data/databaseManager/index.js');
  const fs = require('fs');

  require('./utils/events.js')(client);
}