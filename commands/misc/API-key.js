module.exports = {
    name: 'generate key',
    description: 'Generate a billybobbeep API key.',
    guildOnly: true,
    execute (message, prefix, client) {
        const Discord = require('discord.js');
        var embed = new Discord.MessageEmbed();
        var currKey = db.get('apiKey');
        const db = require('../../data/databaseManager/index.js');

        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function generateKey() {
            var string = 'You have requested a Billybobbeep API key.'
            var result = makeid(22)
            try {
                message.author.send(string + `\nYour API key is: \`${result}\``).then(() => {
                    db.push('apiKey', message.author.id + '_' + result);
                });
            } catch {
                return message.channel.send(`You cannot use this command when your DMs are turned off.`);
            }
            message.channel.send('Check your DMs.');
        }

        function generate() {
            if (!currKey || currKey.length < 0 || currKey === '[]') {
                generateKey()
            }
            if (currKey && currKey.length > 0 && currKey !== '[]') {
                var debounce = false;
                currKey.forEach(result => {
                    result = result.replace('_', ' ');
                    result = result.split(/ +/g);
                    if (result[0] === message.author.id) {
                        try {
                            message.author.send(`Your API key is \`${result[1]}\``);
                        } catch {
                            return message.channel.send(`You cannot use this command when your DMs are turned off.`);
                        }
                        message.channel.send('It appears you already have an API key.\nCheck your DMs');
                        debounce = true;
                    }
                });
                if (debounce === false) {
                    console.log('3')
                    generateKey()
                }
            }
        }
        function regenerate() {
            var table = []
            var count = 0;
            var debounce = false;
            if (currKey.length > 0) {
                currKey.forEach(result => {
                    table.push(result);
                    result = result.replace('_', ' ');
                    result = result.split(/ +/g);
                    if (result[0] === message.author.id) {
                        table.splice(count, 1);
                        db.set('apiKey', table);
                        debounce = true;
                    }
                    count++;
                });
                if (debounce === false) {
                    message.channel.send(`You do not have a valid API key.\nTo get an API key use: \`${db.get(message.guild.id + '.prefix') || '~'}generate key\``);
                } else {
                    let newKey = makeid(22);
                    db.push('apiKey', message.author.id + '_' + newKey);
                    message.channel.send(`Regenerating API key...`).then(msg => msg.edit(`Check your DMs!`)).then(() => message.author.send(`Your new API key is: \`${newKey}\``));
                }
            } else {
                message.channel.send(`You do not have a valid API key.\nTo get an API key use: \`${db.get(message.guild.id + '.prefix') || '~'}generate key\``);
            }
        }

        if (message.content.toLowerCase().includes('regenerate')) {
            regenerate()
        } else {
            console.log('1')
            generate()
        }
    }
}