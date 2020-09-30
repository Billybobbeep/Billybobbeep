const Discord = require(`discord.js`);
const configFile = require('../../config.json');
let prefix = configFile.prefix;
const embed = new Discord.MessageEmbed();

module.exports = async(client) => {
  let colorChart = ['#a1c4fd', '#c2e9fb', '#d4fc79', '#96e6a1', '#a6c0fe', '#f68084', '#fccb90', '#d57eeb', '#e0c3fc', '#fa709a', '#fee140', '#30cfd0', '#a8edea', '#fed6e3'];
  let ranColor = colorChart[Math.floor(Math.random() * colorChart.length)]
  let afkMembers = []
  let offlineMembers = []
  let people = []
  let reason = ''
  let user;
  let use;

client.on('message', async message => {
  if (message.author.bot) return;
  let args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
  embed.setTitle('Billybobbeep | AFK Handling');
  embed.setColor(ranColor);
  embed.setTimestamp();
  embed.setFooter(`Requested by: ${message.author.tag}`);

  if (message.content.toLowerCase().startsWith(prefix + 'afk')) {
      if (message.guild === null) {
        embed.setDescription('This command is not available for direct messaging, please enter the command in a valid server.')
        return message.channel.send(embed)
      }
    if (args[1]) {
      if (args[1] === 'me') {
        user = message.author
      } else {
        user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
      }
    } else {
        embed.setDescription('Please specify a user to mark as AFK.')
        return message.channel.send(embed)
      }
    if (!user) {
      embed.setDescription('Please specify a user to mark as AFK.')
      return message.channel.send(embed)
    }
    if (args[2]) {
      reason = args[2]
    } else {
      reason = 'No reason was provided.'
    }
    use = true
    afkMembers.forEach((a) => {
      if (user.id === a) {
        embed.setDescription('This user is already marked as AFK.')
        use = false
        return message.channel.send(embed)
      }
    });
    if (user.bot) {
      embed.setDescription(`You cannot mark bots as AFK.`);
      return message.channel.send(embed)
    } else {
      if (use === false) return;
    embed.setDescription(`**${user.tag}** has now been marked as AFK.\n**Reason:** ${reason}`);
    afkMembers.push(user.id);
    message.channel.send(embed);
      if (message.author.id === user.id) {
        embed.setDescription(`You have marked your self as AFK in ${message.guild}\nReason: ${reason}`)
        embed.setFooter(`When you are back please run the command ${configFile.prefix}back in ${message.guild}`)
        return user.send(embed)
      } else {
        embed.setDescription(`${message.author.tag} has marked you as AFK in ${message.guild}\nReason: ${reason}`)
        embed.setFooter(`When you are back please run the command ${configFile.prefix}back in ${message.guild}`)
        return user.send(embed)
      }
    }
  }

  //////////////////////////
  //[AFK - Return Command]//
  //////////////////////////

    if (message.content.toLowerCase().startsWith(prefix + 'back')) {

      if (args[1]) {
      if (args[1] === 'me') {
        user = message.author
      } else {
        user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
      }
    } else {
        embed.setDescription('Please specify a user.')
        return message.channel.send(embed)
      }
    if (!user) {
      embed.setDescription('Please specify a user.')
      return message.channel.send(embed)
    }

      afkMembers.forEach((a) => {
        if (user.id === a) {
          embed.setDescription('**' + user.tag + '** has now been removed from the AFK list.\nWelcome back, ' + user.tag);
          afkMembers.splice(afkMembers.indexOf(message.author.id), 1);
          return message.channel.send(embed)
        } else {
          embed.setDescription('**' + user.tag + '** ' + 'was not marked as AFK');
          return message.channel.send(embed)
        }
      });
    }
    
  //////////////////
  //[WhoIs - List]//
  //////////////////
  if (message.content.toLowerCase() === prefix + 'whois afk') {
    people = []
    afkMembers.forEach((a) => {
      people.push('<@' + a + '>\n');
    });
    if (people.length > 2048) {
      embed.setDescription(
      'The list of people AFK is too long to view, please try again later..'
    )
    }
    if (people.length < 1) {
      embed.setDescription(
        'The following people either are offline or set themselves as afk:\n\n' + 'There are no users currently AFK.\n\n'
      )
      message.channel.send(embed)
    } else {
      embed.setDescription(
        'The following people are afk:\n\n' + people
      )
      message.channel.send(embed)
    }
  };

  if (message.content.toLowerCase() === prefix + 'whois') {
    embed.setDescription(
      'To view everyone who as marked themselves as AFK please enter the command: ' + configFile.prefix + 'whois afk'
    )
    message.channel.send(embed)
  };


    //Let know that a user is AFK
    if (message.mentions.users.first()) {
      afkMembers.forEach((a) => {
      //let user = message.mentions.users.first()
      //if (user.id === a) {
      if (message.mentions.users.has(a) || message.mentions.users.has(a)) {
        embed.setDescription('The user you have pinged (' + user.tag + ') is currently AFK.')
        return message.channel.send(embed)
      }
    });

    offlineMembers = []
    let guild = client.guilds.cache.get(configFile.ServerId);

    let offlineMembers1 = guild.members.cache.filter(member => member.presence.status == 'offline').array()
    offlineMembers1.forEach((offline) => {
      let user = message.mentions.users.first()
      if (user.id === offline.user.id) {
        embed.setDescription('The user you have pinged (' + user.tag + ') is currently offline.')
        return message.channel.send(embed)
      }
    });
    }
  });

  //////////////////////
  //[AFK - Automation]//
  //////////////////////
  client.on('ready', async () => {
    offlineMembers = []
    let guild = client.guilds.cache.get(configFile.ServerId);

    let offlineMembers1 = guild.members.cache.filter(member => member.presence.status == 'offline').array()
    offlineMembers1.forEach((offline) => {
      offlineMembers.push(offline.user.id);
    });
  });
}