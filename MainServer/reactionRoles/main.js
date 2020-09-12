const configFile2 = require('./embeds.json')
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

module.exports = async() => {

client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if(user.id != client.user.id) {
		if(reaction.message.id === configFile2.Region) {
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "BRITS<3")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "BRITS<3"));
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Other")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Other").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "English👉👈")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "English👉👈").id);
			}
      if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Americans<3")){
				await reaction.message.guild.members.cache.find(member => member.id == user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Americans<3").id);
			}

			if(reaction.emoji.name == '⚪'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "BRITS<3"));
				//user.send('You have selected the **BRITS<3** role in Squiddies');
				//reaction.message.reactions.resolve("⚪").users.remove(user.id);
			}
			if(reaction.emoji.name == '🔴'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "English👉👈"));
				//user.send('You chose the color `blue`');
				//reaction.message.reactions.resolve("🔵").users.remove(user.id);
			}
			if(reaction.emoji.name == '🟡'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Americans<3"));
				//user.send('You chose the color `green`');
				//reaction.message.reactions.resolve("🟢").users.remove(user.id);
			}
			if(reaction.emoji.name == '🟢'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Other"));
				//user.send('You chose the color `orange`');
				//reaction.message.reactions.resolve("🟠").users.remove(user.id);
			}
		}

		if(reaction.message.id === configFile2.Pronoun) {
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Pronoun: she/her")){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Pronoun: she/her").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Pronoun: he/him")){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Pronoun: he/him").id);
			}
			if(reaction.message.guild.members.cache.find(member => member.id === user.id).roles.cache.find(role => role.name === "Pronoun: them/they")){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.remove(reaction.message.guild.roles.cache.find(role => role.name === "Pronoun: them/they").id);
			}
			if(reaction.emoji.name == '⚪'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Pronoun: he/him"));
				//user.send("You chose the `Male` role");
				//reaction.message.reactions.resolve('👨').users.remove(user.id);
			}
			if(reaction.emoji.name == '🔴'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Pronoun: she/her"));
				//user.send("You chose the `Female` role");
				//reaction.message.reactions.resolve('👩').users.remove(user.id);
			}
			if(reaction.emoji.name == '⚫'){
				await reaction.message.guild.members.cache.find(member => member.id === user.id).roles.add(reaction.message.guild.roles.cache.find(role => role.name === "Pronoun: them/they"));
				//user.send("You chose the `Other` role");
				//reaction.message.reactions.resolve('⭕').users.remove(user.id);
			}
		} 
  }
});
}