const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["USER", "TRAINER"],
      default: "USER",
    },
    followedTrainers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    purchasedPlans: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Plan",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
