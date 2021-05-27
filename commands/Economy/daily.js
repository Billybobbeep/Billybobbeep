module.exports = {
	name: 'daily',
	description: 'Collect your daily reward',
	catagory: 'economy',
	guildOnly: true,
	async execute(message, prefix, client) {
		const Discord = require('discord.js');
		const guildData = require('../../events/client/database/models/guilds.js');
		const userData = require('../../events/client/database/models/users.js');
		let guildResult = await guildData.findOne({ guildId: message.guild.id });
		let userResult = await userData.findOne({ userId: message.author.id });
		const ms = require('ms');
		const embed = new Discord.MessageEmbed();
		embed.setFooter(message.author.username);
		embed.setColor(guildResult.embedColor);

		if (guildData.ecoEnabled) return message.channel.send('Economy commands have been disabled in your server');

		let dailyAmt = 10;
		let cooldown = 8.64e+7;
		let reward = 75;
		let tStreak = userResult.economy_tStreak || 1;
		let streak = userResult.economy_streak || 1;
		let jobs = userResult.job || undefined;
		let balance = userResult.economy_balance || 0;
		let lastRun = userResult.economy_daily || 0
		let timeObj = ms(cooldown - (Date.now() - lastRun));
		timeObj = timeObj.replace('s', ' seconds').replace('m', ' minutes').replace('h', ' hours');

		let cashier = userResult.job === 'cashier' ? true : undefined;
		let teacher = userResult.job === 'teacher' ? true : undefined;
		let waiter = userResult.job === 'waiter' ? true : undefined;
		let receptionist = userResult.job === 'receptionist' ? true : undefined;
		let architect = userResult.job === 'architect' ? true : undefined;
		let lifeGuard = userResult.job === 'life guard' ? true : undefined;
		let nurse = userResult.job === 'nurse' ? true : undefined;
		let police = userResult.job === 'police' ? true : undefined;
		let engineer = userResult.job === 'engineer' ? true : undefined;
		let chef = userResult.job === 'chef' ? true : undefined;
		let clinicalScientist = userResult.job === 'clinical scientist' ? true : undefined;
		let headScientist = userResult.job === 'head scientist' ? true : undefined;
		let lawyer = userResult.job === 'lawyer' ? true : undefined;
		let socialWorker = userResult.job === 'social worker' ? true : undefined;
		let doctor = userResult.job === 'doctor' ? true : undefined;

		if (jobs !== undefined) {
			if (cashier !== undefined) dailyAmt = 7.25
			if (teacher !== undefined) dailyAmt = 8.81
			if (waiter !== undefined) dailyAmt = 9.50
			if (receptionist !== undefined) dailyAmt = 9.58
			if (architect !== undefined) dailyAmt = 8.66
			if (lifeGuard !== undefined) dailyAmt = 11.40
			if (nurse !== undefined) dailyAmt = 17.52
			if (police !== undefined) dailyAmt = 17.61
			if (engineer !== undefined) dailyAmt = 20.55
			if (chef !== undefined) dailyAmt = 20.76
			if (clinicalScientist !== undefined) dailyAmt = 22.45
			if (headScientist !== undefined) dailyAmt = 22.70
			if (lawyer !== undefined) dailyAmt = 25.61
			if (socialWorker !== undefined) dailyAmt = 27.71
			if (doctor !== undefined) dailyAmt = 52.25
		}
		let nem = client.emojis.cache.get('767351869856940063');
		let sem = client.emojis.cache.get('767365396474101831');
		let semoji = `${nem}${nem}${nem}${nem}${nem}`

		if (lastRun !== null && cooldown - (Date.now() - lastRun) > 0) {
			embed.setDescription(`You have already collected your daily allowance today.\nTime Left: **${timeObj}**`);
			message.channel.send(embed);
		} else {
			if (lastRun !== null && cooldown - (Date.now() - lastRun) >= 126000000) {
				userResult.economy_streak = 0;
				userResult.economy_tStreak = 0;
				userResult.save();
			}
			if (streak === 1) semoji = `${sem}${nem}${nem}${nem}${nem}`
			else if (streak === 2) semoji = `${sem}${sem}${nem}${nem}${nem}`
			else if (streak === 3) semoji = `${sem}${sem}${sem}${nem}${nem}`
			else if (streak === 4) semoji = `${sem}${sem}${sem}${sem}${nem}`
			else if (streak === 5) {
				semoji = `${sem}${sem}${sem}${sem}${sem}`
				embed.setDescription(`You have collected your **$${dailyAmt + reward}** reward.\n\n**__Daily streak progress__**\n${semoji}\n\n`);
				embed.setFooter(`Total Streak: ${tStreak}\nWallet: $${balance + dailyAmt + reward}`);
				userResult.economy_daily = Date.now();
				userResult.economy_streak = 0;
				userResult.economy_tStreak = userResult.economy_tStreak + 1;
				userResult.economy_balance = userResult.economy_balance + dailyAmt;
				userResult.save();
				return message.channel.send(embed);
			}
			userResult.economy_tStreak = userResult.economy_tStreak + 1;
			userResult.economy_streak = userResult.economy_streak + 1;
			userResult.economy_daily = Date.now();
			userResult.economy_balance = userResult.economy_balance + dailyAmt;
			userResult.save();

			embed.setDescription(`I have added **$${dailyAmt}** onto your account balance.\n\n**__Daily streak progress__**\n${semoji}\n\n`);
			embed.setFooter(`Total Streak: ${tStreak}\nWallet: $${balance + dailyAmt}`)
			message.channel.send(embed);
		}
	}
}