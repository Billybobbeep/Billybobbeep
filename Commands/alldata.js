const db = require('quick.db');

module.exports = (client, msg, args, prefix, message) => {
  console.log(db.fetchAll())
}