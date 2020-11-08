module.exports = {
  name: 'daily',
  description: 'Collect your daily reward.',
  guildOnly: true,
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const db = require('../../data/databaseManager/index.js');
    const ms = require('ms');
    const embed = new Discord.MessageEmbed();
    embed.setFooter(`${message.author.username}`);
    embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

    if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.');

    var dailyAmt = 10;
    var cooldown = 8.64e+7;
    var reward = 75;
    let tStreak = db.get(message.author.id + '.economy.tStreak') || 1;
    let streak = db.get(message.author.id + '.economy.streak') || 1;
    let jobs = db.get(message.author.id + '.jobs') || undefined;
    let balance = db.get(message.author.id + '.economy.balance') || 0;
    let lastRun = db.get(message.author.id + '.economy.daily') || 0
    let timeObj = ms(cooldown - (Date.now() - lastRun));
    timeObj = timeObj.replace('s', ' seconds').replace('m', ' minutes').replace('h', ' hours');

    let cashier = db.get(message.author.id + '.jobs.cashier') || undefined;
    let teacher = db.get(message.author.id + '.jobs.teacher') || undefined;
    let waiter = db.get(message.author.id + '.jobs.waiter') || undefined;
    let receptionist = db.get(message.author.id + '.jobs.receptionist') || undefined;
    let architect = db.get(message.author.id + '.jobs.architect') || undefined;
    let lifeGuard = db.get(message.author.id + '.jobs.lifeGuard') || undefined;
    let nurse = db.get(message.author.id + '.jobs.nurse') || undefined;
    let police = db.get(message.author.id + '.jobs.police') || undefined;
    let engineer = db.get(message.author.id + '.jobs.engineer') || undefined;
    let chief = db.get(message.author.id + '.jobs.chief') || undefined;
    let clinicalScientist = db.get(message.author.id + '.jobs.clinicalScientist') || undefined;
    let headScientist = db.get(message.author.id + '.jobs.headScientist') || undefined;
    let lawyer = db.get(message.author.id + '.jobs.lawyer') || undefined;
    let socialWorker = db.get(message.author.id + '.jobs.socialWorker') || undefined;
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
    }
    let nem = client.emojis.cache.get('767351869856940063');
    let sem = client.emojis.cache.get('767365396474101831');
    let semoji = `${nem}${nem}${nem}${nem}${nem}`

    if (lastRun !== null && cooldown - (Date.now() - lastRun) > 0) {
      embed.setDescription(`You have already collected your daily allowance today.\nTime Left: **${timeObj}**`);
      message.channel.send(embed);
    } else {
      if (lastRun !== null && cooldown - (Date.now() - lastRun) >= 126000000) {
        db.delete(message.author.id + '.economy.streak');
        db.delete(message.author.id + '.economy.tStreak');
      }
      if (streak === 1) semoji = `${sem}${nem}${nem}${nem}${nem}`
      else if (streak === 2) semoji = `${sem}${sem}${nem}${nem}${nem}`
      else if (streak === 3) semoji = `${sem}${sem}${sem}${nem}${nem}`
      else if (streak === 4) semoji = `${sem}${sem}${sem}${sem}${nem}`
      else if (streak === 5) {
        semoji =  `${sem}${sem}${sem}${sem}${sem}`
        embed.setDescription(`You have collected your **$${dailyAmt + reward}** reward.\n\n**__Daily streak progress__**\n${semoji}\n\n`);
        embed.setFooter(`Total Streak: ${tStreak}\nWallet: $${balance + dailyAmt + reward}`);
        db.set(message.author.id + '.economy.daily', Date.now());
        db.set(message.author.id + '.economy.streak', 1);
        return message.channel.send(embed);
      }
      db.add(message.author.id + '.economy.streak', 1);
      db.add(message.author.id + '.economy.tStreak', 1);
      db.add(message.author.id + '.economy.balance', dailyAmt);
      db.set(message.author.id + '.economy.daily', Date.now());

      embed.setDescription(`I have added **$${dailyAmt}** onto your account balance.\n\n**__Daily streak progress__**\n${semoji}\n\n`);
      embed.setFooter(`Total Streak: ${tStreak}\nWallet: $${balance + dailyAmt}`)
      message.channel.send(embed);
    }
  }
}