const Discord = require(`discord.js`);
const db = require('quick.db');
const ms = require('ms');

module.exports = async (prefix, message) => {
  const embed = new Discord.MessageEmbed();
  embed.setTimestamp();
  embed.setFooter(`${message.author.username}`);
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

  if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.')

  var workAmt = undefined;
  var cooldown = 15000;
  let jobs = db.get(message.author.id + '.jobs') || undefined;
  let lastRun = db.get(message.author.id + '.economy.work');

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
  let cheif = db.get(message.author.id + '.jobs.cheif') || undefined;
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
    if (cashier !== undefined) {
      workAmt = 10
    }
    if (teacher !== undefined) {
      workAmt = 11
    }
    if (waiter !== undefined) {
      workAmt = 12
    }
    if (receptionist !== undefined) {
      workAmt = 12
    }
    if (architect !== undefined) {
      workAmt = 15
    }
    if (lifeGuard !== undefined) {
      workAmt = 16
    }
    if (nurse !== undefined) {
      workAmt = 21
    }
    if (police !== undefined) {
      workAmt = 22
    }
    if (engineer !== undefined) {
      workAmt = 24
    }
    if (cheif !== undefined) {
      workAmt = 25
    }
    if (clinicalScientist !== undefined) {
      workAmt = 25
    }
    if (headScientist !== undefined) {
      workAmt = 26
    }
    if (lawyer !== undefined) {
      workAmt = 29
    }
    if (socialWorker !== undefined) {
      workAmt = 31
    }
    if (doctor !== undefined) {
      workAmt = 55
    }
  }
  if (workAmt === undefined) {
    embed.setDescription(`Before you can start working, you need to get a job.\n\nTo Apply for a job use '${prefix}jobs'`);
    message.channel.send(embed)
  } else if (Date.now() < lastRun) {
    var seco = 'seconds'
    let time2work = ms(Date.now() - lastRun);
    time2work = time2work.replace('-', '');
    if (time2work.endsWith('ms')) time2work = '1s';
    if (time2work === '1s') seco = 'second';
    time2work.replace('s', '')

    embed.setDescription(`Break Time. You can work again in **${time2work}** ${seco}.`);
    message.channel.send(embed);
  } else {
    //db.add(message.author.id + '.economy.balance', workAmt);
    db.set(message.author.id + '.economy.work', Date.now() + cooldown);

    //db.delete(message.author.id);
    embed.setDescription(`You earned **${workAmt}** while working!.`);
    message.channel.send(embed);
  }
}