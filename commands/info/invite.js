module.exports = {
  name: 'invite',
  description: 'Generate a bot invite',
  catagory: 'info',
  execute (message, prefix, client) {
    const Discord = require('discord.js');
    const embed = Discord.MessageEmbed();
    embed.addField('Invite the bot to your server', '[https://discord.com/oauth2/authorize](https://discord.com/oauth2/authorize?client_id=731498842813366304&permissions=8&scope=bot)');
    embed.addField('View more information', `[View ${client.user.username} on top.gg](https://top.gg/bot/731498842813366304)`);
    embed.addField(`Join the official ${client.user.username} server`, '[Billybobbeep Help Center](AUGX9sywnP)');
    message.channel.send(embed);
  }
}