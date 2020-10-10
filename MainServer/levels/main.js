const db = require('quick.db');
const configFile = require('../../config.json');
var xp = new db.table('xp');
var level = new db.table('level');
module.exports = async (client, message) => {
  var levelUpChannel;
  var gainedXp = Math.round(Math.random() * configFile.maxEarnedXp)
  if (gainedXp < 1) {
    gainedXp = Math.round(Math.random() * configFile.maxEarnedXp)
  }
  if (message.author.bot) return;
  if (message.channel.id === configFile.talk2billy) return;
  if (configFile.levelsEnabled === false) return;
  if (configFile.levelUpChannel === true) {
    levelUpChannel = configFile.levelUpChannelId
  }
  xp.add(message.author.id, gainedXp)
  if (xp.get(message.author.id) >= configFile.xpForLevel) {
    xp.delete(message.author.id);
    level.add(message.author.id, 1);
    if (!levelUpChannel) {
      message.reply(`is now level ${level.get(message.author.id)}`);
    }
  }
  var currlev = level.get(message.author.id)
  if (currlev === 1) {
    if (!message.member.roles.find(configFile.level1RoleId)) {
      message.member.roles.add(configFile.level1RoleId)
    }
  }
  if (currlev === 5) {
    if (!message.member.roles.has(configFile.level5RoleId)) {
      message.member.roles.add(configFile.level5RoleId)
    }
  }
  if (currlev === 10) {
    if (!message.member.roles.has(configFile.level10RoleId)) {
      message.member.roles.add(configFile.level10RoleId)
    }
  }
  if (currlev === 15) {
    if (!message.member.roles.has(configFile.level15RoleId)) {
      message.member.roles.add(configFile.level15RoleId)
    }
  }
  if (currlev === 20) {
    if (!message.member.roles.has(configFile.level20RoleId)) {
      message.member.roles.add(configFile.level20RoleId)
    }
  }
  if (currlev === 25) {
    if (!message.member.roles.has(configFile.level25RoleId)) {
      message.member.roles.add(configFile.level25RoleId)
    }
  }
  if (currlev === 30) {
    if (!message.member.roles.has(configFile.level30RoleId)) {
      message.member.roles.add(configFile.level30RoleId)
    }
  }
  if (currlev === 35) {
    if (!message.member.roles.has(configFile.level35RoleId)) {
      message.member.roles.add(configFile.level35RoleId)
    }
  }
  if (currlev === 40) {
    if (!message.member.roles.has(configFile.level40RoleId)) {
      message.member.roles.add(configFile.level40RoleId)
    }
  }
  if (currlev === 45) {
    if (!message.member.roles.has(configFile.level45RoleId)) {
      message.member.roles.add(configFile.level45RoleId)
    }
  }
  if (currlev === 50) {
    if (!message.member.roles.has(configFile.level50RoleId)) {
      message.member.roles.add(configFile.level50RoleId)
    }
  }
  if (currlev === 55) {
    if (!message.member.roles.has(configFile.level55RoleId)) {
      message.member.roles.add(configFile.level55RoleId)
    }
  }
  if (currlev === 75) {
    if (!message.member.roles.has(configFile.level75RoleId)) {
      message.member.roles.add(configFile.level75RoleId)
    }
  }
  if (currlev === 100) {
    if (!message.member.roles.has(configFile.level100RoleId)) {
      message.member.roles.add(configFile.level100RoleId)
    }
  }
  if (message.content.toLowerCase() === configFile.prefix + 'leaderboard') {
    const commandFile = require('./leaderboard.js');
    commandFile(client, message, level)
  }
}