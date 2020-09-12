const configFile = require('../../config.json')

module.exports = async (client) => {
    let jokesChannel1 = client.channels.cache.get(configFile.JokesChannel);
    let randomColorp = [`#f7e6b7`, `#b7f7e6`, `#eab7f7`, `#b7b9f7`, `#f7b7b7`, `#d3f7b7`, `#b7f7c9`, `#b7f7f7`, `#daf7b7`]
    let randomColor = randomColorp[Math.floor(Math.random() * randomColorp.length)]

    let genrePick = [`reddit`]
    let genrePicker = genrePick[Math.floor(Math.random() * genrePick.length)]
    if (genrePicker === `cursed`) {
        const genreChannel = require(`./cursedImage.js`);
        genreChannel(randomColor, client, jokesChannel1)
    }
    if (genrePicker === `image`) {
        const genreChannel = require(`./image.js`);
        genreChannel(randomColor, client, jokesChannel1)
    }
    if (genrePicker === `reddit`) {
        const genreChannel = require(`./reddit.js`);
        genreChannel(randomColor, client, jokesChannel1)
    }
    if (genrePicker === `introvert`) {
      const genreChannel = require(`./introvert.js`);
        genreChannel(randomColor, client, jokesChannel1)
    }
}
