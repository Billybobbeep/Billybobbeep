module.exports = () => {
    const mongoose = require('mongoose');
    const chalk = require('chalk');

    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        poolSize: 5,
        connectTimeoutMS: 10000,
        family: 4
      };

    //Connect to mongoDB
    mongoose.connect('mongodb://localhost/billybobbeep', dbOptions);
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    //Event listeners
    mongoose.connection.once('open', function() {
        console.log(chalk.green('Connected to MongoDb'));
    });
    mongoose.connection.on('error', function(error) {
        console.log(chalk.red(error));
    });
    mongoose.connection.on('disconnected', () => {
        console.warn('MongoDb connection lost');
    });
}