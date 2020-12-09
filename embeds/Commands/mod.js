module.exports = async(msg, args, prefix, message) => {
        const Discord = require('discord.js');
        const db = require('../../structure/global.js').db;
        const fs = require('fs');
        const embed = new Discord.MessageEmbed()
        .setTitle('Billybobbeep | Moderation Commands')
        .setFooter(`Requested by: ${message.author.tag}`)
        .setTimestamp()
        message.guild ? embed.setColor(`${db.get(message.guild.id + '.embedColor') || '#447ba1'}`) : embed.setColor('#447ba1');
        const commandFolders = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));
        for (const folder of commandFolders) {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                        const command = require(`../../commands/${folder}/${file}`);
                        if (command.usage && command.catagory && command.catagory === 'moderation') {
                                console.log(command.name)
                                /*embed.addField(
                                        `${prefix}${command.name[0].toString().toUppercase()}${command.name.toString().toLowerCase().substring(1)}`,
                                        `${command.description[0].toString().toUppercase()}${command.description.toString().toLowerCase().substring(1)}`,
                                        `**Usage:** ${prefix}${command.usage}`
                                );*/
                                embed.addField(
                                        `${prefix}${command.name}`,
                                        `${command.description}\n` +
                                        `Usage: ${prefix}${command.usage}`,
                                        true
                                );
                        } else if (command.catagory && command.catagory === 'moderation') {
                                embed.addField(
                                        `${prefix}${command.name}`,
                                        `${command.description}`,
                                        false
                                );
                        }
                }
        }
        message.channel.send(embed);
}