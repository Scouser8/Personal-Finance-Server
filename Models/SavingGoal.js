const mongoose = require("mongoose");

const savingGoalSchema = mongoose.Schema(
  {
    totalSavingAmount: {
      type: "Number",
      required: true,
    },
    dateToReachGoal: {
      type: "Date",
      required: true,
    },
    monthlyAmount: {
      type: "Number",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const savingGoalModel = mongoose.model("savings", savingGoalSchema);
module.exports = savingGoalModel;
