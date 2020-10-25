module.exports = (client, message) => {
    const db = require('../databaseManager/index.js');
    var currentNo = new db.table('counting');
    let TE = client.emojis.cache.get('736952966447366154')
    let CE = client.emojis.cache.get('736952985330122772')
    if (db.get(message.guild.id + '.countingChannel') && message.channel.id !== db.get(message.guild.id + '.countingChannel')) return;
    if (message.author.bot) return;
    if (isNaN(message.content)) return;
    if (!currentNo.get(message.guild.id)) currentNo.add(message.guild.id, '0');
    var curr = currentNo.get(message.guild.id);
    console.log(message.content)
    if (message.content === curr + 1) {
        message.react(TE)
        currentNo.add(message.guild.id, 1);
    } else {
        currentNo.set(message.guild.id, 0);
        message.react(CE)
        message.reply('has ruined the chain with an incorrect number.\nThe next number is `' + currentNo.get(message.guild.id) + '`.');
    }
}