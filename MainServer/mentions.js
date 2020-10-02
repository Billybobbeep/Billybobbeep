const Discord = require(`discord.js`);
const configFile = require('../config.json');
let prefix = configFile.prefix;
const embed = new Discord.MessageEmbed()

module.exports = async (client) => {
  client.on('message', async message => {
    embed.setTitle('Billybobbeep | Mentioned');
    embed.setColor('#fed6e3');
    embed.setFooter(`Requested by: ${message.author.tag}`);
    embed.setTimestamp();

    let args = message.content
      .trim()
      .split(/ +/g);

    //replying to users
    if (message.mentions.users.first()) {
      let messagedUser = message.mentions.users.first()

      if (messagedUser.tag == client.user.tag && message.content.toLowerCase().startsWith('|')) {
        embed.setDescription('Unfortunately, we do not support formatted messages yet, however we hope to launch this service soon.')
        return message.channel.send(embed)
      }
      if (messagedUser.tag == client.user.tag && message.content.toLowerCase().startsWith('*')) {
        embed.setDescription('Unfortunately, we do not support formatted messages yet, however we hope to launch this service soon.')
        return message.channel.send(embed)
      }
      if (messagedUser.tag == client.user.tag && message.content.toLowerCase().startsWith('`')) {
        embed.setDescription('Unfortunately, we do not support formatted messages yet, however we hope to launch this service soon.')
        return message.channel.send(embed)
      }

      if (messagedUser.tag == client.user.tag && message.content.toLowerCase().startsWith(`hello`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`hi`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`yo`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`hey`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`hola`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`ola`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`howdy`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`welcome`) ||
        messagedUser.tag == client.user.tag &&
        message.content.toLowerCase().startsWith(`greetings`)
      ) {
        if (args[0].toLowerCase() == 'welcome') {
          message.channel.send('greetings, <@' + message.author.id + '>')
        } else {
            if (args.includes(',') || args.includes('.') || args.includes('?') || args.includes('/') || args.includes('\\' ) || args.includes('@') || args.includes('|') || args.includes('-') || args.includes(':') || args.includes(';') || args.includes('.')) {
              return message.channel.send(args[0] + ' <@' + message.author.id + '>')
            } else {
              return message.channel.send(args[0] + `, <@${message.author.id}>`)
            }
        }
      }
    }

    //mention commands
    if (message.mentions.users.first()) {
      let messagedUser = message.mentions.users.first();
      if (messagedUser.tag === client.user.tag) {
        if (message.content.toLowerCase().startsWith('<@!' + client.user.id + '> say') ||
        message.content.toLowerCase().startsWith('<@' + client.user.id + '> say')) {
          const commandFile = require('./mentions/say.js')
          commandFile(client, message, args)
          return;
        }
      }
    }
    if (message.mentions.users.first()) {
      let messagedUser = message.mentions.users.first();
      if (messagedUser.tag === client.user.tag) {
        if (message.content.toLowerCase().startsWith('<@!' + client.user.id + '> secret') ||
        message.content.toLowerCase().startsWith('<@' + client.user.id + '> secret')) {
          const commandFile = require('./mentions/secret.js')
          commandFile(client, message, args)
          return;
        }
      }
    }



    //Answer when mentioned
    if (message.mentions.users.first()) {
      let messagedUser = message.mentions.users.first();
        if (args[1]) return;
        if (message.author.bot) return;
        if (!args[0] == '<@!' + client.user.id + '>' || !args[0] == '<@' + client.user.id + '>') return;
        if (messagedUser.tag === client.user.tag) {
            embed.setDescription(`Prefix: \`${configFile.prefix}\`\n` +
              `For additional help please enter the command: \`${configFile.prefix}help\` or enter "help <@${client.user.id}>"`)
          message.channel.send(embed)
        }
    }
  });
}