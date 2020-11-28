var string = '345'

!isNaN(string) ? console.log(`${string} is a number.`) : console.log(`${string} is not a number`);

const db = require('./structure/global.js').db;
db.fetchAll().forEach(data => {
    //console.log(data.id);
    //console.log(data.data.level);
    console.log(data);
});