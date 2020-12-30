module.exports = {
  name: 'quit',
  description: 'Quit your current job',
  catagory: 'economy',
  guildOnly: true,
  async execute(message, prefix, client) {
    const guildData = require('../../events/client/database/models/guilds.js');
    const userData = require('../../events/client/database/models/users.js');
    let guildResult = await guildData.findOne({ guildId: message.guild.id });
    let userResult = await userData.findOne({ userId: message.author.id });

    let cashier = userResult.job === 'cashier' ? true : undefined;
    let teacher = userResult.job === 'teacher' ? true : undefined;
    let waiter = userResult.job === 'waiter' ? true : undefined;
    let receptionist = userResult.job === 'receptionist' ? true : undefined;
    let architect = userResult.job === 'architect' ? true : undefined;
    let lifeGuard = userResult.job === 'life guard' ? true : undefined;
    let nurse = userResult.job === 'nurse' ? true : undefined;
    let police = userResult.job === 'police' ? true : undefined;
    let engineer = userResult.job === 'engineer' ? true : undefined;
    let chef = userResult.job === 'chef' ? true : undefined;
    let clinicalScientist = userResult.job === 'clinical scientist' ? true : undefined;
    let headScientist = userResult.job === 'head scientist' ? true : undefined;
    let lawyer = userResult.job === 'lawyer' ? true : undefined;
    let socialWorker = userResult.job === 'social worker' ? true : undefined;
    let doctor = userResult.job === 'doctor' ? true : undefined;

    if (cashier === undefined &&
      teacher === undefined &&
      waiter === undefined &&
      receptionist === undefined &&
      architect === undefined &&
      lifeGuard === undefined &&
      nurse === undefined &&
      police === undefined &&
      engineer === undefined &&
      chef === undefined &&
      clinicalScientist === undefined &&
      headScientist === undefined &&
      lawyer === undefined &&
      socialWorker === undefined &&
      doctor === undefined) return message.channel.send(`You do not have a job`);

    message.channel.send(`Are you sure you want to quit your job?\n\nYou will have to re-apply for another job before you can start working again`).then(msg => reactions(message, msg, guildData, client));
  }
}

async function reactions(message, msg, guildData, client) {
  let job = userResult.job;

  let tick = client.emojis.cache.get(require('../../structure/config.json').TickEmoji1);
  let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
  const filter = (reaction, user) => {
    return (
      [tick.id, cross.id].includes(reaction.emoji.id) && user.id === message.author.id
    );
  }
  await msg.react(tick);
  await msg.react(cross);
  msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
    .then((collected) => {
      const reaction = collected.first();

      if (reaction.emoji.id === tick.id) {
        msg.reactions.removeAll();
        message.channel.send(`${tick} Successfully quit your job. (${job})`);
        userData.findOneAndUpdate({ userId: message.author.id }, { job: false });
      } else {
        msg.reactions.removeAll();
        message.channel.send(`${cross} Cancelled prompt`);
      }
    }).catch(() => {
      msg.reactions.removeAll();
    });
}