const express = require("express");
const router = express.Router();
const SavingGoal = require("../Models/SavingGoal");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewares/Auth");

router.get("/", verifyToken, (req, res) => {
  jwt.verify(req.token, "mysecretkey", async (err, data) => {
    if (err) {
      res.status(403).send("Bad Token");
    } else {
      const savingGoals = await SavingGoal.find({ userId: req.query.userId });
      if (savingGoals) {
        res.json(savingGoals);
      } else {
        res.status(500).send("Could'nt fetch saving goals");
      }
    }
  });
});

router.post("/add", async (req, res) => {
  const { body } = req;
  const newSavingGoal = { ...body.params };
  console.log("New Goal", newSavingGoal);
  try {
    await SavingGoal.create(newSavingGoal);
    res.status(201).send("Saving Goal added!");
  } catch (err) {
    console.log(err);
    res.send("Couldn't add new saving goal.");
  }
});

module.exports = router;
