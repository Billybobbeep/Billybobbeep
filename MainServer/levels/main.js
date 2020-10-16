const db = require('quick.db');
const configFile = require('../../config.json');
var xp = new db.table('xp');

module.exports = async (client, message) => {
  if (!message.guild) return;
  var levelUpChannel = db.get(message.guild.id + '.levelUpChannel') || false;

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
  let levelsEnabled = db.get(message.guild.id + '.levelsEnabled') || true;
  if (!levelsEnabled) return;
  if (levelUpChannel) {
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
  
  let level1RoleId = db.get(message.guild.id + '.level1RoleId')
  let level5RoleId = db.get(message.guild.id + '.level5RoleId')
  let level10RoleId = db.get(message.guild.id + '.level10RoleId')
  let level15RoleId = db.get(message.guild.id + '.level15RoleId')
  let level20RoleId = db.get(message.guild.id + '.level20RoleId')
  let level25RoleId = db.get(message.guild.id + '.level25RoleId')
  let level30RoleId = db.get(message.guild.id + '.level30RoleId')
  let level35RoleId = db.get(message.guild.id + '.level35RoleId')
  let level40RoleId = db.get(message.guild.id + '.level40RoleId')
  let level45RoleId = db.get(message.guild.id + 'level45RoleId')
  let level50RoleId = db.get(message.guild.id + '.level50RoleId')
  let level75RoleId = db.get(message.guild.id + '.level75RoleId')
  let level100RoleId = db.get(message.guild.id + '.level100RoleId')

  try {
    if (currlev === 1) {
      if (level1RoleId) {
        message.member.roles.add(level1RoleId)
      }
    }
    if (currlev === 5) {
      if (level1RoleId) {
        message.member.roles.remove(level1RoleId)
      }
      if (level5RoleId) {
        message.member.roles.add(level5RoleId)
      }
    }
    if (currlev === 10) {
      if (level5RoleId) {
        message.member.roles.remove(level5RoleId)
      }
      if (level10RoleId) {
        message.member.roles.add(level10RoleId)
      }
    }
    if (currlev === 15) {
      if (level10RoleId) {
        message.member.roles.remove(level10RoleId)
      }
      if (level15RoleId) {
        message.member.roles.add(level15RoleId)
      }
    }
    if (currlev === 20) {
      if (level15RoleId) {
        message.member.roles.add(level15RoleId)
      }
      if (level20RoleId) {
        message.member.roles.add(level20RoleId)
      }
    }
    if (currlev === 25) {
      if (level20RoleId) {
        message.member.roles.add(level20RoleId)
      }
      if (level25RoleId) {
        message.member.roles.add(level25RoleId)
      }
    }
    if (currlev === 30) {
      if (level25RoleId) {
      message.member.roles.remove(level25RoleId)
      }
      message.member.roles.add(level30RoleId)
    }
    if (currlev === 35) {
      if (level30RoleId) {
        message.member.roles.remove(level30RoleId)
      }
      if (level35RoleId) {
        message.member.roles.add(level35RoleId)
      }
    }
    if (currlev === 40) {
      if (level35RoleId) {
        message.member.roles.remove(level35RoleId)
      }
      if (level40RoleId) {
        message.member.roles.add(level40RoleId)
      }
    }
    if (currlev === 45) {
      if (level40RoleId) {
        message.member.roles.remove(level40RoleId)
      }
      if (level45RoleId) {
        message.member.roles.add(level45RoleId)
      }
    }
    if (currlev === 50) {
      if (level45RoleId) {
        message.member.roles.remove(level45RoleId)
      }
      if (level50RoleId) {
        message.member.roles.add(level50RoleId)
      }
    }
    if (currlev === 55) {
      if (level50RoleId) {
        message.member.roles.remove(level50RoleId)
      }
      if (level55RoleId) {
        message.member.roles.add(level55RoleId)
      }
    }
    if (currlev === 75) {
      if (level55RoleId) {
        message.member.roles.remove(level55RoleId)
      }
      if (level75RoleId) {
        message.member.roles.add(level75RoleId)
      }
    }
    if (currlev === 100) {
      if (level75RoleId) {
      message.member.roles.remove(level75RoleId)
      }
      if (level100RoleId) {
      message.member.roles.add(level100RoleId)
      }
    }
  } catch {
    return;
  }
}