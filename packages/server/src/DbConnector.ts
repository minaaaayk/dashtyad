import mongoose from "mongoose";

export default (dbURL: string) => {
  const connect = () => {
    mongoose.Promise = global.Promise;

    mongoose
      .connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        return console.info(`Successfully connected to ${dbURL}`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
