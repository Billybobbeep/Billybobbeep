const db = require('quick.db');
const configFile = require('../../config.json');
var xp = new db.table('xp');

module.exports = async (client, message) => {
  var levelUpChannel;
  var gainedXp = Math.round(Math.random() * configFile.maxEarnedXp)
  if (gainedXp < 1) {
    gainedXp = Math.round(Math.random() * configFile.maxEarnedXp)
  }
  if (message.author.bot) return;
  if (message.channel.id === configFile.talk2billy) return;
  if (db.get(message.guild.id + '.levelsEnabled') === false) return;
  if (db.get(message.guild.id + '.levelUpChannel') === true) {
    levelUpChannel = db.get(message.guild.id + '.levelUpChannelId')
  }
  if (message.content.startsWith(configFile.prefix)) return;
  xp.add(message.author.id, gainedXp)
  if (xp.get(message.author.id) >= configFile.xpForLevel) {
    xp.delete(message.author.id);
    db.add(message.author.id + '.level', 1);
    if (!levelUpChannel) {
      message.reply(`is now level ${db.get(message.author.id + '.level')}`);
    } else {
      let channel = client.channels.cache.get(levelUpChannel);
      channel.send(`${message.author} is now level ${db.get(message.author.id + '.level')}`)
    }
  }
  var currlev = db.get(message.author.id + '.level')
  var user = message.guild.members.cache.get(message.author.id)
  if (currlev === 1) {
      message.member.roles.add(configFile.level1RoleId)
  }
  if (currlev === 5) {
    message.member.roles.add(configFile.level5RoleId)
  }
  if (currlev === 10) {
    message.member.roles.add(configFile.level10RoleId)
  }
  if (currlev === 15) {
    message.member.roles.add(configFile.level15RoleId)
  }
  if (currlev === 20) {
    message.member.roles.add(configFile.level20RoleId)
  }
  if (currlev === 25) {
    message.member.roles.add(configFile.level25RoleId)
  }
  if (currlev === 30) {
    message.member.roles.add(configFile.level30RoleId)
  }
  if (currlev === 35) {
      message.member.roles.add(configFile.level35RoleId)
  }
  if (currlev === 40) {
    message.member.roles.add(configFile.level40RoleId)
  }
  if (currlev === 45) {
    message.member.roles.add(configFile.level45RoleId)
  }
  if (currlev === 50) {
    message.member.roles.add(configFile.level50RoleId)
  }
  if (currlev === 55) {
    message.member.roles.add(configFile.level55RoleId)
  }
  if (currlev === 75) {
    message.member.roles.add(configFile.level75RoleId)
  }
  if (currlev === 100) {
    message.member.roles.add(configFile.level100RoleId)
  }
}