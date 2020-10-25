const Discord = require(`discord.js`);
const db = require('../../databaseManager/index.js');
const ms = require('ms');
const embed = new Discord.MessageEmbed();

module.exports = async (prefix, message, client) => {
  embed.setTimestamp();
  embed.setFooter(`${message.author.username}`);
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);

  if (db.get(message.guild.id + '.ecoEnabled') && db.get(message.guild.id + '.ecoEnabled') === false) return message.channel.send('Economy commands have been disabled in your server.')

  var workAmt = undefined;
  var cooldown = 15000;
  let jobs = db.get(message.author.id + '.jobs') || undefined;
  let lastRun = db.get(message.author.id + '.economy.work');
  let decimal = Math.round(Math.random() * 89) + 10

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
    if (cashier !== undefined) { workAmt = 10; }
    if (teacher !== undefined) { workAmt = 11; }
    if (waiter !== undefined) { workAmt = 12; }
    if (receptionist !== undefined) { workAmt = 12 }
    if (architect !== undefined) { workAmt = 15 }
    if (lifeGuard !== undefined) { workAmt = 16 }
    if (nurse !== undefined) { workAmt = 21 }
    if (police !== undefined) { workAmt = 22 }
    if (engineer !== undefined) { workAmt = 24 }
    if (chief !== undefined) { workAmt = 25 }
    if (clinicalScientist !== undefined) { workAmt = 25 }
    if (headScientist !== undefined) { workAmt = 26 }
    if (lawyer !== undefined) { workAmt = 29 }
    if (socialWorker !== undefined) { workAmt = 31 }
    if (doctor !== undefined) { workAmt = 55 }
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
    let crossEmoji = client.emojis.cache.get('736952985330122772');

    embed.setDescription(`${crossEmoji} Break Time. You can work again in **${time2work}** ${seco}.`);
    message.channel.send(embed);
  } else {
    if (teacher !== undefined) {
      embed.setDescription(`What subject would you like to teach?\n\n📕English\n📗Math\n📙Science`);
      let msg = await message.channel.send(embed);
      const congratsEmbed = new Discord.MessageEmbed()
      .setDescription(`You earned **$${workAmt}.${decimal}** while working!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      reactionCollection(msg, '📕', '📗', '📙', workAmt, congratsEmbed, congratsEmbed, congratsEmbed);
    }
    else if (waiter !== undefined) {
      var usedNo = []
      var numbers = ['1', '1', '2', '3', '4', '5', '6', '7', '8', '9']
      var  emojis = ['0️⃣', '1️⃣', '12️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
      var no1 = Math.floor(Math.random() * emojis.length);
      if (usedNo.length === numbers.length) usedNo = []
      usedNo.push(numbers[no1]);
      var no2 = Math.floor(Math.random() * emojis.length);
      if (usedNo.includes(numbers[no2])) no2 = Math.floor(Math.random() * emojis.length);
      usedNo.push(numbers[no2]);
      var no3 = Math.floor(Math.random() * emojis.length);
      if (usedNo.includes(numbers[no3])) no3 = Math.floor(Math.random() * emojis.length);
      usedNo.push(numbers[no3]);
      embed.setDescription(`Select a table number:\n\n${emojis[no1]}-${numbers[no1]}\n${emojis[no2]}-${number[no2]}\n${emojis[no3]}-${numbers[no3]}`);
      let msg = await message.channel.send(embed);
      const congratsEmbed = new Discord.MessageEmbed()
      .setDescription(`You earned **$${workAmt}.${decimal}** while working!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      reactionCollection(msg, emojis[no1], emoji[no2], emoji, workAmt, congratsEmbed, congratsEmbed, congratsEmbed);
    }
    else if (receptionist !== undefined) {
      embed.setDescription(`What would you like to do?\n\n📞Answer the phone\n💻Book an appointment\n💰Count the daily earnings`);
      let msg = await message.channel.send(embed);
      var count = Math.round(Math.random() * 15);
      const congratsEmbed1 = new Discord.MessageEmbed()
      .setDescription(`You answered the phone ${count} times and earned **$${workAmt}.${decimal}**!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      const congratsEmbed2 = new Discord.MessageEmbed()
      .setDescription(`You booked an appointment and earned **$${workAmt}.${decimal}**!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      const congratsEmbed3 = new Discord.MessageEmbed()
      .setDescription(`You countded your daily earnings and it came to a total of **$${workAmt}.${decimal}**!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      reactionCollection(msg, '📞', '💻', '💰', workAmt, congratsEmbed1, congratsEmbed2, congratsEmbed3);
    }
    else if (lifeGuard !== undefined) {
      const congratsEmbed = new Discord.MessageEmbed()
      .setDescription(`You went to work and earnt **$${workAmt}.${decimal}**!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      message.channel.send(congratsEmbed);
    }
    else if (engineer !== undefined) {
      embed.setDescription(`What car would you like to fix?\n\n🚗Regular Car\n🚓Police Car\n🏎Race Car`);
      let msg = await message.channel.send(embed);
      const congratsEmbed1 = new Discord.MessageEmbed()
      .setDescription(`You earnt **$${workAmt}.${decimal}** whilst fixing the 🚗Regular Car!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      const congratsEmbed2 = new Discord.MessageEmbed()
      .setDescription(`You earnt **$${workAmt}.${decimal}** whilst fixing the 🚓Police Car!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      const congratsEmbed3 = new Discord.MessageEmbed()
      .setDescription(`You earnt **$${workAmt}.${decimal}** whilst fixing the 🏎Race Car!`)
      .setAuthor(message.author.username)
      .setThumbnail(message.author.displayAvatarURL())
      reactionCollection(msg, '🚗', '🚓', '🏎', workAmt, congratsEmbed1, congratsEmbed2, congratsEmbed3);
    }
    else if (chief !== undefined) {
      
    }
    else if (clinicalScientist !== undefined) {
      
    }
    else if (headScientist !== undefined) {
      
    }
    else if (lawyer !== undefined) {
      
    }
    else if (socialWorker !== undefined) {
      
    }
    else if (doctor !== undefined) {
      
    } else {
      db.add(message.author.id + '.economy.balance', workAmt);
      db.set(message.author.id + '.economy.work', Date.now() + cooldown);

      //db.delete(message.author.id);
      embed.setDescription(`You earned **$${workAmt}.${decimal}** while working!`);
      message.channel.send(embed);
    }
  }
}

async function reactionCollection(msg, emoji1, emoji2, emoji3, amt, edit1, edit2, edit3) {
  await msg.react(emoji1)
  await msg.react(emoji2)
  await msg.react(emoji3)

  const filter = (reaction, user) => {
    return (
      [emoji1, emoji2, emoji3].includes(reaction.emoji.name) && user.id === message.author.id
    );
  }

  msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.name === emoji1) {
        if (edit1 !== undefined) {
          msg.edit(edit1)
        }
      } else if (reaction.emoji.name === emoji2) {
        if (edit2 !== undefined) {
          msg.edit(edit2)
        }
      } else if (reaction.emoji.name === emoji3) {
        if (edit3 !== undefined) {
          msg.edit(edit3)
        }
      }
    }).catch(() => {
      msg.reactions.removeAll()
      amt = amt / 2
      embed.setDescription(`${crossEmoji} You have failed your work. -$${amt}`);
      db.subtract(message.author.id + '.economy.balance', amt)
      msg.edit(embed)
    });
}