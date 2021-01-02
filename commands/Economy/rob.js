module.exports = {
    name: 'rob',
    description: 'Take money from other users without them noticing',
    guildOnly: true,
    async execute(message, prefix, client) {
        const userData = require('../../events/client/database/models/users.js');
        const Discord = require('discord.js');
        const emebd = new Discord.MessageEmbed();

        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);
        if (!user) return message.channel.send('Please specify a user to rob');
        if (!user.id || !user.tag || !user.displayAvatarURL()) user = user.user;
        if (user.id === message.author.id) return message.channel.send('You cannot rob yourself');
        let userResult = await userData.findOne({ userId: user.id });
        if (user.bot) return message.channel.send('You cannot rob a bot');
        
        if (!userResult) return message.channel.send(`It appears as <@!${user.id}> has not started working yet 🤔`);
        if (!userResult.economy_balance || userResult.economy_balance === 0) return message.channel.send(`It appears as <@!${user.id}> has not started working yet 🤔`);
        if (userResult.economy_balance < 100) return message.channel.send(`<@!${user.id}> only has \`$${userResult.economy_balance}\`, not worth robbing`);
        if (userData.findOne({ userId: message.author.id }).then(result => result.economy_balance) < 50) return message.channel.send(`You need \`$50+\` to rob a user`);
        
        let robAmt = userResult.economy_balance / 2 - 30;
        if (robAmt.toString().split('')[1] && robAmt.toString().split('')[1].length > 2) robAmt = robAmt.toString().split('')[0] + '' + robAmt.toString().split('')[1][0] + robAmt.toString().split('')[1][1];
        let chance = [true, false, true, true, true, true, false];
        const ran = () => {
            let a = Math.round(Math.random() * chance.length);
            return chance[a];
        }
        let able = ran();
        if (able) {
            userData.findOne({ userId: message.author.id }).then(result => { result.economy_balance = result.economy_balance + robAmt; result.save() });
            userData.findOne({ userId: user.id }).then(result => { result.economy_balance = result.economy_balance - robAmt; result.save() });
            let ranMes = ['You have slipped **$(money)** from (user)\'s wallet!', '(user) dropped **$(money)** and you have put it into your wallet', '(user) caught you trying to take their wallet and handed it to you anyway. **+$(money)**'];
            const ranMessFunc = () => {
                let a = Math.round(Math.random() * ranMes.length);
                return ranMes[a];
            }
            let msg = ranMessFunc().replace('(user)', `<@!${user.id}>`).replace('(money)', robAmt.toString());
            message.channel.send(msg);
        } else {
            let cross = client.emojis.cache.get(require('../../structure/config.json').CrossEmoji);
            let amt = Math.floor(Math.random() * (30 - 10)) + 10;
            message.channel.send(`${cross} You have been caught! **-$${amt}**`);
            userData.findOne({ userId: message.author.id }).then(result => { result.economy_balance = result.economy_balance - robAmt; result.save() });
        }
    }
}