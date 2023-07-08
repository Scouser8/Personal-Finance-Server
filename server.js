const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");

// Create a new app & define its port or take it from the environment variables
// in case of deployment.
const app = express();
const port = process.env.PORT || 8999;

const connectMongoDB = require("./config/db");

//Connect to DB
connectMongoDB();

//Middlewares
app.use(bodyParser.json());

// app.use(cors());

//Only for testing purposes, don't do that in production.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

//Body Parser
app.use(express.urlencoded({ extended: false }));

app.use("/user", require("./Routes/UsersRoute.js"));
app.use("/savings", require("./Routes/SavingGoalRoute.js"));

//Start the server listening on the above determined port.
app.listen(port, () => console.log(`Server running locally on port: ${port}`));
