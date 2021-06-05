const Discord = require('discord.js');
const guildData = require('../../events/client/database/models/guilds.js');
const embed = new Discord.MessageEmbed();
let lastImage = '';

module.exports = {
	name: 'image',
	description: 'Generate a random image',
	catagory: 'generator',
	guildOnly: true,
	isSlashEnabled: { type: true, public: false },
	options: [],
	/**
	 * @param {object} message The message that was sent
	 * @param {string} prefix The servers prefix
	 * @param {objects} client The bots client
	 */
	execute(message, _prefix, client) {
		let randomImage = [
			`https://cdn.discordapp.com/attachments/731508540761440336/732301974543794297/8296f82029ae59b698060544deb1531a.png`,
			`https://media.discordapp.net/attachments/729336942998585346/732000263988314242/image0.png?width=415&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/729337997681492048/image0.png`,
			`https://cdn.discordapp.com/attachments/705899347480412231/731873326934392842/Screen_Shot_2020-07-05_at_03.07.09.png`,
			`https://media.discordapp.net/attachments/729336942998585346/732000258527330384/image0.png?width=491&height=475`,
			`https://media.discordapp.net/attachments/705899347480412231/731873572569612388/Screen_Shot_2020-07-05_at_02.43.52.png`,
			`https://media.discordapp.net/attachments/705899347480412231/731873675950948382/IMG_2673.jpg?width=515&height=475`,
			`https://media.discordapp.net/attachments/705899347480412231/731873720641257572/1211_PeepoMagic.png`,
			`https://media.discordapp.net/attachments/705899347480412231/731873661375479828/IMG_2675.jpg?width=484&height=475`,
			`https://media.discordapp.net/attachments/705899347480412231/731873867114610718/vape_cat.jpg?width=471&height=475`,
			`https://media.discordapp.net/attachments/705899347480412231/731873867575853156/Screen_Shot_2020-06-16_at_09.17.39.png`,
			`https://media.discordapp.net/attachments/705899347480412231/731873868184158208/Screen_Shot_2020-06-16_at_09.18.58.png`,
			`https://media.discordapp.net/attachments/729336942998585346/729337991356481606/image0.jpg`,
			`https://media.discordapp.net/attachments/729336942998585346/729337930954440794/image0.jpg?width=478&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/729337922620358666/image0.png?width=487&height=475`,
			`https://cdn.discordapp.com/attachments/737269522532401173/758397625044435004/image0.jpg`,
			`https://media.discordapp.net/attachments/729336942998585346/729337910708666448/image0.jpg?width=633&height=475`,
			`https://media.discordapp.net/attachments/729337022027792484/729338094301478972/image1.png`,
			`https://media.discordapp.net/attachments/729337022027792484/729338093601292328/image0.png?width=845&height=475`,
			`https://media.discordapp.net/attachments/729337022027792484/729338055923728535/image0.png`,
			`https://media.discordapp.net/attachments/729337022027792484/729337091569483868/image0.png?width=494&height=475`,
			`https://media.discordapp.net/attachments/729337022027792484/729337086062231612/image0.png?width=477&height=475`,
			`https://media.discordapp.net/attachments/729337022027792484/729337082266386503/image0.png?width=384&height=475`,
			`https://media.discordapp.net/attachments/729337022027792484/729337077342404668/image0.png?width=474&height=475`,
			`https://media.discordapp.net/attachments/729337022027792484/729337073273667654/image0.png?width=481&height=475`,
			`https://media.discordapp.net/attachments/729337022027792484/729337068744081437/image0.png?width=483&height=475`,
			`https://cdn.discordapp.com/attachments/722092443348107275/731874017467957278/IMG_2672.jpg`,
			`https://media.discordapp.net/attachments/729336942998585346/732000269079937234/image0.png?width=631&height=475`,
			`https://cdn.discordapp.com/attachments/714224966232440862/731876738304311296/unknown.png`,
			`https://cdn.discordapp.com/attachments/714224966232440862/731876701121937528/unknown.png`,
			`https://cdn.discordapp.com/attachments/714224966232440862/731876658151293018/unknown.png`,
			`https://cdn.discordapp.com/attachments/714224966232440862/731876608641728563/unknown.png`,
			`https://cdn.discordapp.com/attachments/714224966232440862/731876531692896326/unknown.png`,
			`https://media.discordapp.net/attachments/730170141198909442/731539319956963328/image0.png?width=509&height=475`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730791111852949544/image0.png`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730744410014482462/image0.jpg`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730743877811568720/image0.jpg`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730743350805659668/image0.jpg`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730534144345374780/Staring_Hamster-7aa2cb69-5a36-48ef-8bd3-5dcec2505355.jpg`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730174433578451015/image0.jpg`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730174425210814464/image0.png`,
			`https://cdn.discordapp.com/attachments/700061881779355670/758398695166705724/image0.png`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730174422136389662/image0.jpg`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730174334819106816/image0.png`,
			`https://cdn.discordapp.com/attachments/730170141198909442/730174292771209286/image0.png`,
			`https://media.discordapp.net/attachments/729336942998585346/732000497418108938/image0.png?width=480&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000282225147935/image0.png?width=493&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000279054123179/image0.png?width=427&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000272036921414/image0.png?width=664&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000269079937234/image0.png?width=631&height=475`,
			`https://media.discordapp.net/attachments/714224966232440862/731878775666638888/20200712_152035.jpg?width=413&height=475`,
			`https://media.discordapp.net/attachments/714224966232440862/731878774869852210/20200712_152223.jpg?width=307&height=475`,
			`https://media.discordapp.net/attachments/714224966232440862/731878774387376260/20200712_152341.jpg?width=526&height=475`,
			`https://media.discordapp.net/attachments/714224966232440862/731878774118809690/20200712_152352.jpg?width=406&height=474`,
			`https://media.discordapp.net/attachments/714224966232440862/731878773875540058/20200712_152405.jpg?width=573&height=475`,
			`https://cdn.discordapp.com/attachments/700061881779355670/758398686194827314/image0.jpg`,
			`https://cdn.discordapp.com/attachments/700061881779355670/758398636852772924/image0.jpg`,
			`https://media.discordapp.net/attachments/714224966232440862/731878773586264064/20200712_152417.jpg?width=833&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000252302852126/image0.png?width=494&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000241636868207/image0.png?width=684&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000249656246302/image0.png?width=422&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000233680011294/image0.png?width=487&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000226621259785/image0.png?width=489&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000222753849404/image0.png?width=568&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000217540329522/image0.png?width=484&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000213929295922/image0.png?width=486&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000207990161469/image0.png?width=481&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000201845243986/image0.png?width=492&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000160451788890/image0.png?width=485&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000137282584732/image0.png?width=493&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732000133847449711/image0.png?width=489&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732175390625497108/image0.png`,
			`https://media.discordapp.net/attachments/729336942998585346/732175613049176115/dora1.png?width=356&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732176054822895706/image0.png?width=367&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732176615378911252/unknown.png`,
			`https://media.discordapp.net/attachments/729336942998585346/732343166203723947/image0.png?width=514&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732343169999700009/image0.png?width=529&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732494120676753418/image0.jpg?width=366&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732494122715447346/image0.jpg?width=475&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732494126859157584/image0.jpg?width=475&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732494132676657234/image0.jpg?width=475&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732494136258723840/image0.jpg?width=480&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732494140717137940/image0.png?width=477&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732494152205467668/image0.png?width=383&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732899509121581136/image0.png?width=426&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732904635991326761/image0.png?width=503&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732904642135982110/image0.png?width=492&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732904648813576262/image0.png`,
			`https://media.discordapp.net/attachments/729336942998585346/732904659550994452/image0.png?width=486&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732904676705566772/image0.png?width=480&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/732904679255703572/image0.png?width=492&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/733623202831532092/image0.png?width=481&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/733623207315111966/image0.jpg?width=576&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/733623225048760350/image0.jpg?width=414&height=474`,
			`https://media.discordapp.net/attachments/729336942998585346/733664051887996978/image0.png?width=495&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/733664081352851466/image0.png?width=549&height=475`,
			`https://media.discordapp.net/attachments/729336942998585346/733664084851163186/image0.png?width=462&height=475`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020402157715596/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020370755092692/image0.jpg`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020356737466378/image0.jpg`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020350609588268/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020334000144514/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020324936515656/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020264282685531/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020255197692044/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020250323910766/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020237598523482/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020219575337000/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020207475032134/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020174092304445/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020169008939078/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020162620883034/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020154488258660/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020147441959033/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020137304195122/image0.jpg`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020135240597594/image0.png`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020113275158558/image0.jpg`,
			`https://cdn.discordapp.com/attachments/729336942998585346/754020109042974840/image0.jpg`]

		guildData.findOne({ guildId: (message.guild ? message.guild.id : message.guild_id ) }).then(result => {
			if (result.cleanFilter)
				return !message.data ? message.channel.send('This server has been set to clean content only') : require('../../utils/functions').slashCommands.reply(message, client, 'This server has been set to clean content only');

			embed.setColor(result.embedColor);
			embed.setTitle('Billybobbeep | Image Generator');
			embed.setDescription('Please note: These images may include content some viewers may find disturbing');

			function Generator(lastImage) {
				let unfunnyMemeSend = randomImage[Math.floor(Math.random() * randomImage.length)]
				if (unfunnyMemeSend === lastImage)
					Generator2(lastImage);
				lastImage = unfunnyMemeSend;
				embed.setImage(unfunnyMemeSend);
			}

			function Generator2(lastImage) {
				let unfunnyMemeSend = randomImage[Math.floor(Math.random() * randomImage.length)]
				if (unfunnyMemeSend === lastImage)
					Generator(lastImage)
				lastImage = unfunnyMemeSend
				embed.setImage(unfunnyMemeSend)
			}

			Generator(lastImage);
			!message.data ? message.channel.send(embed) : require('../../utils/functions').slashCommands.reply(message, client, embed);
		});
	}
}