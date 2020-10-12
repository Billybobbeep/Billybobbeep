const Discord = require(`discord.js`);
const configFile = require('../config.json');
const rollDice = () => Math.floor(Math.random() * 6) + 1;
const db = require('quick.db');

module.exports = async(client, msg, args, prefix, message) => {
    message.reply("rolled a " + rollDice());
}