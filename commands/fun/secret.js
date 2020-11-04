const Discord = require('discord.js');
const configFile = require('../../structure/config.json');

module.exports = {
  name: 'secret',
  description: 'Repeat what you just said in a spoiler format.',
  guildOnly: true,
  execute (message, prefix, client) {
    let args = message.content.slice(prefix.length).trim().split(/ +/g).slice(1);
    let secretMessage = args.join(' ');
    
    if (!args) return message.channel.send('You must specify a message to send.');
    else {
      /*var i = 0;
      var count = 0;
      args.forEach(a => {
        i++;
        if (a.includes('||')) {
          a[i].forEach(r => {
            count++;
            if (r === '|') {
              a[i].slice(count);
            }
          });
        }
      });*/
      console.log(args.join(' ').split(''))
    }
    
    //if (message.content.includes('||')) return message.channel.send('You cannot include `||` in your message.');
    //if (message.content.toLowerCase().includes('/spoiler')) return message.chanel.send('You cannot include `/spoiler` in your message.');
    message.channel.send(`||${secretMessage}||`);
    message.delete();
  }
}