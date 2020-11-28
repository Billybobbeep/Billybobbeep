module.exports = {
  name: 'quit',
  description: 'Quit your current job.',
  catagory: 'economy',
  guildOnly: true,
  execute(message, prefix, client) {
    const db = require('../../structure/global.js').db;;

    let cashier = db.get(message.author.id + '.jobs.job') === 'cashier' ? true : undefined;
    let teacher = db.get(message.author.id + '.jobs.job') === 'teacher' ? true : undefined;
    let waiter = db.get(message.author.id + '.jobs.job') === 'waiter' ? true : undefined;
    let receptionist = db.get(message.author.id + '.jobs.job') === 'receptionist' ? true : undefined;
    let architect = db.get(message.author.id + '.jobs.job') === 'architect' ? true : undefined;
    let lifeGuard = db.get(message.author.id + '.jobs.job') === 'life guard' ? true : undefined;
    let nurse = db.get(message.author.id + '.jobs.job') === 'nurse' ? true : undefined;
    let police = db.get(message.author.id + '.jobs.job') === 'police' ? true : undefined;
    let engineer = db.get(message.author.id + '.jobs.job') === 'engineer' ? true : undefined;
    let chef = db.get(message.author.id + '.jobs.job') === 'chef' ? true : undefined;
    let clinicalScientist = db.get(message.author.id + '.jobs.job') === 'clinical scientist' ? true : undefined;
    let headScientist = db.get(message.author.id + '.jobs.job') === 'head scientist' ? true : undefined;
    let lawyer = db.get(message.author.id + '.jobs.job') === 'lawyer' ? true : undefined;
    let socialWorker = db.get(message.author.id + '.jobs.job') === 'social worker' ? true : undefined;
    let doctor = db.get(message.author.id + '.jobs.job') === 'doctor' ? true : undefined;

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
      doctor === undefined) return message.channel.send(`You do not have a job.`);

    message.channel.send(`Are you sure you want to quit your job?\n\nYou will have to reapply for another job before you can start working again.`).then(msg => reactions(message, msg, db, client));
  }
}

async function reactions(message, msg, db, client) {
  var job = 'none';

  let cashier = db.get(message.author.id + '.jobs.job') === 'cashier' ? true : undefined;
  let teacher = db.get(message.author.id + '.jobs.job') === 'teacher' ? true : undefined;
  let waiter = db.get(message.author.id + '.jobs.job') === 'waiter' ? true : undefined;
  let receptionist = db.get(message.author.id + '.jobs.job') === 'receptionist' ? true : undefined;
  let architect = db.get(message.author.id + '.jobs.job') === 'architect' ? true : undefined;
  let lifeGuard = db.get(message.author.id + '.jobs.job') === 'life guard' ? true : undefined;
  let nurse = db.get(message.author.id + '.jobs.job') === 'nurse' ? true : undefined;
  let police = db.get(message.author.id + '.jobs.job') === 'police' ? true : undefined;
  let engineer = db.get(message.author.id + '.jobs.job') === 'engineer' ? true : undefined;
  let chef = db.get(message.author.id + '.jobs.job') === 'chef' ? true : undefined;
  let clinicalScientist = db.get(message.author.id + '.jobs.job') === 'clinical scientist' ? true : undefined;
  let headScientist = db.get(message.author.id + '.jobs.job') === 'head scientist' ? true : undefined;
  let lawyer = db.get(message.author.id + '.jobs.job') === 'lawyer' ? true : undefined;
  let socialWorker = db.get(message.author.id + '.jobs.job') === 'social worker' ? true : undefined;
  let doctor = db.get(message.author.id + '.jobs.job') === 'doctor' ? true : undefined;

  if (cashier !== undefined) job = 'cashier';
  if (teacher !== undefined) job = 'teacher';
  if (waiter !== undefined) job = 'waiter';
  if (receptionist !== undefined) job = 'receptionist';
  if (architect !== undefined) job = 'architect';
  if (lifeGuard !== undefined) job = 'lifeGuard';
  if (nurse !== undefined) job = 'nurse';
  if (police !== undefined) job = 'police';
  if (engineer !== undefined) job = 'engineer';
  if (chef !== undefined) job = 'chef';
  if (clinicalScientist !== undefined) job = 'clinicalScientist';
  if (headScientist !== undefined) job = 'headScientist';
  if (lawyer !== undefined) job = 'lawyer';
  if (socialWorker !== undefined) job = 'socialWorker';
  if (doctor !== undefined) job = 'doctor';


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
        db.delete(message.author.id + `.jobs.${job}`);
      } else {
        msg.reactions.removeAll();
        message.channel.send(`${cross} Cancelled prompt.`);
      }
    }).catch(() => {
      msg.reactions.removeAll();
    });
}