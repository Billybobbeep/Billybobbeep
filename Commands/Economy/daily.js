const Discord = require(`discord.js`);
const db = require('quick.db');
const ms = require('ms');

module.exports = async (prefix, message, client) => {
  const embed = new Discord.MessageEmbed();
  embed.setTitle('Billybobbeep | Economy');
  embed.setFooter(`${message.author.username}`);
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

  if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.')

  var dailyAmt = 10;
  var cooldown = 8.64e+7;
  let tStreak = db.get(message.author.id + '.economy.tStreak') || 1;
  let streak = db.get(message.author.id + '.economy.streak') || 0;
  let jobs = db.get(message.author.id + '.jobs') || undefined;
  let balance = db.get(message.author.id + '.economy.balance');
  let lastRun = db.get(message.author.id + '.economy.daily');
  let timeObj = ms(cooldown - (Date.now() - lastRun))
  timeObj = timeObj.replace('s', ' seconds').replace('m', ' minutes').replace('h', ' hours');

  //level 1 job
  let cashier = db.get(message.author.id + '.jobs.cashier') || undefined;
  //level 2 job
  let teacher = db.get(message.author.id + '.jobs.teacher') || undefined;
  //level 3 job
  let waiter = db.get(message.author.id + '.jobs.waiter') || undefined;
  //level 4 job
  let receptionist = db.get(message.author.id + '.jobs.receptionist') || undefined;
  //level 5 job
  let architect = db.get(message.author.id + '.jobs.architect') || undefined;
  //level 6 job
  let lifeGuard = db.get(message.author.id + '.jobs.lifeGuard') || undefined;
  //level 7 job
  let nurse = db.get(message.author.id + '.jobs.nurse') || undefined;
  //level 8 job
  let police = db.get(message.author.id + '.jobs.police') || undefined;
  //level 9 job
  let engineer = db.get(message.author.id + '.jobs.engineer') || undefined;
  //level 10 job
  let chief = db.get(message.author.id + '.jobs.chief') || undefined;
  //level 11 job
  let clinicalScientist = db.get(message.author.id + '.jobs.clinicalScientist') || undefined;
  //level 12 job
  let headScientist = db.get(message.author.id + '.jobs.headScientist') || undefined;
  //level 13 job
  let lawyer = db.get(message.author.id + '.jobs.lawyer') || undefined;
  //level 14 job
  let socialWorker = db.get(message.author.id + '.jobs.socialWorker') || undefined;
  //level 15 job
  let doctor = db.get(message.author.id + '.jobs.doctor') || undefined;

  if (jobs !== undefined) {
    if (cashier !== undefined) dailyAmt = 7.25
    if (teacher !== undefined) dailyAmt = 8.81
    if (waiter !== undefined) dailyAmt = 9.50
    if (receptionist !== undefined) dailyAmt = 9.58
    if (architect !== undefined) dailyAmt = 8.66
    if (lifeGuard !== undefined) dailyAmt = 11.40
    if (nurse !== undefined) dailyAmt = 17.52
    if (police !== undefined) dailyAmt = 17.61
    if (engineer !== undefined) dailyAmt = 20.55
    if (chief !== undefined) dailyAmt = 20.76
    if (clinicalScientist !== undefined) dailyAmt = 22.45
    if (headScientist !== undefined) dailyAmt = 22.70
    if (lawyer !== undefined) dailyAmt = 25.61
    if (socialWorker !== undefined) dailyAmt = 27.71
    if (doctor !== undefined) dailyAmt = 52.25
    if (streak === 5) dailtAmt = 75
  }
  let nem = client.emojis.cache.get('767351869856940063');
  let sem = client.emojis.cache.get('767365396474101831');
  let semoji = `${nem}${nem}${nem}${nem}${nem}`
  if (lastRun !== null && cooldown - (Date.now() - lastRun) <= 86400000) {
    db.delete(message.author.id + '.economy.streak');
    db.delete(message.author.id + '.economy.tStreak');
  }
  if (streak === 1 || streak === 0) {
    semoji = `${sem}${nem}${nem}${nem}${nem}`
  } else if (streak === 2) { semoji = `${sem}${sem}${nem}${nem}${nem}`
  } else if (streak === 3) { semoji = `${sem}${sem}${sem}${nem}${nem}`
  } else if (streak === 4) { semoji = `${sem}${sem} ${sem}${sem}${nem}`
  } else if (streak === 5) { semoji = `${sem}${sem}${sem}${sem}${sem}`
    embed.setDescription(`You have collected your **${dailyAmt}** reward.\n\n**__Daily streak progress__**\n${semoji}\n\n`);
    embed.setFooter(`Total Streak: ${streak}\nWallet: ${balance + dailyAmt}`);
    message.channel.send(embed);
    return db.delete(message.author.id + '.economy.streak');
  }

  if (lastRun !== null && cooldown - (Date.now() - lastRun) > 0) {
    embed.setDescription(`You have already collected your daily allowance today.\nTime Left: **${timeObj}**`);
    message.channel.send(embed);
  } else {
    db.add(message.author.id + '.economy.balance', dailyAmt);
    db.set(message.author.id + '.economy.daily', Date.now());
    db.add(message.author.id + '.economy.streak', 1)
    db.add(message.author.id + '.economy.tStreak', 1)

    //db.delete(message.author.id);
    embed.setDescription(`I have added **${dailyAmt}** onto your account balance.\n\n**__Daily streak progress__**\n${semoji}\n\n`);
    embed.setFooter(`Total Streak: ${tStreak}\nWallet: ${balance + dailyAmt}`)
    message.channel.send(embed);
  }
}