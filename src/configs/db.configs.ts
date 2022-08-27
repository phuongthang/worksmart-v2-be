const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoDbUrl = process.env.MONGO_DB_URL;
  console.log(`Connecting to ${mongoDbUrl}`);
  mongoose.Promise = global.Promise;

  mongoose
    .connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to the database");
    })
    .catch((err: any) => {
      console.log(`Could not connect to the database. Exiting now ... \n${err}`);
    });
};

module.exports = { connectDatabase };
