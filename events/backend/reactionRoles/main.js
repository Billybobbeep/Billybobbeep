const db = require('../../databaseManager/index.js');

module.exports = (client) => {
  client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			return;
		}
	}
    if (reaction.message)
      if (user.id != client.user.id) {
        if (reaction.message.id === '736185637459198062') {
          if (
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.cache.find(role => role.id === '736182326811164762') //him/he role
          ) {
            await reaction.message.guild.members.cache
              .find(member => member.id == user.id)
              .roles.remove(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736182326811164762'
                ) //him/he role
              );
          }
          if (
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.cache.find(role => role.id === '736182237422420009') //she/her role
          ) {
            await reaction.message.guild.members.cache
              .find(member => member.id == user.id)
              .roles.remove(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736182237422420009'
                ) //she/her role
              );
          }
          if (
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.cache.find(role => role.id === '736182403898540084') //them/they role
          ) {
            await reaction.message.guild.members.cache
              .find(member => member.id == user.id)
              .roles.remove(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736182403898540084'
                )//them/they role
              );
          }
          if (
            reaction.emoji.name == '⚪' &&
            reaction.message.id === '736185637459198062'
          ) {
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.add(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736182326811164762'
                ) //him/he role
              );
          }
          if (
            reaction.emoji.name == '🔴' &&
            reaction.message.id === '736185637459198062'
          ) {
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.add(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736182237422420009'
                )
              );
          }
          if (
            reaction.emoji.name == '⚫' &&
            reaction.message.id === '736185637459198062'
          ) {
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.add(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736182403898540084'
                )
              );
          }
        }

        if (reaction.message.id === '736221636277174372') {
          if (
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.cache.find(role => role.id === '736209499068694530')
          ) {
            await reaction.message.guild.members.cache
              .find(member => member.id == user.id)
              .roles.remove(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736209499068694530'
                )
              );
          }
          if (
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.cache.find(role => role.id === '736222113395900526')
          ) {
            await reaction.message.guild.members.cache
              .find(member => member.id == user.id)
              .roles.remove(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736222113395900526'
                ).id
              );
          }
          if (
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.cache.find(role => role.id === '736209408085983305')
          ) {
            await reaction.message.guild.members.cache
              .find(member => member.id == user.id)
              .roles.remove(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736209408085983305'
                ).id
              );
          }
          if (
            reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.cache.find(role => role.id === '736222535611318363')
          ) {
            await reaction.message.guild.members.cache
              .find(member => member.id == user.id)
              .roles.remove(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736222535611318363'
                ).id
              );
          }
          if (reaction.emoji.name == '⚪') {
            await reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.add(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736209499068694530'
                )
              );
          }
          if (reaction.emoji.name == '🔴') {
            await reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.add(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736222113395900526'
                )
              );
          }
          if (reaction.emoji.name == '🟡') {
            await reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.add(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736209408085983305'
                )
              );
          }
          if (reaction.emoji.name == '🟢') {
            await reaction.message.guild.members.cache
              .find(member => member.id === user.id)
              .roles.add(
                reaction.message.guild.roles.cache.find(
                  role => role.id === '736222535611318363'
                )
              );
      }
    }
      
      


      if (reaction.message.id === '771833349567676476') {
        if (reaction.emoji.id == '771826679722410044') {
          await reaction.message.guild.members.cache
            .find(member => member.id === user.id)
            .roles.add(
              reaction.message.guild.roles.cache.find(
                role => role.id === '771817187693821982'
              )
            );
        }
        if (reaction.emoji.id == '734494044230516767') {
          await reaction.message.guild.members.cache
            .find(member => member.id === user.id)
            .roles.add(
              reaction.message.guild.roles.cache.find(
                role => role.id === '771816718577827880'
              )
            );
        }
        if (reaction.emoji.name == '771827072888209419') {
          await reaction.message.guild.members.cache
            .find(member => member.id === user.id)
            .roles.add(
              reaction.message.guild.roles.cache.find(
                role => role.id === '771817303267344404'
              )
            );
        }
        if (reaction.emoji.name == '🔊') {
          await reaction.message.guild.members.cache
            .find(member => member.id === user.id)
            .roles.add(
              reaction.message.guild.roles.cache.find(
                role => role.id === '771817305918144522'
              )
            );
        }
        if (reaction.emoji.id== '771828077093191732') {
          await reaction.message.guild.members.cache
            .find(member => member.id === user.id)
            .roles.add(
              reaction.message.guild.roles.cache.find(
                role => role.id === '771817700804395010'
              )
            );
        }
        if (reaction.emoji.name == '✨') {
          await reaction.message.guild.members.cache
            .find(member => member.id === user.id)
            .roles.add(reaction.message.guild.roles.cache.find(role => role.id === '771818226614534154'));
        }
      }
    }
  });


  client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.message.id === '771833349567676476') {
      if (reaction.emoji.id == '771826679722410044') {
        await reaction.message.guild.members.cache
          .find(member => member.id === user.id)
          .roles.remove(
            reaction.message.guild.roles.cache.find(role => role.id === '771817187693821982'));
      }
      if (reaction.emoji.id == '734494044230516767') {
        await reaction.message.guild.members.cache
          .find(member => member.id === user.id)
          .roles.remove(reaction.message.guild.roles.cache.find(role => role.id === '771816718577827880'));
      }
      if (reaction.emoji.name == '771827072888209419') {
        await reaction.message.guild.members.cache
          .find(member => member.id === user.id)
          .roles.remove(reaction.message.guild.roles.cache.find(role => role.id === '771817303267344404'));
      }
      if (reaction.emoji.name == '🔊') {
        await reaction.message.guild.members.cache
          .find(member => member.id === user.id)
          .roles.remove(reaction.message.guild.roles.cache.find(role => role.id === '771817305918144522'));
      }
      if (reaction.emoji.id== '771828077093191732') {
        await reaction.message.guild.members.cache
          .find(member => member.id === user.id)
          .roles.remove(reaction.message.guild.roles.cache.find(role => role.id === '771817700804395010'));
      }
      if (reaction.emoji.name == '✨') {
        await reaction.message.guild.members.cache
          .find(member => member.id === user.id)
          .roles.remove(reaction.message.guild.roles.cache.find(role => role.id === '771818226614534154'));
      }
    }
  });
}