module.exports = function () {
  const mongoose = require("mongoose");
  const chalk = require("chalk");

  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  //Connect to mongoDB
  function connect() {
    mongoose
      .connect(process.env.mongoDB, dbOptions)
      .catch(() =>
        console.log(
          chalk.red(
            "MongoDB connection failed, check your internet connection and activation key."
          )
        )
      );
  }
  connect();
  mongoose.Promise = global.Promise;

  //Event listeners
  mongoose.connection.once("connecting", function () {
    console.log(chalk.blue("Connecting to MongoDb"));
  });
  mongoose.connection.once("connected", function () {
    console.log(chalk.green("Connected to MongoDb"));
  });
  mongoose.connection.on("error", function (error) {
    console.log(chalk.red(error));
  });
  mongoose.connection.on("disconnect", () => {
    console.log(chalk.red("MongoDb connection as been lost"));
  });
  mongoose.connection.on("disconnected", () => {
    console.log(chalk.red("MongoDb connection failed"));
    connect();
  });
  mongoose.connection.on("reconnected", () => {
    console.log(chalk.green("MongoDb has reconnected"));
  });
  mongoose.connection.on("reconnected", () => {
    console.log(chalk.green("MongoDb is reconnecting"));
  });
}
