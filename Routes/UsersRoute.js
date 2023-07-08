const express = require("express");
const router = express.Router();
const Users = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create a new user
router.post("/register", async (req, res) => {
  const newUser = req.body;

  try {
    const user = await Users.findOne({ $or: [{ email: newUser.email }] });
    if (user) {
      res.status(403).json({ email: "Email already exists" });
    } else {
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          console.log(Users.find({ password: hash }));
          newUser.password = hash;

          console.log(`Hashed password: ${newUser.password}`);

          try {
            await Users.create(newUser);
            res.status(201).send("New user created successfully");
          } catch (error) {
            res.status(500).send("Error");
          }
        })
      );
    }
  } catch (error) {
    throw error;
  }
});

//Authenticate user
router.post("/login", async (req, res) => {
  const userData = req.body;

  try {
    const user = await Users.findOne({ email: userData.email });
    if (!user) {
      res.status(401).send("User not found");
    } else {
      bcrypt.compare(userData.password, user.password, (err, isMatched) => {
        if (err) {
          console.log("Error");
          res.status(500).send("Login failed");
          throw err;
        }
        if (isMatched) {
          jwt.sign({ user }, "mysecretkey", (err, token) => {
            res
              .status(201)
              .send({ message: "Logged In successfully", data: user, token });
          });
        } else {
          res.status(401).send("Wrong Password");
        }
      });
    }
  } catch (error) {
    throw error;
  }
});

module.exports = router;
