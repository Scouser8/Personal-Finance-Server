const mongoose = require("mongoose");

const mongo_connectionURI =
  "mongodb+srv://moadel96:femto123@personalfinance.53lt7xj.mongodb.net/?retryWrites=true&w=majority";
const mongo_options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectMongoDB = () => {
  //Connect to the database
  mongoose
    .connect(mongo_connectionURI, mongo_options)
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Atlas not responding"));

  const db = mongoose.connection;

  //Reconnect to database if connection lost.
  db.on("error", (err) => {
    console.log("MongoDB disconnected!");
    mongoose.connect(mongo_connectionURI, mongo_options);
  });
};

module.exports = connectMongoDB;
