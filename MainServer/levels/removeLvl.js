const db = require('quick.db');

module.exports = async (client, message, prefix) => {

  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let user = message.guild.members.cache.get(args[1]) || message.mentions.users.first()
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('You do not have premission to run this command.')

  if (!user) {
    return message.channel.send('Please mention a user.')
  }
  let currLvl = db.get(user.id + '.level');
  if (!args[1]) {
    return message.channel.send('Please specify an amount.')
  }
  if (args[2] === 'all') {
    db.delete(user.id + '.level');
    user.roles.remove(configFile.level1RoleId)
    return message.channel.send(`Cleared ${user}'s levels.`)
  }
  if (isNaN(args[2])) {
    return message.channel.send('You have entered an invalid amount')
  }
  let amount = args[2]
  if (amount > currLvl) {
    return message.channel.send(`${user} does not have ${amount} level(s)`)
  }
  if (amount < 1) {
    return message.content.send('You hae entered an invalid amount')
  }
  db.subtract(user.id + '.level', amount)
  user.roles.remove(configFile.level1RoleId)
  essage.channel.send(`removed ${amount} level(s) from ${user}`)
}