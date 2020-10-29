module.exports = async (message, db) => {
    const Discord = require('discord.js');
    var embed = new Discord.MessageEmbed();
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
    var currKey = db.get('apiKey');
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
                generateKey()
            }
        }
    }
    function regenerate() {

    }
    if (message.content.toLowerCase().startsWith('regenerate')) {
        regenerate()
    } else {
        generate()
    }
}