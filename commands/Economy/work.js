module.exports = {
	name: 'work',
	description: 'Go to work',
	catagory: 'economy',
	guildOnly: true,
	//isSlashEnabled: true,
	options: [],
	async execute(message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../../events/client/database/models/guilds.js');
		const userData = require('../../events/client/database/models/users.js');
		let guildResult = await guildData.findOne({ guildId: message.guild.id });
		let userResult = await userData.findOne({ userId: message.author.id });
		const ms = require('ms');
		const embed = new Discord.MessageEmbed();
		const info = require('./jobRequirements.js');

		let crossEmoji = client.emojis.cache.get('736952985330122772');
		embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL());
		embed.setColor(guildResult.embedColor);

		if (guildResult.ecoEnabled) return message.channel.send('Economy commands have been disabled in your server')

		let workAmt = undefined;
		let cooldown = info.global.work.cooldown;
		let jobs = userResult.job_name || undefined;
		let lastRun = userResult.economy_work;
		let decimal = Math.round(Math.random() * 89) + 10;
		let gainedXp = 1

		let cashier = userResult.job_name === 'cashier' ? true : undefined;
		let teacher = userResult.job_name === 'teacher' ? true : undefined;
		let waiter = userResult.job_name === 'waiter' ? true : undefined;
		let receptionist = userResult.job_name === 'receptionist' ? true : undefined;
		let architect = userResult.job_name === 'architect' ? true : undefined;
		let lifeGuard = userResult.job_name === 'life guard' ? true : undefined;
		let nurse = userResult.job_name === 'nurse' ? true : undefined;
		let police = userResult.job_name === 'police' ? true : undefined;
		let engineer = userResult.job_name === 'engineer' ? true : undefined;
		let chef = userResult.job_name === 'chef' ? true : undefined;
		let clinicalScientist = userResult.job_name === 'clinical scientist' ? true : undefined;
		let headScientist = userResult.job_name === 'head scientist' ? true : undefined;
		let lawyer = userResult.job_name === 'lawyer' ? true : undefined;
		let socialWorker = userResult.job_name === 'social worker' ? true : undefined;
		let doctor = userResult.job_name === 'doctor' ? true : undefined;

		if (jobs !== undefined) {
			if (cashier !== undefined) { workAmt = 10; gainedXp = info.cashier.xp; }
			if (teacher !== undefined) { workAmt = 11; gainedXp = info.teacher.xp; }
			if (waiter !== undefined) { workAmt = 12; gainedXp = info.waiter.xp; }
			if (receptionist !== undefined) { workAmt = 12; gainedXp = info.receptionist.xp; }
			if (architect !== undefined) { workAmt = 15; gainedXp = info.architect.xp; }
			if (lifeGuard !== undefined) { workAmt = 16; gainedXp = info.lifeguard.xp; }
			if (nurse !== undefined) { workAmt = 21; gainedXp = info.nurse.xp; }
			if (police !== undefined) { workAmt = 22; gainedXp = info.police.xp; }
			if (engineer !== undefined) { workAmt = 24; gainedXp = info.engineer.xp; }
			if (chef !== undefined) { workAmt = 25; gainedXp = info.chef.xp; }
			if (clinicalScientist !== undefined) { workAmt = 25; gainedXp = info.clinicalScientist.xp; }
			if (headScientist !== undefined) { workAmt = 26; gainedXp = info.headScientist.xp; }
			if (lawyer !== undefined) { workAmt = 29; gainedXp = info.lawyer.xp; }
			if (socialWorker !== undefined) { workAmt = 31; gainedXp = info.socialWorker.xp; }
			if (doctor !== undefined) { workAmt = 55; gainedXp = info.doctor.xp; }
		}

		function lvlUp() {
			userResult.job_xp = 0;
			userResult.job_level = userResult.job_level ? userResult.job_level + 1 : 1;
			embed.setDescription(`You have levelled up! You are now level **${userResult.job_level}**!`);
			message.channel.send(embed);
			userResult.save();
		}

		if (!userResult.job_name) {
			embed.setDescription(`Before you can start working, you need to get a job.\n\nTo Apply for a job use '${prefix}jobs'`);
			message.channel.send(embed)
		} else if (Date.now() < lastRun) {
			let seco = 'seconds'
			let time2work = ms(Date.now() - lastRun);
			time2work = time2work.replace('-', '');
			if (time2work.endsWith('ms')) time2work = '1s';
			if (time2work === '1s') seco = 'second';
			time2work = time2work.replace('s', '')

			embed.setDescription(`${crossEmoji} Break Time. You can work again in **${time2work}** ${seco}`);
			message.channel.send(embed);
		} else {
			if (teacher !== undefined) {
				embed.setDescription(`What subject would you like to teach?\n\n📕English\n📗Math\n📙Science`);
				let msg = await message.channel.send(embed);
				const congratsEmbed = new Discord.MessageEmbed()
					.setDescription(`You earned **$${workAmt}.${decimal}** while working!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				reactionCollection(msg, '📕', '📗', '📙', workAmt, congratsEmbed, congratsEmbed, congratsEmbed);
			}
			else if (waiter !== undefined) {
				let usedNo = [];
				let numbers = ['1', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
				let emojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
				let no1 = Math.floor(Math.random() * emojis.length);
				if (usedNo.length === numbers.length) usedNo = []
				usedNo.push(numbers[no1]);
				let no2 = Math.floor(Math.random() * emojis.length);
				if (usedNo.includes(numbers[no2])) no2 = Math.floor(Math.random() * emojis.length);
				usedNo.push(numbers[no2]);
				let no3 = Math.floor(Math.random() * emojis.length);
				if (usedNo.includes(numbers[no3])) no3 = Math.floor(Math.random() * emojis.length);
				usedNo.push(numbers[no3]);
				embed.setDescription(`Select a table number:\n\n${emojis[no1]}-${numbers[no1]}\n${emojis[no2]}-${numbers[no2]}\n${emojis[no3]}-${numbers[no3]}`);
				let msg = await message.channel.send(embed);
				const congratsEmbed = new Discord.MessageEmbed()
					.setDescription(`You earned **$${workAmt}.${decimal}** while working!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				reactionCollection(msg, emojis[no1], emojis[no2], emojis[no3], workAmt, congratsEmbed, congratsEmbed, congratsEmbed);
			}
			else if (receptionist !== undefined) {
				embed.setDescription(`What would you like to do?\n\n📞Answer the phone\n💻Book an appointment\n💰Count the daily earnings`);
				let msg = await message.channel.send(embed);
				let count = Math.round(Math.random() * 15);
				const congratsEmbed1 = new Discord.MessageEmbed()
					.setDescription(`You answered the phone ${count} times and earned **$${workAmt}.${decimal}**!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				const congratsEmbed2 = new Discord.MessageEmbed()
					.setDescription(`You booked an appointment and earned **$${workAmt}.${decimal}**!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				const congratsEmbed3 = new Discord.MessageEmbed()
					.setDescription(`You countded your daily earnings and it came to a total of **$${workAmt}.${decimal}**!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				reactionCollection(msg, '📞', '💻', '💰', workAmt, congratsEmbed1, congratsEmbed2, congratsEmbed3);
			}
			else if (lifeGuard !== undefined) {
				const congratsEmbed = new Discord.MessageEmbed()
					.setDescription(`You went to work and earnt **$${workAmt}.${decimal}**!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				message.channel.send(congratsEmbed);
			}
			else if (engineer !== undefined) {
				embed.setDescription(`What car would you like to fix?\n\n🚗Regular Car\n🚓Police Car\n🏎Race Car`);
				let msg = await message.channel.send(embed);
				const congratsEmbed1 = new Discord.MessageEmbed()
					.setDescription(`You earnt **$${workAmt}.${decimal}** whilst fixing the 🚗Regular Car!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				const congratsEmbed2 = new Discord.MessageEmbed()
					.setDescription(`You earnt **$${workAmt}.${decimal}** whilst fixing the 🚓Police Car!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				const congratsEmbed3 = new Discord.MessageEmbed()
					.setDescription(`You earnt **$${workAmt}.${decimal}** whilst fixing the 🏎Race Car!`)
					.setAuthor(message.author.username)
					.setThumbnail(message.author.displayAvatarURL())
					.setColor(guildResult.embedColor);
				reactionCollection(msg, '🚗', '🚓', '🏎', workAmt, congratsEmbed1, congratsEmbed2, congratsEmbed3);
			} else if (chef !== undefined) {
				embed.setDescription(`To begin working click the green circle below`);
				let msg = await message.channel.send(embed);
				chefReact(workAmt, msg, '🟢');
			} else {
				userResult.job_xp = userResult.job_xp ? userResult.job_xp + gainedXp : gainedXp;
				userResult.economy_work = Date.now() + cooldown;
				userResult.economy_balance = userResult.economy_balance ? parseInt(userResult.economy_balance) + Math.round(parseInt(workAmt + '.' + decimal)) : parseInt(workAmt + '.' + decimal);

				let xp = userResult.job_xp;
				if (cashier !== undefined && xp >= info.global.xp.lower.max) {
					lvlUp()
				} else if (teacher !== undefined && xp >= info.global.xp.lower.max) {
					lvlUp()
				} else if (waiter !== undefined && xp >= info.global.xp.lower.max) {
					lvlUp()
				} else if (receptionist !== undefined && xp >= info.global.xp.lower.max) {
					lvlUp()
				} else if (architect !== undefined && xp >= info.global.xp.lower.max) {
					lvlUp()
				} else if (lifeGuard !== undefined && xp >= info.global.xp.lower.max) {
					lvlUp()
				} else if (nurse !== undefined && xp >= info.global.xp.lower.max) {
					lvlUp()
				} else if (police !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				} else if (engineer !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				} else if (chef !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				} else if (clinicalScientist !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				} else if (headScientist !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				} else if (lawyer !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				} else if (socialWorker !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				} else if (doctor !== undefined && xp >= info.global.xp.higher.max) {
					lvlUp()
				}

				embed.setDescription(`You earned **$${workAmt}.${decimal}** while working!`);
				message.channel.send(embed);
				userResult.save();
			}
		}

		async function reactionCollection(msg, emoji1, emoji2, emoji3, amt, edit1, edit2, edit3) {
			await msg.react(emoji1);
			await msg.react(emoji2);
			await msg.react(emoji3);

			userResult.job_xp = userResult.job_xp ? userResult.job_xp + gainedXp : gainedXp;
			let xp = userResult.job_xp;
			let levelledUp = false;
			if (cashier !== undefined && xp >= info.global.xp.lower.max) {
				lvlUp();
				levelledUp = true;
			} else if (teacher !== undefined && xp >= info.global.xp.lower.max) {
				lvlUp();
				levelledUp = true;
			} else if (waiter !== undefined && xp >= info.global.xp.lower.max) {
				lvlUp();
				levelledUp = true;
			} else if (receptionist !== undefined && xp >= info.global.xp.lower.max) {
				lvlUp();
				levelledUp = true;
			} else if (architect !== undefined && xp >= info.global.xp.lower.max) {
				lvlUp();
				levelledUp = true;
			} else if (lifeGuard !== undefined && xp >= info.global.xp.lower.max) {
				lvlUp();
				levelledUp = true;
			} else if (nurse !== undefined && xp >= info.global.xp.lower.max) {
				lvlUp();
				levelledUp = true;
			} else if (police !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			} else if (engineer !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			} else if (chef !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			} else if (clinicalScientist !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			} else if (headScientist !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			} else if (lawyer !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			} else if (socialWorker !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			} else if (doctor !== undefined && xp >= info.global.xp.higher.max) {
				lvlUp();
				levelledUp = true;
			}

			const filter = (reaction, user) => {
				return (
					[emoji1, emoji2, emoji3].includes(reaction.emoji.name) && user.id === message.author.id
				);
			}

			msg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
				.then((collected) => {
					const reaction = collected.first();

					if (reaction.emoji.name === emoji1) {
						if (edit1 !== undefined) {
							msg.reactions.removeAll();
							msg.edit(edit1);
						}
					} else if (reaction.emoji.name === emoji2) {
						if (edit2 !== undefined) {
							msg.reactions.removeAll();
							msg.edit(edit2)
						}
					} else if (reaction.emoji.name === emoji3) {
						if (edit3 !== undefined) {
							msg.reactions.removeAll();
							msg.edit(edit3);
						}
					}
					userResult.economy_balance = userResult.economy_balance ? parseInt(userResult.economy_balance) + Math.round(parseInt(workAmt + '.' + decimal)) : parseInt(workAmt + '.' + decimal);
					if (!levelledUp)
						userResult.save();
				}).catch(() => {
					msg.reactions.removeAll()
					amt = amt / 2
					let bal = userResult.economy_balance || 0;
					if (bal.toString().startsWith('-')) {
						if (
							userResult.job_timesFired === 2 ||
							userResult.job_timesFired === 4 ||
							userResult.job_timesFired === 6 ||
							userResult.job_timesFired === 8
						) {
							userResult.job_name = false;
							userResult.job_timesFired = userResult.job_timesFired ? userResult.job_timesFired + 1 : 1;
							userResult.job_lastFired = Date.now();

							embed.setDescription(`${crossEmoji} You have failed your work and unfortunately was demoted. -$${amt}`);
						} else if (userResult.job_timesFired === 10) {
							userResult.job_name = false;
							userResult.job_timesFired = 0;
							userResult.job_lastFired = Date.now();

							embed.setDescription(`${crossEmoji} You have failed your work and unfortunately was demoted. -$${amt}`);
						} else {
							embed.setDescription(`${crossEmoji} You have failed your work. -$${amt.toFixed()}`);
							userResult.economy_balance = userResult.economy_balance - amt;
							msg.edit(embed);
						}
					}
					embed.setDescription(`${crossEmoji} You have failed your work. **-$${amt.toFixed()}**`);
					userResult.economy_balance = userResult.economy_balance - amt;
					msg.edit(embed);
					userResult.save();
				});
		}

		async function chefReact(amt, msg, emoji1, emoji2, emoji3) {
			if (emoji1)
				await msg.react(emoji1);
			if (emoji2)
				await msg.react(emoji2);
			if (emoji3)
				await msg.react(emoji3);

			const filter = (reaction, user) => {
				return (
					[emoji1, emoji2, emoji3].includes(reaction.emoji.name) && user.id === message.author.id
				);
			}

			msg.awaitReactions(filter, { max: 1, time: 10000, errors: ['time'] })
				.then((collected) => {
					const reaction = collected.first();

					if (reaction.emoji.name == '🟢') {
						msg.reactions.removeAll()
						mainChef('start', msg);
					} else if (reaction.emoji.name === emoji1) {
						msg.reactions.removeAll();
						return mainChef('1', msg, emoji1, amt);
					} else if (reaction.emoji.name === emoji2) {
						msg.reactions.removeAll();
						return mainChef('2', msg, emoji2, amt);
					} else if (reaction.emoji.name === emoji3) {
						msg.reactions.removeAll();
						return mainChef('3', msg, emoji3, amt);
					}
				}).catch(() => {
					msg.reactions.removeAll()
					amt = amt / 2;
					if ((userResult.economy_balance).toString().startsWith('-')) {
						if (
							userResult.job_timesFired === 2 ||
							userResult.job_timesFired === 4 ||
							userResult.job_timesFired === 6 ||
							userResult.job_timesFired === 8
						) {
							userResult.job_name = false;
							userResult.job_timesFired = userResult.job_timesFired ? userResult.job_timesFired + 1 : 1;
							userResult.job_lastFired = Date.now();
							embed.setDescription(`${crossEmoji} You have failed your work and unfortunately was demoted. -$${amt.toFixed()}`);
						} else if (userResult.job_timesFired === 10) {
							userResult.job_name = false;
							userResult.job_timesFired = 0;
							userResult.job_lastFired = Date.now();
							embed.setDescription(`${crossEmoji} You have failed your work and unfortunately was demoted. -$${amt.toFixed()}`);
						} else {
							userResult.economy_balance = userResult.economy_balance - amt.toFixed();
							embed.setDescription(`${crossEmoji} You have failed your work. -$${amt.toFixed()}`);
							msg.edit(embed);
						}
					}
					embed.setDescription(`${crossEmoji} You have failed your work. **-$${amt.toFixed()}**`);
					userResult.economy_balance = userResult.economy_balance - amt.toFixed();
					msg.edit(embed);
					userResult.save();
				});
		}

		function mainChef(reaction, msg, emoji, amt) {
			let emojis = ['🍳', '🥐', '🥑', '🥒', '🥓', '🥔', '🥕', '🥖', '🥗', '🥘', '🥚', '🥜', '🥝', '🥞', '🦐', '🦑'];
			let names = ['Fried Eggs', 'Croissants', 'Avocado', 'Cucumber', 'Bacon Strips', 'Potatoes', 'Carrots', 'Bread Sticks', 'Salad', 'Curry', 'Boiled Eggs', 'Special Nut Dish', 'Kiwi', 'Pancakes', 'Shrimp', 'Octopus'];
			if (reaction === 'start') {
				let no1 = Math.floor(Math.random() * emojis.length);
				let no2 = Math.floor(Math.random() * emojis.length);
				let no3 = Math.floor(Math.random() * emojis.length);
				if (no1 === no2) no2 = Math.floor(Math.random() * emojis.length);
				if (no2 === no3) no3 = Math.floor(Math.random() * emojis.length);
				if (no3 === no1) no1 = Math.floor(Math.random() * emojis.length);
				embed.setDescription(`What would you like to prepare first?\n${emojis[no1]} - ${names[no1]}\n${emojis[no2]} - ${names[no2]}\n${emojis[no3]} - ${names[no3]}`);
				msg.edit(embed);
				chefReact(amt, msg, emojis[no1], emojis[no2], emojis[no3]);
			} else if (reaction === '1' || reaction === '2' || reaction === '3') {
				let name;
				name = names[emojis.indexOf(emoji)];
				if (name.toString().endsWith('s')) {
					embed.setDescription(`Preparing some ${name}..`);
				} else {
					embed.setDescription(`Preparing a ${name}..`);
				}
				msg.edit(embed);
				setTimeout(() => {
					let string = '';
					if (name.toString().endsWith('s')) string = 'some'; else string = 'a';
					embed.setDescription(`You have successfully prepared ${string} ${name} and earned **$${workAmt.toFixed()}**!`);
					msg.edit(embed);
					userResult.economy_balance = (userResult.economy_balance + workAmt).toFixed();
					userResult.save();
				}, 1000);
			}
		}
	}
}