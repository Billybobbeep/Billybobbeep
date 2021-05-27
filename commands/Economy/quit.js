module.exports = {
  name: 'quit',
  description: 'Quit your current job',
  catagory: 'economy',
  guildOnly: true,
  options: [],
  async execute(message, prefix, client) {
    const userData = require('../../events/client/database/models/users.js');
    const userResult = await userData.findOne({ userId: message.author.id });

    let cashier = userResult.job_name === 'cashier' ? true : undefined;
    let teacher = userResult.job_name === 'teacher' ? true : undefined;
    let waiter = userResult.job_name === 'waiter' ? true : undefined;
    let receptionist = userResult.job_name === 'receptionist' ? true : undefined;
    let architect = userResult.job_name === 'architect' ? true : undefined;
    let lifeGuard = userResult.job_name === 'life guard' ? true : undefined;
    let nurse = userResult.job_name === 'nurse' ? true : undefined;
    let police = userResult.job_name === 'police' ? true : undefined;
    let engineer = userResult.job_name === 'engineer' ? true : undefined;
    let chef = userResult.job_name === 'chef' ? true : undefined;
    let clinicalScientist = userResult.job_name === 'clinical scientist' ? true : undefined;
    let headScientist = userResult.job_name === 'head scientist' ? true : undefined;
    let lawyer = userResult.job_name === 'lawyer' ? true : undefined;
    let socialWorker = userResult.job_name === 'social worker' ? true : undefined;
    let doctor = userResult.job_name === 'doctor' ? true : undefined;

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
  let job = userResult.job_name;

  let tick = client.emojis.cache.get(require('../../utils/config.json').TickEmoji1);
  let cross = client.emojis.cache.get(require('../../utils/config.json').CrossEmoji);
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
        userData.findOne({ userId: message.author.id }).then(result => {
          result.job_name_name = false;
        });
      } else {
        msg.reactions.removeAll();
        message.channel.send(`${cross} Cancelled prompt`);
      }
    }).catch(() => {
      msg.reactions.removeAll();
    });
}