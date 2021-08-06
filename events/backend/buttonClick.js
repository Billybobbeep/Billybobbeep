/**
 * @param {object} button The button that was clicked
 * @param {Client} client Thwe bots client
 */
module.exports = function(button, client) {
    console.log('button click')    
    if ((button.id).includes('quit-job')) require('../../commands/economy/quit').buttonCallback(button, client);
}