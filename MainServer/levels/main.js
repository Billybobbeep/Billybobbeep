const db = require('quick.db');
const configFile = require('../../config.json');
var xp = new db.table('xp');

module.exports = async (client, message) => {
  var levelUpChannel;

  let xpForLevel = 30;
  var currlev = db.get(message.guild.id + '_' + message.author.id + '.level')
  if (currlev > 20 && currlev < 30) {
    xpForLevel = 35
  } else if (currlev >= 30 && currlev < 40) {
    xpForLevel = 40
  } else if (currlev >= 40 && currlev < 50) {
    xpForLevel = 45
  } else if (currlev >= 50 && currlev < 60) {
    xpForLevel = 50
  } else if (currlev >= 70 && currlev < 80) {
    xpForLevel = 55
  } else if (currlev >= 90 && currlev < 100) {
    xpForLevel = 60
  } else if (currlev >= 100 && currlev < 110) {
    xpForLevel = 65
  } else if (currlev >= 110 && currlev < 120) {
    xpForLevel = 70
  } else if (currlev >= 120 && currlev < 140) {
    xpForLevel = 80
  } else if (currlev >= 140 && currlev < 160) {
    xpForLevel = 90
  } else if (currlev >= 160 && currlev < 180) {
    xpForLevel = 100
  } else if (currlev >= 180) {
    xpForLevel = 105
  }

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
  if (message.content.startsWith(db.get(message.guild.id + '.prefix') || '~')) return;
  xp.add(message.guild.id + '_' + message.author.id, gainedXp)
  if (xp.get(message.guild.id + '_' + message.author.id) >= xpForLevel) {
    xp.delete(message.guild.id + '_' + message.author.id);
    db.add(message.guild.id + '_' + message.author.id + '.level', 1);
    if (!levelUpChannel) {
      message.reply(`is now level ${db.get(message.guild.id + '_' + message.author.id + '.level')}`);
    } else {
      let channel = client.channels.cache.get(levelUpChannel);
      channel.send(`${message.author} is now level ${db.get(message.guild.id + '_' + message.author.id + '.level')}`)
    }
  }
  currlev = db.get(message.guild.id + '_' + message.author.id + '.level')
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
    message.member.roles.remove(configFile.level1RoleId)
    message.member.roles.remove(configFile.level5RoleId)
    message.member.roles.remove(configFile.level10RoleId)
    message.member.roles.remove(configFile.level15RoleId)
    message.member.roles.remove(configFile.level20RoleId)
    message.member.roles.remove(configFile.level25RoleId)
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
    message.member.roles.remove(configFile.level30RoleId)
    message.member.roles.remove(configFile.level35RoleId)
    message.member.roles.remove(configFile.level40RoleId)
    message.member.roles.remove(configFile.level45RoleId)
    message.member.roles.remove(configFile.level50RoleId)
    message.member.roles.remove(configFile.level55RoleId)
    message.member.roles.remove(configFile.level75RoleId)
    message.member.roles.add(configFile.level100RoleId)
  }
}