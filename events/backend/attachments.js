module.exports = (message, client) => {
    const fetch = require('node-fetch');

    if (message.attachments.size < 1) return;
    (message.attachments.array()).forEach(async image => {
        let output = await cache.get(image.url);
        console.log(await output.text());
    });
}