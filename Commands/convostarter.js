const Discord = require(`discord.js`);
const configFile = require('../config.json');

let responsed = [
`Hello!`,
`Hey! How is everyone doing?`,
`ya like jazz?`,
`heyyyyyy`,
`what is everyones intrests?`
]

module.exports = async(client, msg, args, prefix, message) => {
    message.delete();
    let generated = responsed[Math.floor(Math.random() * responsed.length)]
    message.channel.send(generated)
}