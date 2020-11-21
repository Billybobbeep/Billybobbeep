const { GuildMember } = require('discord.js');
const db = require('../../structure/global.js').db;;
var punc = ['!', '/', '\'', '"', 'p!', '%', '&', '?', '£', '$', '^', '*', '.', '>', ',', '<'];

module.exports = async (message, client) => {
  if (!message.guild) return;
  let prefix = db.get(message.guild.id + '.prefix') || '~'
  if (message.content.startsWith(prefix)) return;
  var levelUpChannel = db.get(message.guild.id + '.levelUpChannel') || false;
  let args = message.content.split(/ +/g);
  if (args[0].length < 2 && !args[1]) return;
  if (!isNaN(message.content)) return;
  let xpForLevel = 30;
  var currlev = db.get(message.guild.id + '_' + message.author.id + '.level');
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
    xpForLevel = 100
  } else if (currlev >= 110 && currlev < 120) {
    xpForLevel = 110
  } else if (currlev >= 120 && currlev < 140) {
    xpForLevel = 120
  } else if (currlev >= 140 && currlev < 160) {
    xpForLevel = 130
  } else if (currlev >= 160 && currlev < 180) {
    xpForLevel = 140
  } else if (currlev >= 180) {
    xpForLevel = 150
  }

  var gainedXp = Math.round(Math.random() * 5);
  if (gainedXp < 1) gainedXp = Math.round(Math.random() * 5);
  if (message.author.bot) return;
  if (message.channel.id === db.get(message.guild.id + '.talk2billy')) return;
  let levelsEnabled = db.get(message.guild.id + '.levelsEnabled');
  if (levelsEnabled === undefined) levelsEnabled = true;
  if (!levelsEnabled) return;
  if (message.content.startsWith(db.get(message.guild.id + '.prefix') || '~')) return;
  var debounce = false;
  punc.forEach(p => {
    if (debounce === true) return;
    if (message.content.startsWith(p)) debounce = true;
    if (args[0].includes(p)) debounce = true;
  });
  if (debounce === true) return;
  db.add(`${message.guild.id}_${message.author.id}.xp`, gainedXp);
  if (db.get(`${message.guild.id}_${message.author.id}.xp`) >= xpForLevel) {
    db.delete(`${message.guild.id}_${message.author.id}.xp`);
    db.add(message.guild.id + '_' + message.author.id + '.level', 1);
    if (!levelUpChannel) {
      message.reply(`is now level ${db.get(message.guild.id + '_' + message.author.id + '.level')}`);
    } else {
      let channel = message.guild.channels.cache.get(levelUpChannel);
      channel.send(`<@!${message.author.id}> is now level ${db.get(message.guild.id + '_' + message.author.id + '.level')}`);
    }
  }
  currlev = db.get(message.guild.id + '_' + message.author.id + '.level');
  
  let level1RoleId = db.get(message.guild.id + '.level1RoleId');
  let level5RoleId = db.get(message.guild.id + '.level5RoleId');
  let level10RoleId = db.get(message.guild.id + '.level10RoleId');
  let level15RoleId = db.get(message.guild.id + '.level15RoleId');
  let level20RoleId = db.get(message.guild.id + '.level20RoleId');
  let level25RoleId = db.get(message.guild.id + '.level25RoleId');
  let level30RoleId = db.get(message.guild.id + '.level30RoleId');
  let level35RoleId = db.get(message.guild.id + '.level35RoleId');
  let level40RoleId = db.get(message.guild.id + '.level40RoleId');
  let level45RoleId = db.get(message.guild.id + 'level45RoleId');
  let level50RoleId = db.get(message.guild.id + '.level50RoleId');
  let level55RoleId = db.get(message.guild.id + '.level55RoleId');
  let level60RoleId = db.get(message.guild.id + '.level60RoleId');
  let level65RoleId = db.get(message.guild.id + '.level65RoleId');
  let level70RoleId = db.get(message.guild.id + '.level70RoleId');
  let level75RoleId = db.get(message.guild.id + '.level75RoleId');
  let level80RoleId = db.get(message.guild.id + '.level80RoleId');
  let level85RoleId = db.get(message.guild.id + '.level85RoleId');
  let level90RoleId = db.get(message.guild.id + '.level90RoleId');
  let level95RoleId = db.get(message.guild.id + '.level95RoleId');
  let level100RoleId = db.get(message.guild.id + '.level100RoleId');
  let level110RoleId = db.get(message.guild.id + '.level110RoleId');
  let level120RoleId = db.get(message.guild.id + '.level120RoleId');
  let level130RoleId = db.get(message.guild.id + '.level130RoleId');
  let level140RoleId = db.get(message.guild.id + '.level140RoleId');
  let level150RoleId = db.get(message.guild.id + '.level150RoleId');
  let level160RoleId = db.get(message.guild.id + '.level160RoleId');
  let level170RoleId = db.get(message.guild.id + '.level170RoleId');
  let level180RoleId = db.get(message.guild.id + '.level180RoleId');
  let level190RoleId = db.get(message.guild.id + '.level190RoleId');
  let level200RoleId = db.get(message.guild.id + '.level200RoleId');

  try {
    if (currlev === 1) {
      if (level1RoleId) {
        message.member.roles.add(level1RoleId);
      }
    }
    if (currlev === 5) {
      if (level5RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        message.member.roles.add(level5RoleId);
      }
    }
    if (currlev === 10) {
      if (level10RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        message.member.roles.add(level10RoleId);
      }
    }
    if (currlev === 15) {
      if (level15RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        message.member.roles.remove(level15RoleId);
      }
    }
    if (currlev === 20) {
      if (level20RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        message.member.roles.add(level20RoleId);
      }
    }
    if (currlev === 25) {
      if (level25RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        message.member.roles.add(level25RoleId);
      }
    }
    if (currlev === 30) {
      if (level30RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        message.member.roles.add(level30RoleId);
      }
    }
    if (currlev === 35) {
      if (level35RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        message.member.roles.add(level35RoleId);
      }
    }
    if (currlev === 40) {
      if (level40RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        message.member.roles.add(level40RoleId);
      }
    }
    if (currlev === 45) {
      if (level45RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        message.member.roles.add(level45RoleId);
      }
    }
    if (currlev === 50) {
      if (level50RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        message.member.roles.add(level50RoleId);
      }
    }
    if (currlev === 55) {
      if (level55RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        message.member.roles.add(level55RoleId);
      }
    }
    if (currlev === 60) {
      if (level60RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        message.member.roles.add(level60RoleId);
      }
    }
    if (currlev === 65) {
      if (level65RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        message.member.roles.add(level65RoleId);
      }
    }
    if (currlev === 70) {
      if (level70RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        message.member.roles.add(level70RoleId);
      }
    }
    if (currlev === 75) {
      if (level75RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        message.member.roles.add(level75RoleId);
      }
    }
    if (currlev === 80) {
      if (level80RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        message.member.roles.add(level80RoleId);
      }
    }
    if (currlev === 85) {
      if (level85RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        message.member.roles.add(level85RoleId);
      }
    }
    if (currlev === 90) {
      if (level90RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        message.member.roles.add(level90RoleId);
      }
    }
    if (currlev === 95) {
      if (level95RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        message.member.roles.add(level95RoleId);
      }
    }
    if (currlev === 100) {
      if (level100RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        message.member.roles.add(level100RoleId);
      }
    }
    if (currlev === 110) {
      if (level110RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        message.member.roles.add(level110RoleId);
      }
    }
    if (currlev === 120) {
      if (level120RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        message.member.roles.add(level120RoleId);
      }
    }
    if (currlev === 130) {
      if (level130RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        message.member.roles.add(level130RoleId);
      }
    }
    if (currlev === 140) {
      if (level140RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        if (level130RoleId) {
          message.member.roles.remove(level130RoleId);
        }
        message.member.roles.add(level140RoleId);
      }
    }
    if (currlev === 150) {
      if (level150RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        if (level130RoleId) {
          message.member.roles.remove(level130RoleId);
        }
        if (level140RoleId) {
          message.member.roles.remove(level140RoleId);
        }
        message.member.roles.add(level150RoleId);
      }
    }
    if (currlev === 160) {
      if (level160RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        if (level130RoleId) {
          message.member.roles.remove(level130RoleId);
        }
        if (level140RoleId) {
          message.member.roles.remove(level140RoleId);
        }
        if (level150RoleId) {
          message.member.roles.remove(level150RoleId);
        }
        message.member.roles.add(level160RoleId);
      }
    }
    if (currlev === 170) {
      if (level170RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        if (level130RoleId) {
          message.member.roles.remove(level130RoleId);
        }
        if (level140RoleId) {
          message.member.roles.remove(level140RoleId);
        }
        if (level150RoleId) {
          message.member.roles.remove(level150RoleId);
        }
        if (level160RoleId) {
          message.member.roles.remove(level160RoleId);
        }
        message.member.roles.add(level170RoleId);
      }
    }
    if (currlev === 180) {
      if (level180RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        if (level130RoleId) {
          message.member.roles.remove(level130RoleId);
        }
        if (level140RoleId) {
          message.member.roles.remove(level140RoleId);
        }
        if (level150RoleId) {
          message.member.roles.remove(level150RoleId);
        }
        if (level160RoleId) {
          message.member.roles.remove(level160RoleId);
        }
        if (level170RoleId) {
          message.member.roles.remove(level170RoleId);
        }
        message.member.roles.add(level180RoleId);
      }
    }
    if (currlev === 190) {
      if (level190RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        if (level130RoleId) {
          message.member.roles.remove(level130RoleId);
        }
        if (level140RoleId) {
          message.member.roles.remove(level140RoleId);
        }
        if (level150RoleId) {
          message.member.roles.remove(level150RoleId);
        }
        if (level160RoleId) {
          message.member.roles.remove(level160RoleId);
        }
        if (level170RoleId) {
          message.member.roles.remove(level170RoleId);
        }
        if (level180RoleId) {
          message.member.roles.remove(level180RoleId);
        }
        message.member.roles.add(level190RoleId);
      }
    }
    if (currlev === 190) {
      if (level190RoleId) {
        if (level1RoleId) {
          message.member.roles.remove(level1RoleId);
        }
        if (level5RoleId) {
          message.member.roles.remove(level5RoleId);
        }
        if (level10RoleId) {
          message.member.roles.remove(level10RoleId);
        }
        if (level15RoleId) {
          message.member.roles.remove(level15RoleId);
        }
        if (level20RoleId) {
          message.member.roles.remove(level20RoleId);
        }
        if (level25RoleId) {
          message.member.roles.remove(level25RoleId);
        }
        if (level30RoleId) {
          message.member.roles.remove(level30RoleId);
        }
        if (level35RoleId) {
          message.member.roles.remove(level35RoleId);
        }
        if (level40RoleId) {
          message.member.roles.remove(level40RoleId);
        }
        if (level45RoleId) {
          message.member.roles.remove(level45RoleId);
        }
        if (level50RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level50RoleId);
        }
        if (level55RoleId) {
          message.member.roles.remove(level55RoleId);
        }
        if (level60RoleId) {
          message.member.roles.remove(level60RoleId);
        }
        if (level65RoleId) {
          message.member.roles.remove(level65RoleId);
        }
        if (level70RoleId) {
          message.member.roles.remove(level70RoleId);
        }
        if (level75RoleId) {
          message.member.roles.remove(level75RoleId);
        }
        if (level80RoleId) {
          message.member.roles.remove(level80RoleId);
        }
        if (level85RoleId) {
          message.member.roles.remove(level85RoleId);
        }
        if (level90RoleId) {
          message.member.roles.remove(level90RoleId);
        }
        if (level95RoleId) {
          message.member.roles.remove(level95RoleId);
        }
        if (level100RoleId) {
          message.member.roles.remove(level100RoleId);
        }
        if (level110RoleId) {
          message.member.roles.remove(level110RoleId);
        }
        if (level120RoleId) {
          message.member.roles.remove(level120RoleId);
        }
        if (level130RoleId) {
          message.member.roles.remove(level130RoleId);
        }
        if (level140RoleId) {
          message.member.roles.remove(level140RoleId);
        }
        if (level150RoleId) {
          message.member.roles.remove(level150RoleId);
        }
        if (level160RoleId) {
          message.member.roles.remove(level160RoleId);;
        }
        if (level170RoleId) {
          message.member.roles.remove(level170RoleId);;
        }
        if (level180RoleId) {
          message.member.roles.remove(level180RoleId);;
        }
        if (level190RoleId) {
          message.member.roles.remove(level190RoleId);;
        }
        message.member.roles.add(level200RoleId);;
      }
    }
  } catch {
    return;
  }
}