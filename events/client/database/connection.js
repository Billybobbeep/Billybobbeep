module.exports = () => {
    const mongoose = require('mongoose');
    const chalk = require('chalk');

    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        connectTimeoutMS: 10000,
        family: 4,
        server: { 
            auto_reconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        }
      };

    //Connect to mongoDB
    function connect() {
        mongoose.connect('mongodb://localhost/billybobbeep', dbOptions);
    }
    connect();
    mongoose.set('useFindAndModify', false);
    mongoose.Promise = global.Promise;

    //Event listeners
    mongoose.connection.once('connecting', function() {
        console.log(chalk.blue('Connecting to MongoDb'));
    });
    mongoose.connection.once('connected', function() {
        console.log(chalk.green('Connected to MongoDb'));
    });
    mongoose.connection.on('error', function(error) {
        console.log(chalk.red(error));
    });
    mongoose.connection.on('disconnect', () => {
        console.log(chalk.red('MongoDb connection as been lost'));
    });
    mongoose.connection.on('disconnected', () => {
        console.log(chalk.red('MongoDb connection as been lost'));
        connect()
    });
    mongoose.connection.on('reconnected', () => {
        console.log(chalk.green('MongoDb has reconnected'));
    });
    mongoose.connection.on('reconnected', () => {
        console.log(chalk.green('MongoDb is reconnecting'));
    });
}