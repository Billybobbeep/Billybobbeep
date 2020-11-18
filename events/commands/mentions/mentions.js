module.exports = async (message, client) => {
  const Discord = require('discord.js');
  const db = require('quick.db');
  const embed = new Discord.MessageEmbed();

  if (!message.guild) return;
  embed.setTitle('Billybobbeep | Mentioned');
  embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`);
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
        message.channel.send('Greetings, <@' + message.author.id + '>')
      } else {
        if (args.includes(',') || args.includes('.') || args.includes('?') || args.includes('/') || args.includes('\\') || args.includes('@') || args.includes('|') || args.includes('-') || args.includes(':') || args.includes(';') || args.includes('.')) {
          return message.channel.send(args[0][0].toUpperCase() + args[0].toLowerCase().substring(1) + ' <@' + message.author.id + '>')
        } else {
          return message.channel.send(args[0][0].toUpperCase() + args[0].toLowerCase().substring(1) + `, <@${message.author.id}>`)
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
        require('./say.js')(message, args, client)
        return;
      }
    }
    if (message.content.toLowerCase().startsWith('<@!' + client.user.id + '> secret') ||
      message.content.toLowerCase().startsWith('<@' + client.user.id + '> secret')) {
      require('./secret.js')(message, args, client)
      return;
    }
    if (message.content.toLowerCase().startsWith('<@!' + client.user.id + '> help') ||
      message.content.toLowerCase().startsWith('<@' + client.user.id + '> help') ||
      message.content.toLowerCase().startsWith('help <@' + client.user.id + '>') ||
      message.content.toLowerCase().startsWith('help <@!' + client.user.id + '>')) {
      require('../../../Embeds/help')(message, client)
      return;
    }
  }



  //Answer when mentioned
  if (message.mentions.users.first()) {
    let messagedUser = message.mentions.users.first();
    if (args[1]) return;
    if (message.author.bot) return;
    if (!args[0] == '<@!' + client.user.id + '>' || !args[0] == '<@' + client.user.id + '>') return;
    if (messagedUser.tag === client.user.tag) {
      embed.setDescription(`Prefix: \`${db.get(message.guild.id + '.prefix') || '~'}\`\n` +
        `For additional help please enter the command: \`${db.get(message.guild.id + '.prefix') || '~'}help\` or enter "help <@${client.user.id}>"`)
      message.channel.send(embed)
    }
  }
}